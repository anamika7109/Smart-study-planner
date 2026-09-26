import React, { useState } from "react";

function Dashboard({ user, navigate, onLogout }) {
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  const userName = user?.name || "Student";

  const askStudyAI = () => {
    if (!aiQuestion.trim()) {
      alert("Please type a question first!");
      return;
    }

    setAiAnswer(
      `Study tip for "${aiQuestion}": Break the topic into small parts, study one part at a time, make short notes, and revise the topic regularly. ✨`
    );
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-orb orb-one"></div>
      <div className="dashboard-orb orb-two"></div>
      <div className="dashboard-orb orb-three"></div>

      <aside className="sidebar glass-card">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h2>Smart Study</h2>
            <span>Planner</span>
          </div>
        </div>

        <nav className="navigation">
          <button className="nav-item active" onClick={() => navigate("dashboard")}>
            <span>⌂</span> Dashboard
          </button>
          <button className="nav-item" onClick={() => navigate("subjects")}>
            <span>📚</span> Subjects
          </button>
          <button className="nav-item" onClick={() => navigate("tasks")}>
            <span>✓</span> Tasks
          </button>
          <button className="nav-item" onClick={() => navigate("timetable")}>
            <span>🗓</span> Timetable
          </button>
          <button className="nav-item" onClick={() => navigate("progress")}>
            <span>📈</span> Progress
          </button>
          <button className="nav-item" onClick={() => navigate("profile")}>
            <span>👤</span> Profile
          </button>
        </nav>

        <div className="sidebar-bottom">
          <div className="mini-tip">
            <div className="tip-icon">💡</div>
            <div>
              <strong>Study Tip</strong>
              <p>Small progress every day leads to big results.</p>
            </div>
          </div>

          <button className="logout-button" onClick={onLogout}>
            <span>↪</span> Log Out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="welcome-label">GOOD TO SEE YOU ✨</p>
            <h1>Hello, {userName}<span>!</span></h1>
            <p className="header-subtitle">
              Let's make today a productive study day.
            </p>
          </div>

          <button className="profile-button" onClick={() => navigate("profile")}>
            <div className="profile-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <strong>{userName}</strong>
              <span>Student</span>
            </div>
            <span className="profile-arrow">⌄</span>
          </button>
        </header>

        <section className="date-card glass-card">
          <div>
            <span className="date-icon">☀</span>
            <div>
              <p className="date-small">TODAY</p>
              <h3>{getToday()}</h3>
            </div>
          </div>
          <div className="motivation">
            <span>✨</span>
            <p>Focus on progress, not perfection.</p>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card glass-card">
            <div className="stat-icon blue">📚</div>
            <div>
              <p>Subjects</p>
              <h2>6</h2>
              <span>Active subjects</span>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon green">✓</div>
            <div>
              <p>Tasks Done</p>
              <h2>12</h2>
              <span>Completed this week</span>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon purple">⏱</div>
            <div>
              <p>Study Hours</p>
              <h2>18.5</h2>
              <span>This week</span>
            </div>
          </div>

          <div className="stat-card glass-card">
            <div className="stat-icon orange">🔥</div>
            <div>
              <p>Study Streak</p>
              <h2>7</h2>
              <span>Days in a row</span>
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="tasks-card glass-card">
            <div className="section-heading">
              <div>
                <p className="section-label">YOUR PLAN</p>
                <h2>Today's Tasks</h2>
              </div>
              <button className="view-button" onClick={() => navigate("tasks")}>
                View all →
              </button>
            </div>

            <div className="task-list">
              <TaskItem title="Revise Mathematics" subject="Mathematics" time="9:00 AM" completed />
              <TaskItem title="Read Biology Chapter 4" subject="Biology" time="11:30 AM" completed />
              <TaskItem title="Practice Physics Numericals" subject="Physics" time="2:00 PM" completed={false} />
              <TaskItem title="Complete English Assignment" subject="English" time="5:00 PM" completed={false} />
            </div>

            <button className="add-task-button" onClick={() => navigate("tasks")}>
              <span>＋</span> Add New Task
            </button>
          </div>

          <div className="progress-card glass-card">
            <div className="section-heading">
              <div>
                <p className="section-label">YOUR PROGRESS</p>
                <h2>Weekly Goal</h2>
              </div>
              <span className="percentage">72%</span>
            </div>

            <div className="progress-circle">
              <div className="circle-inner">
                <strong>72%</strong>
                <span>Complete</span>
              </div>
            </div>

            <div className="progress-details">
              <div>
                <span>Study goal</span>
                <strong>25 hrs</strong>
              </div>
              <div>
                <span>Completed</span>
                <strong>18 hrs</strong>
              </div>
            </div>

            <button className="progress-button" onClick={() => navigate("progress")}>
              View Progress
            </button>
          </div>
        </section>

        <section className="quick-section">
          <div className="section-heading">
            <div>
              <p className="section-label">SHORTCUTS</p>
              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="quick-grid">
            <button className="quick-card glass-card" onClick={() => navigate("subjects")}>
              <div className="quick-icon">📚</div>
              <div>
                <strong>My Subjects</strong>
                <span>Manage your subjects</span>
              </div>
              <b>→</b>
            </button>

            <button className="quick-card glass-card" onClick={() => navigate("tasks")}>
              <div className="quick-icon">✓</div>
              <div>
                <strong>New Task</strong>
                <span>Add a study task</span>
              </div>
              <b>→</b>
            </button>

            <button className="quick-card glass-card" onClick={() => navigate("timetable")}>
              <div className="quick-icon">🗓</div>
              <div>
                <strong>Timetable</strong>
                <span>Plan your study time</span>
              </div>
              <b>→</b>
            </button>
          </div>
        </section>

        <section className="ai-card glass-card">
          <div className="ai-header">
            <div className="ai-icon">✦</div>
            <div>
              <p className="section-label">SMART ASSISTANT</p>
              <h2>Ask Study AI</h2>
              <p>Need help planning your studies or understanding a topic?</p>
            </div>
          </div>

          <div className="ai-input-area">
            <input
              type="text"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askStudyAI();
              }}
              placeholder="Ask something like: How should I prepare for my exam?"
            />
            <button onClick={askStudyAI}>Ask AI ✨</button>
          </div>

          {aiAnswer && (
            <div className="ai-answer">
              <span>✦</span>
              <p>{aiAnswer}</p>
            </div>
          )}
        </section>

        <footer className="dashboard-footer">
          <p>Made for better studying ✨</p>
        </footer>
      </main>

      <style>{`
        * { box-sizing: border-box; }

        .dashboard-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          color: #214b63;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #edfaff 0%, #dff4ff 42%, #f8fdff 100%);
          position: relative;
          overflow-x: hidden;
        }

        .dashboard-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(70px);
          z-index: 0;
        }

        .orb-one {
          width: 350px;
          height: 350px;
          top: -130px;
          left: -120px;
          background: rgba(87, 186, 236, 0.23);
        }

        .orb-two {
          width: 330px;
          height: 330px;
          right: -100px;
          top: 25%;
          background: rgba(173, 226, 255, 0.32);
        }

        .orb-three {
          width: 300px;
          height: 300px;
          left: 35%;
          bottom: -150px;
          background: rgba(116, 201, 241, 0.18);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.82);
          box-shadow: 0 18px 50px rgba(63, 142, 181, 0.12);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .sidebar {
          width: 255px;
          min-height: 100vh;
          padding: 28px 18px;
          border-radius: 0 30px 30px 0;
          border-left: none;
          display: flex;
          flex-direction: column;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          z-index: 10;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 4px 8px 30px;
        }

        .brand-icon {
          width: 47px;
          height: 47px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          color: #4ca8d7;
          font-size: 25px;
          box-shadow: 0 8px 25px rgba(75, 168, 215, 0.16);
        }

        .brand h2 {
          margin: 0;
          font-size: 18px;
          font-style: italic;
          font-weight: 800;
          font-family: Georgia, serif;
          color: #164b6b;
        }

        .brand span {
          color: #62a6c6;
          font-size: 12px;
          letter-spacing: 2px;
        }

        .navigation {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .nav-item {
          border: none;
          background: transparent;
          padding: 13px 14px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 13px;
          color: #5b8193;
          font-size: 14px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
        }

        .nav-item span {
          width: 22px;
          text-align: center;
          font-size: 17px;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.6);
          color: #277da9;
          transform: translateX(2px);
        }

        .nav-item.active {
          color: #237fae;
          background: rgba(190, 232, 250, 0.62);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.6);
        }

        .sidebar-bottom { margin-top: auto; }

        .mini-tip {
          display: flex;
          gap: 9px;
          padding: 13px;
          border-radius: 17px;
          background: rgba(255, 255, 255, 0.48);
          margin-bottom: 13px;
        }

        .tip-icon { font-size: 18px; }

        .mini-tip strong {
          color: #3f7187;
          font-size: 12px;
        }

        .mini-tip p {
          margin: 5px 0 0;
          color: #7895a3;
          font-size: 10px;
          line-height: 1.4;
        }

        .logout-button {
          width: 100%;
          border: 1px solid rgba(95, 164, 197, 0.2);
          border-radius: 14px;
          padding: 12px;
          background: rgba(255,255,255,0.45);
          color: #688b9d;
          cursor: pointer;
          font-weight: 600;
        }

        .logout-button span { margin-right: 8px; }

        .dashboard-main {
          width: calc(100% - 255px);
          margin-left: 255px;
          padding: 38px 45px 30px;
          position: relative;
          z-index: 1;
        }

        .dashboard-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .welcome-label, .section-label {
          margin: 0 0 5px;
          color: #62a5c5;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .dashboard-header h1 {
          margin: 0;
          color: #164b6b;
          font-family: Georgia, serif;
          font-size: 38px;
          font-style: italic;
          font-weight: 800;
        }

        .dashboard-header h1 span { color: #5ab1df; }

        .header-subtitle {
          margin: 7px 0 0;
          color: #6b8c9b;
          font-size: 14px;
        }

        .profile-button {
          border: 1px solid rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.58);
          border-radius: 18px;
          padding: 9px 13px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(60,140,180,0.1);
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #82cdf0, #52a8d8);
          color: white;
          font-weight: 800;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .profile-info strong {
          font-size: 13px;
          color: #386a82;
        }

        .profile-info span {
          font-size: 10px;
          color: #8ba6b2;
          margin-top: 3px;
        }

        .profile-arrow {
          color: #6c9bb0;
          font-size: 16px;
        }

        .date-card {
          padding: 17px 22px;
          border-radius: 21px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .date-card > div:first-child {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .date-icon {
          width: 43px;
          height: 43px;
          border-radius: 14px;
          background: rgba(220, 244, 255, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
        }

        .date-small {
          margin: 0 0 3px;
          font-size: 9px;
          letter-spacing: 2px;
          color: #6da8c2;
          font-weight: 800;
        }

        .date-card h3 {
          margin: 0;
          font-size: 15px;
          color: #396e84;
        }

        .motivation {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #7393a1;
          font-size: 12px;
        }

        .motivation p { margin: 0; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .stat-card {
          padding: 18px;
          border-radius: 21px;
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .stat-icon {
          width: 45px;
          height: 45px;
          border-radius: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 19px;
        }

        .stat-icon.blue { background: #e0f4ff; }
        .stat-icon.green { background: #e4f8ed; }
        .stat-icon.purple { background: #eee8ff; }
        .stat-icon.orange { background: #fff0df; }

        .stat-card p {
          margin: 0 0 3px;
          font-size: 10px;
          color: #7895a3;
        }

        .stat-card h2 {
          margin: 0;
          font-size: 23px;
          color: #315f75;
        }

        .stat-card span {
          display: block;
          margin-top: 2px;
          font-size: 9px;
          color: #98adb7;
        }

        .content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .tasks-card, .progress-card {
          padding: 23px;
          border-radius: 25px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .section-heading h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 22px;
          font-style: italic;
          color: #24566f;
        }

        .view-button {
          border: none;
          background: transparent;
          color: #4c9bc2;
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
        }

        .task-list { margin-top: 17px; }

        .task-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(116, 169, 190, 0.12);
        }

        .task-check {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          border: 1px solid #8bc7df;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          flex-shrink: 0;
        }

        .task-check.done {
          background: #71bfdf;
          border-color: #71bfdf;
        }

        .task-info { flex: 1; }

        .task-info strong {
          display: block;
          font-size: 13px;
          color: #416d80;
        }

        .task-info strong.completed {
          text-decoration: line-through;
          opacity: 0.55;
        }

        .task-info span {
          display: block;
          margin-top: 3px;
          color: #92aab5;
          font-size: 9px;
        }

        .task-time {
          font-size: 10px;
          color: #6597aa;
          font-weight: 600;
        }

        .add-task-button {
          width: 100%;
          margin-top: 15px;
          padding: 11px;
          border: 1px dashed rgba(76, 159, 195, 0.4);
          border-radius: 13px;
          background: rgba(225, 246, 255, 0.4);
          color: #4c9bc2;
          cursor: pointer;
          font-weight: 700;
          font-size: 12px;
        }

        .percentage {
          color: #48a4cf;
          font-size: 15px;
          font-weight: 800;
        }

        .progress-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          margin: 25px auto 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: conic-gradient(#61b6df 0deg 259deg, rgba(191, 225, 238, 0.5) 259deg 360deg);
          position: relative;
        }

        .progress-circle::before {
          content: "";
          position: absolute;
          width: 116px;
          height: 116px;
          border-radius: 50%;
          background: rgba(248, 253, 255, 0.9);
        }

        .circle-inner {
          position: relative;
          text-align: center;
        }

        .circle-inner strong {
          display: block;
          color: #397b99;
          font-size: 24px;
        }

        .circle-inner span {
          font-size: 9px;
          color: #91a9b4;
        }

        .progress-details {
          display: flex;
          justify-content: space-around;
          margin-bottom: 17px;
        }

        .progress-details div {
          display: flex;
          flex-direction: column;
          text-align: center;
          gap: 4px;
        }

        .progress-details span {
          color: #8da5b0;
          font-size: 9px;
        }

        .progress-details strong {
          color: #4a7488;
          font-size: 13px;
        }

        .progress-button {
          width: 100%;
          padding: 11px;
          border: none;
          border-radius: 13px;
          background: rgba(214, 242, 254, 0.75);
          color: #3988ae;
          font-weight: 700;
          cursor: pointer;
        }

        .quick-section { margin-bottom: 20px; }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 13px;
        }

        .quick-card {
          border-radius: 19px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 11px;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
        }

        .quick-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(61,145,185,0.16);
        }

        .quick-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(220, 244, 255, 0.8);
          font-size: 18px;
        }

        .quick-card div:nth-child(2) { flex: 1; }

        .quick-card strong {
          display: block;
          color: #426f83;
          font-size: 12px;
        }

        .quick-card span {
          display: block;
          margin-top: 3px;
          color: #91a7b1;
          font-size: 9px;
        }

        .quick-card b { color: #69a9c3; }

        .ai-card {
          padding: 23px;
          border-radius: 25px;
          margin-bottom: 20px;
        }

        .ai-header {
          display: flex;
          gap: 13px;
          align-items: center;
          margin-bottom: 17px;
        }

        .ai-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #bfeeff, #e7f8ff);
          color: #48a6d3;
          font-size: 24px;
        }

        .ai-header h2 {
          margin: 0;
          color: #245b74;
          font-family: Georgia, serif;
          font-style: italic;
          font-size: 21px;
        }

        .ai-header p:last-child {
          margin: 4px 0 0;
          color: #819ba7;
          font-size: 11px;
        }

        .ai-input-area {
          display: flex;
          gap: 9px;
        }

        .ai-input-area input {
          flex: 1;
          border: 1px solid rgba(105, 170, 198, 0.25);
          border-radius: 13px;
          padding: 12px 14px;
          outline: none;
          background: rgba(255,255,255,0.65);
          color: #426c7e;
          font-size: 12px;
        }

        .ai-input-area input::placeholder { color: #9bb1ba; }

        .ai-input-area button {
          border: none;
          border-radius: 13px;
          padding: 0 18px;
          background: linear-gradient(135deg, #6bc0e8, #4ca5d5);
          color: white;
          cursor: pointer;
          font-weight: 700;
          font-size: 11px;
          box-shadow: 0 8px 20px rgba(73,163,211,0.2);
        }

        .ai-answer {
          margin-top: 13px;
          display: flex;
          gap: 9px;
          padding: 13px;
          border-radius: 14px;
          background: rgba(225, 246, 255, 0.65);
          color: #54798a;
          font-size: 11px;
          line-height: 1.5;
        }

        .ai-answer p { margin: 0; }

        .dashboard-footer {
          text-align: center;
          padding: 8px;
          color: #9ab0ba;
          font-size: 10px;
        }

        @media (max-width: 1000px) {
          .sidebar { width: 210px; }

          .dashboard-main {
            width: calc(100% - 210px);
            margin-left: 210px;
            padding: 30px 25px;
          }

          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .content-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 700px) {
          .dashboard-page { display: block; }

          .sidebar {
            position: relative;
            width: 100%;
            min-height: auto;
            border-radius: 0 0 25px 25px;
            padding: 15px;
          }

          .brand { padding-bottom: 15px; }

          .navigation {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }

          .nav-item {
            justify-content: center;
            flex-direction: column;
            gap: 3px;
            padding: 9px 4px;
            font-size: 9px;
          }

          .sidebar-bottom { display: none; }

          .dashboard-main {
            width: 100%;
            margin-left: 0;
            padding: 25px 15px;
          }

          .dashboard-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .dashboard-header h1 { font-size: 30px; }

          .profile-button { width: 100%; }

          .date-card {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .stat-card { padding: 12px; }

          .stat-icon {
            width: 36px;
            height: 36px;
            font-size: 15px;
          }

          .stat-card h2 { font-size: 19px; }
          .quick-grid { grid-template-columns: 1fr; }

          .ai-input-area { flex-direction: column; }

          .ai-input-area button { padding: 12px; }
        }

        @media (max-width: 430px) {
          .stats-grid { grid-template-columns: 1fr; }

          .navigation {
            grid-template-columns: repeat(3, 1fr);
          }

          .tasks-card, .progress-card, .ai-card {
            padding: 17px;
          }
        }
      `}</style>
    </div>
  );
}

function TaskItem({ title, subject, time, completed }) {
  return (
    <div className="task-item">
      <div className={`task-check ${completed ? "done" : ""}`}>
        {completed ? "✓" : ""}
      </div>

      <div className="task-info">
        <strong className={completed ? "completed" : ""}>{title}</strong>
        <span>{subject}</span>
      </div>

      <span className="task-time">{time}</span>
    </div>
  );
}

function getToday() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default Dashboard;
