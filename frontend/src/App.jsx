import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  // AI Chat State
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      text: 'Hello! I am StudyFlow AI. How can I help you organize your study schedule or answer your subject questions today?',
    },
  ]);
  const [loadingAi, setLoadingAi] = useState(false);

  // Notes State
  const [notes, setNotes] = useState([]);
  const [subject, setSubject] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [loadingNotes, setLoadingNotes] = useState(false);

  // Fetch saved notes on component load
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch('/api/notes');
      const data = await res.json();
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (err) {
      console.error('Failed to load notes:', err);
    }
  };

  const handleAskAi = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loadingAi) return;

    const userText = prompt.trim();
    setPrompt('');
    setChatHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setLoadingAi(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText }),
      });
      const data = await res.json();

      if (data.success) {
        setChatHistory((prev) => [
          ...prev,
          { role: 'assistant', text: data.answer },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { role: 'assistant', text: `Error: ${data.error || 'Something went wrong.'}` },
        ]);
      }
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: 'Unable to connect to StudyFlow AI backend.' },
      ]);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim() || loadingNotes) return;

    setLoadingNotes(true);
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subject.trim(), content: noteContent.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        setSubject('');
        setNoteContent('');
        fetchNotes();
      }
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setLoadingNotes(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchNotes();
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header & Logo Banner */}
      <section id="center" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div className="hero" style={{ display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
          <img src={heroImg} className="base" width="90" height="95" alt="" />
          <img src={reactLogo} className="framework" width="45" alt="React logo" />
          <img src={viteLogo} className="vite" width="45" alt="Vite logo" />
        </div>
        <h1 style={{ color: '#60a5fa', margin: '10px 0' }}>🎓 Smart Study Planner</h1>
        <p style={{ color: '#9ca3af', margin: 0 }}>Powered by StudyFlow AI & MongoDB</p>
      </section>

      {/* Navigation Tabs */}
      <nav style={styles.nav}>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'chat' ? styles.activeTabBtn : {}) }}
          onClick={() => setActiveTab('chat')}
        >
          🤖 AI Study Assistant
        </button>
        <button
          style={{ ...styles.tabBtn, ...(activeTab === 'notes' ? styles.activeTabBtn : {}) }}
          onClick={() => setActiveTab('notes')}
        >
          📝 Saved Notes ({notes.length})
        </button>
      </nav>

      {/* Main Feature Views */}
      <main style={styles.main}>
        {activeTab === 'chat' ? (
          <section style={styles.card}>
            <div style={styles.chatBox}>
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.message,
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.role === 'user' ? '#2563eb' : '#374151',
                  }}
                >
                  <strong style={styles.roleLabel}>
                    {msg.role === 'user' ? 'You' : 'StudyFlow AI'}
                  </strong>
                  <p style={styles.msgText}>{msg.text}</p>
                </div>
              ))}
              {loadingAi && (
                <div style={{ ...styles.message, alignSelf: 'flex-start', backgroundColor: '#374151' }}>
                  <p style={styles.msgText}>Thinking...</p>
                </div>
              )}
            </div>

            <form onSubmit={handleAskAi} style={styles.inputForm}>
              <input
                type="text"
                placeholder="Ask anything (e.g. 'Create a 3-day revision timetable for Physics')..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={styles.input}
              />
              <button type="submit" disabled={loadingAi} style={styles.submitBtn}>
                Send
              </button>
            </form>
          </section>
        ) : (
          <section style={styles.notesSection}>
            <form onSubmit={handleAddNote} style={styles.noteForm}>
              <h3 style={{ margin: '0 0 10px 0' }}>Create New Study Note</h3>
              <input
                type="text"
                placeholder="Subject (e.g., Mathematics, History)"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={styles.input}
              />
              <textarea
                placeholder="Note content / Key concepts..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={4}
                style={{ ...styles.input, resize: 'vertical' }}
              />
              <button type="submit" disabled={loadingNotes} style={styles.submitBtn}>
                {loadingNotes ? 'Saving...' : 'Save Note'}
              </button>
            </form>

            <div style={styles.notesList}>
              <h3 style={{ margin: '0 0 10px 0' }}>Your Saved Notes</h3>
              {notes.length === 0 ? (
                <p style={styles.emptyText}>No notes saved yet. Create one above!</p>
              ) : (
                notes.map((note) => (
                  <div key={note._id} style={styles.noteCard}>
                    {note.subject && <span style={styles.badge}>{note.subject}</span>}
                    <p style={styles.noteBody}>{note.content}</p>
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    color: '#f3f4f6',
    backgroundColor: '#111827',
    minHeight: '100vh',
  },
  nav: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  tabBtn: {
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#1f2937',
    color: '#9ca3af',
    cursor: 'pointer',
  },
  activeTabBtn: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  card: {
    backgroundColor: '#1f2937',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    height: '500px',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingRight: '10px',
    marginBottom: '15px',
  },
  message: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: '10px',
    color: '#ffffff',
  },
  roleLabel: {
    fontSize: '0.8rem',
    opacity: 0.8,
    display: 'block',
    marginBottom: '4px',
  },
  msgText: {
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  inputForm: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #374151',
    backgroundColor: '#111827',
    color: '#ffffff',
    fontSize: '1rem',
  },
  submitBtn: {
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  notesSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  noteForm: {
    backgroundColor: '#1f2937',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  notesList: {
    backgroundColor: '#1f2937',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  noteCard: {
    backgroundColor: '#374151',
    padding: '12px',
    borderRadius: '8px',
    position: 'relative',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '0.75rem',
    padding: '2px 8px',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  noteBody: {
    margin: '0 0 10px 0',
    whiteSpace: 'pre-wrap',
  },
  deleteBtn: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    cursor: 'pointer',
  },
  emptyText: {
    color: '#9ca3af',
  },
};

export default App;