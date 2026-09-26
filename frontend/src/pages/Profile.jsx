import { useState } from "react";

function Profile({ user, onLogout }) {
  const [name, setName] = useState(user?.name || "Student");
  const [email, setEmail] = useState(
    user?.email || "student@example.com"
  );

  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "30px",
        boxSizing: "border-box",
        background:
          "linear-gradient(135deg, #eaf8ff 0%, #d9f1ff 45%, #f8fcff 100%)",
        fontFamily: "Arial, sans-serif",
        color: "#17324d",
      }}
    >
      {/* Header */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontStyle: "italic",
              fontWeight: "800",
              fontFamily: "Georgia, serif",
            }}
          >
            My Profile
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#5b7891",
            }}
          >
            Manage your study profile and progress
          </p>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            style={{
              border: "none",
              borderRadius: "14px",
              padding: "12px 20px",
              background: "#ffffffaa",
              color: "#315b78",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 25px rgba(80, 150, 190, 0.15)",
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Main profile card */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "22px",
        }}
      >
        {/* Left card */}
        <div
          style={{
            padding: "30px 20px",
            borderRadius: "28px",
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 15px 40px rgba(70,140,180,0.15)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "110px",
              height: "110px",
              margin: "0 auto 18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #b9e8ff, #e9f9ff)",
              fontSize: "48px",
              boxShadow: "0 10px 30px rgba(70,150,200,0.2)",
            }}
          >
            
          </div>

          <h2
            style={{
              margin: "5px 0",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}
          >
            {name}
          </h2>

          <p
            style={{
              margin: "8px 0",
              color: "#66849a",
              fontSize: "14px",
            }}
          >
            Smart Study Planner
          </p>

          <div
            style={{
              marginTop: "25px",
              padding: "15px",
              borderRadius: "18px",
              background: "rgba(230,247,255,0.7)",
            }}
          >
            <strong>Keep Learning ✨</strong>

            <p
              style={{
                fontSize: "13px",
                lineHeight: "1.5",
                color: "#66849a",
                marginBottom: 0,
              }}
            >
              Small progress every day creates big results.
            </p>
          </div>
        </div>

        {/* Right section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Personal information */}
          <div
            style={{
              padding: "25px",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 15px 40px rgba(70,140,180,0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                Personal Information
              </h2>

              <button
                onClick={() => {
                  if (editing) {
                    handleSave();
                  } else {
                    setEditing(true);
                  }
                }}
                style={{
                  border: "none",
                  borderRadius: "12px",
                  padding: "9px 16px",
                  background: "#c9edff",
                  color: "#245875",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                {editing ? "Save" : "Edit"}
              </button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                Name
              </label>

              <input
                value={name}
                disabled={!editing}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px",
                  borderRadius: "13px",
                  border: "1px solid #c9e5f3",
                  background: editing ? "#ffffff" : "#eef9ff",
                  outline: "none",
                  fontSize: "15px",
                }}
              />
            </div>

            <div style={{ marginTop: "17px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "7px",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                Email
              </label>

              <input
                value={email}
                disabled={!editing}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "13px",
                  borderRadius: "13px",
                  border: "1px solid #c9e5f3",
                  background: editing ? "#ffffff" : "#eef9ff",
                  outline: "none",
                  fontSize: "15px",
                }}
              />
            </div>
          </div>

          {/* Study statistics */}
          <div
            style={{
              padding: "25px",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 15px 40px rgba(70,140,180,0.12)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Study Statistics
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(120px, 1fr))",
                gap: "12px",
              }}
            >
              <StatCard number="12" label="Subjects" />
              <StatCard number="28" label="Tasks Done" />
              <StatCard number="76%" label="Progress" />
              <StatCard number="7" label="Day Streak" />
            </div>
          </div>

          {/* Account section */}
          <div
            style={{
              padding: "22px 25px",
              borderRadius: "28px",
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.8)",
              boxShadow: "0 15px 40px rgba(70,140,180,0.12)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Study Goal
            </h2>

            <p
              style={{
                color: "#66849a",
                lineHeight: "1.6",
              }}
            >
              Stay consistent, complete your daily tasks, and improve
              your study progress every week.
            </p>

            <div
              style={{
                height: "10px",
                background: "#dceff7",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "76%",
                  height: "100%",
                  background: "#8ed3f5",
                  borderRadius: "20px",
                }}
              />
            </div>

            <p
              style={{
                textAlign: "right",
                fontSize: "13px",
                color: "#5c8098",
                marginBottom: 0,
              }}
            >
              76% completed
            </p>
          </div>
        </div>
      </div>

      {/* Mobile responsive adjustment */}
      <style>{`
        @media (max-width: 700px) {
          div {
            box-sizing: border-box;
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div
      style={{
        padding: "18px 10px",
        borderRadius: "18px",
        textAlign: "center",
        background: "rgba(226,246,255,0.75)",
      }}
    >
      <div
        style={{
          fontSize: "25px",
          fontWeight: "800",
          color: "#28749a",
        }}
      >
        {number}
      </div>

      <div
        style={{
          marginTop: "5px",
          fontSize: "12px",
          color: "#68869a",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default Profile;
