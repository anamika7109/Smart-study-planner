const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
 
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MONGODB_URI = process.env.MONGODB_URI;

// Gemini model using 3.5-flash
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

// --------------------------------------------------
// Middleware
// --------------------------------------------------

// Open CORS to prevent 'Failed to fetch' browser blocks
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// --------------------------------------------------
// MongoDB Note Schema
// --------------------------------------------------

const noteSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

// Helper function to build system prompt context
const buildSystemPrompt = (prompt, context) => {
  const studentContext =
    context && typeof context === "object"
      ? JSON.stringify(context, null, 2)
      : "No student information available.";

  return `
You are StudyFlow AI, an intelligent personal study assistant.

You help students with:
- Studying
- Time management
- Exam preparation
- Subjects
- Assignments
- Deadlines
- Revision
- Notes
- Productivity
- Pomodoro study sessions
- Study planning

IMPORTANT RULES:
1. Answer the student's actual question.
2. Do not give the same fixed response every time.
3. Understand the meaning of the question.
4. Give an answer appropriate to the request.
5. Use simple language.
6. For exam questions, give structured answers.
7. Use headings, bullet points and examples when useful.
8. For study plans, use the available student information.
9. Never pretend you changed something in the app.
10. If information is missing, say what is needed.
11. Be friendly, helpful and professional.

STUDENT INFORMATION:
${studentContext}

STUDENT QUESTION:
${prompt.trim()}

Answer the student's question naturally and specifically.
`;
};

// --------------------------------------------------
// Health Check Endpoint
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "StudyFlow AI server is running",
    aiConfigured: Boolean(GEMINI_API_KEY),
    mongoConfigured: Boolean(MONGODB_URI),
  });
});

// --------------------------------------------------
// Main AI Chat Endpoint
// --------------------------------------------------

app.post("/api/ai", async (req, res) => {
  try {
    const { prompt, context } = req.body;

    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid question.",
      });
    }

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing from .env");
      return res.status(500).json({
        success: false,
        error: "AI service is not configured.",
      });
    }

    const finalPrompt = buildSystemPrompt(prompt, context);

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(GEMINI_MODEL) +
      ":generateContent?key=" +
      encodeURIComponent(GEMINI_API_KEY);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: finalPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2000,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Safe logging to avoid logging credentials
      console.error("Gemini API Error:", data?.error?.message || "Unknown API error");
      return res.status(502).json({
        success: false,
        error: data?.error?.message || "Gemini could not generate a response.",
      });
    }

    const answer = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!answer) {
      console.error("Empty Gemini response received.");
      return res.status(502).json({
        success: false,
        error: "Gemini returned an empty response.",
      });
    }

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("STUDYFLOW AI SERVER ERROR:", error.message);
    return res.status(500).json({
      success: false,
      error: "Unable to connect to StudyFlow AI.",
    });
  }
});

// --------------------------------------------------
// Create Note
// --------------------------------------------------

app.post("/api/notes", async (req, res) => {
  try {
    const { prompt, content, subject } = req.body;

    if (typeof content !== "string" || !content.trim()) {
      return res.status(400).json({
        success: false,
        error: "Note content is required.",
      });
    }

    const note = new Note({
      prompt: typeof prompt === "string" ? prompt.trim() : "",
      content: content.trim(),
      subject: typeof subject === "string" ? subject.trim() : "",
    });

    await note.save();

    return res.status(201).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error("Save Note Error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to save note.",
    });
  }
});

// --------------------------------------------------
// Get All Notes
// --------------------------------------------------

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }).lean();

    return res.json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Fetch Notes Error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch notes.",
    });
  }
});

// --------------------------------------------------
// Delete Note
// --------------------------------------------------

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid note ID.",
      });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        error: "Note not found.",
      });
    }

    return res.json({
      success: true,
      message: "Note deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Note Error:", error.message);
    return res.status(500).json({
      success: false,
      error: "Failed to delete note.",
    });
  }
});

// --------------------------------------------------
// Start Server
// --------------------------------------------------

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log("");
      console.log("====================================");
      console.log("       STUDYFLOW AI SERVER          ");
      console.log("====================================");
      console.log(`Server running on: http://localhost:${PORT}`);
      console.log(`Gemini configured: ${Boolean(GEMINI_API_KEY)}`);
      console.log(`Gemini model: ${GEMINI_MODEL}`);
      console.log("MongoDB configured: true");
      console.log("====================================");
      console.log("");
    });
  } catch (error) {
    console.error("Failed to start server: Check database configuration and network connection.");
    process.exit(1);
  }
}

startServer();