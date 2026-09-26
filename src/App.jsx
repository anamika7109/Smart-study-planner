import { useEffect, useMemo, useState } from "react";

/*
  ============================================================
  STUDYFLOW
  Complete single-file React/Vite frontend prototype
  ============================================================
*/

const initialData = {
  subjects: [],
  tasks: [],
  exams: [],
  studySessions: [],
};

const initialProfile = {
  name: "",
  studentClass: "",
  course: "",
  goal: "",
  dailyGoal: 60,
  streak: 0,
  lastStudyDate: "",
};

const difficultyInfo = {
  Easy: {
    icon: "🟢",
    color: "#34d399",
    background: "rgba(52,211,153,.12)",
    description: "Comfortable",
  },
  Medium: {
    icon: "🟡",
    color: "#fbbf24",
    background: "rgba(251,191,36,.12)",
    description: "Needs practice",
  },
  Hard: {
    icon: "🔴",
    color: "#fb7185",
    background: "rgba(251,113,133,.12)",
    description: "Needs more focus",
  },
};

const priorityInfo = {
  High: {
    icon: "🔴",
    className: "high",
  },
  Medium: {
    icon: "🟡",
    className: "medium",
  },
  Low: {
    icon: "🟢",
    className: "low",
  },
};

/* -----------------------------------------------------------
   STORAGE
----------------------------------------------------------- */

function useStore(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return fallback;
      return JSON.parse(saved);
    } catch {
      return fallback;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore localStorage errors in prototype
    }
  }, [key, value]);

  return [value, setValue];
}

/* -----------------------------------------------------------
   HELPERS
----------------------------------------------------------- */

function getDifficultyInfo(level) {
  return difficultyInfo[level] || difficultyInfo.Medium;
}

function getPriorityInfo(priority) {
  return priorityInfo[priority] || priorityInfo.Medium;
}

function formatDate(date) {
  if (!date) return "No due date";
  const d = new Date(date + "T00:00:00");
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isToday(date) {
  if (!date) return false;
  const today = new Date();
  const d = new Date(date + "T00:00:00");
  return (
    today.getFullYear() === d.getFullYear() &&
    today.getMonth() === d.getMonth() &&
    today.getDate() === d.getDate()
  );
}

function isPast(date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(date + "T00:00:00");
  return d < today;
}

function daysUntil(date) {
  if (!date) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date + "T00:00:00");
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function calculateSubjectProgress(subjectId, tasks) {
  const subjectTasks = tasks.filter((task) => task.subjectId === subjectId);
  if (!subjectTasks.length) return 0;
  const completed = subjectTasks.filter((task) => task.done).length;
  return Math.round((completed / subjectTasks.length) * 100);
}

/* -----------------------------------------------------------
   STYLES
----------------------------------------------------------- */

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap');

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: Inter, sans-serif; background: #070914; color: #eef2ff; }
button, input, select, textarea { font: inherit; }
button { cursor: pointer; }
button:disabled { opacity: .5; cursor: not-allowed; }

.sf-app { min-height: 100vh; background: radial-gradient(circle at 10% 10%, rgba(124,92,255,.18), transparent 30%), radial-gradient(circle at 90% 20%, rgba(34,211,238,.12), transparent 28%), #070914; }
.sf-app.light { background: radial-gradient(circle at 10% 10%, rgba(124,92,255,.10), transparent 30%), #f5f7ff; color: #172033; }
.sf-app.light .panel, .sf-app.light .topbar, .sf-app.light .sidebar { background: rgba(255,255,255,.86); border-color: #e2e6f3; }
.sf-app.light .muted { color: #68738a; }
.sf-app.light input, .sf-app.light select, .sf-app.light textarea { background: white; color: #172033; border-color: #dce1ee; }
.sf-app.light .item { background: rgba(0,0,0,.02); border-color: #e2e6f3; }
.sf-app.light .nav-btn { color: #68738a; }
.sf-app.light .nav-btn.active { color: #172033; }
.sf-app.light .mobile-nav { background: rgba(255,255,255,.95); border-color: #dce1ee; }

.topbar { height: 72px; position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 0 24px; background: rgba(7,9,20,.78); backdrop-filter: blur(20px); border-bottom: 1px solid #20263b; }
.brand { font-family: "Space Grotesk"; font-weight: 800; font-size: 21px; letter-spacing: -.5px; }
.brand span { color: #7c5cff; }
.top-actions { display: flex; gap: 9px; align-items: center; }

.icon-btn, .ghost-btn, .primary-btn, .danger-btn { border-radius: 12px; padding: 10px 14px; color: inherit; background: #151a2b; border: 1px solid #282f47; transition: .2s ease; }
.icon-btn:hover, .ghost-btn:hover, .primary-btn:hover, .danger-btn:hover { transform: translateY(-1px); }
.primary-btn { background: linear-gradient(135deg, #7c5cff, #4f8cff); border: 0; color: white; box-shadow: 0 10px 25px rgba(92,80,255,.25); }
.danger-btn { color: #ff8da1; }
.icon-btn { width: 42px; height: 42px; padding: 0; }

.shell { display: flex; min-height: calc(100vh - 72px); }
.sidebar { width: 245px; padding: 22px 14px; border-right: 1px solid #20263b; background: rgba(7,9,20,.55); backdrop-filter: blur(18px); position: sticky; top: 72px; height: calc(100vh - 72px); overflow-y: auto; }
.nav-section { font-size: 11px; color: #66708a; text-transform: uppercase; letter-spacing: 1.3px; padding: 14px 12px 7px; }
.nav-btn { display: flex; width: 100%; align-items: center; gap: 11px; padding: 11px 12px; margin: 3px 0; border: 0; border-radius: 11px; background: transparent; color: #9ca6bd; text-align: left; }
.nav-btn:hover { background: rgba(124,92,255,.08); }
.nav-btn.active { background: linear-gradient(90deg, rgba(124,92,255,.2), rgba(34,211,238,.05)); color: #fff; }

.content { flex: 1; padding: 30px; max-width: 1500px; margin: auto; width: 100%; }
.page-head { display: flex; justify-content: space-between; gap: 18px; align-items: end; margin-bottom: 24px; }
.eyebrow { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #7c5cff; font-weight: 700; }
.title { font: 700 32px "Space Grotesk"; margin: 5px 0; }
.muted { color: #7e899f; }

.grid { display: grid; gap: 16px; }
.stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.two { grid-template-columns: 1.45fr 1fr; }
.three { grid-template-columns: repeat(3, 1fr); }
.panel { background: rgba(14,18,33,.78); border: 1px solid #222a42; border-radius: 20px; padding: 20px; box-shadow: 0 18px 50px rgba(0,0,0,.18); }
.stat-value { font: 700 29px "Space Grotesk"; margin: 8px 0; }
.stat-label { color: #8993aa; font-size: 13px; }
.card-title { font: 700 17px "Space Grotesk"; margin: 0 0 15px; }

.progress { height: 8px; background: #20273b; border-radius: 99px; overflow: hidden; }
.bar { height: 100%; border-radius: 99px; background: linear-gradient(90deg, #7c5cff, #22d3ee); transition: width .4s ease; }
.row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.list { display: grid; gap: 10px; }
.item { padding: 13px; border: 1px solid #252d45; border-radius: 14px; background: rgba(255,255,255,.025); }

.check { width: 23px; height: 23px; border-radius: 7px; border: 1px solid #414b67; background: transparent; color: #fff; flex-shrink: 0; }
.check.done { background: #34d399; border-color: #34d399; }
.tag { font-size: 11px; padding: 5px 8px; border-radius: 99px; background: #20273b; color: #aeb8cf; white-space: nowrap; }
.high { color: #ff9aa9; background: rgba(255,90,120,.1); }
.medium { color: #ffd58a; background: rgba(255,200,70,.1); }
.low { color: #6ee7b7; background: rgba(52,211,153,.1); }

input, select, textarea { width: 100%; padding: 11px 12px; border-radius: 11px; border: 1px solid #2a334d; background: #0b1020; color: #eef2ff; outline: none; }
textarea { resize: vertical; min-height: 130px; }
input:focus, select:focus, textarea:focus { border-color: #7c5cff; box-shadow: 0 0 0 3px rgba(124,92,255,.1); }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-grid .full { grid-column: 1 / -1; }
.actions { display: flex; gap: 9px; flex-wrap: wrap; }

.chart { display: flex; align-items: end; gap: 10px; height: 190px; padding-top: 20px; }
.bar-col { flex: 1; text-align: center; height: 100%; display: flex; flex-direction: column; justify-content: end; gap: 7px; }
.bar-col i { display: block; min-height: 8px; border-radius: 8px 8px 2px 2px; background: linear-gradient(180deg, #22d3ee, #7c5cff); }
.bar-col small { font-size: 11px; color: #7e899f; }

.welcome { min-height: 100vh; display: grid; place-items: center; padding: 28px; }
.hero { max-width: 1050px; text-align: center; }
.orb { width: 100px; height: 100px; margin: 0 auto 22px; border-radius: 50%; background: radial-gradient(circle, #fff 0 5%, #7c5cff 25%, #22d3ee 45%, transparent 70%); filter: drop-shadow(0 0 35px #7c5cff); animation: pulse 3s infinite; }
.hero h1 { font: 800 clamp(44px,8vw,82px) "Space Grotesk"; letter-spacing: -4px; margin: 0; }
.gradient { background: linear-gradient(90deg, #a78bfa, #22d3ee); color: transparent; background-clip: text; }
.hero p { max-width: 650px; margin: 18px auto 28px; color: #9ba5bd; font-size: 17px; line-height: 1.7; }
.feature-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin: 20px 0 30px; }
.pill { padding: 9px 12px; border: 1px solid #2a3150; border-radius: 99px; background: rgba(255,255,255,.035); color: #aab4cc; font-size: 12px; }

.auth { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
.auth-card { width: min(440px, 100%); }
.auth-card h1 { font: 700 35px "Space Grotesk"; margin: 5px 0 10px; }
.auth-card form { display: grid; gap: 13px; margin-top: 22px; }

.timer { text-align: center; padding: 15px; }
.timer-face { font: 800 76px "Space Grotesk"; letter-spacing: -3px; margin: 18px 0; }
.mode-row { display: flex; justify-content: center; gap: 8px; }
.mode-row button.active { background: #7c5cff; color: #fff; border-color: #7c5cff; }

.mobile-nav { display: none; }
.toast { position: fixed; right: 22px; bottom: 22px; z-index: 100; background: #11172a; border: 1px solid #313a57; border-radius: 14px; padding: 13px 16px; box-shadow: 0 18px 45px #0008; max-width: 350px; }

.subject-icon { width: 45px; height: 45px; display: grid; place-items: center; border-radius: 13px; font-size: 22px; flex-shrink: 0; }
.subject-card { position: relative; overflow: hidden; }
.subject-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--subject-color); }
.subject-mini { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: #b8c1d6; }
.task-meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 7px; align-items: center; }
.filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 16px; }
.filter-btn { border: 1px solid #2a334d; background: #11172a; color: #9ca6bd; padding: 8px 12px; border-radius: 10px; }
.filter-btn.active { background: #7c5cff; border-color: #7c5cff; color: white; }
.empty { text-align: center; padding: 35px 15px; color: #7e899f; }
.empty h3 { color: inherit; margin: 10px 0 5px; }

.ai-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.ai-tab { padding: 9px 12px; border-radius: 11px; border: 1px solid #2a334d; background: #101629; color: #aab4cc; }
.ai-tab.active { color: white; background: linear-gradient(135deg, #7c5cff, #4f8cff); border-color: transparent; }

.reminder-card { border-left: 4px solid #7c5cff; }
.reminder-card.overdue { border-left-color: #fb7185; }
.reminder-card.today { border-left-color: #fbbf24; }

.goal-circle { width: 130px; height: 130px; border-radius: 50%; display: grid; place-items: center; margin: 5px auto 18px; background: conic-gradient(#7c5cff 0 var(--goal), #20273b var(--goal) 100%); }
.goal-circle-inner { width: 104px; height: 104px; border-radius: 50%; background: #0e1221; display: grid; place-items: center; text-align: center; }
.light .goal-circle-inner { background: white; }
.goal-number { font: 700 25px "Space Grotesk"; }

.profile-avatar { width: 75px; height: 75px; border-radius: 22px; display: grid; place-items: center; font: 700 30px "Space Grotesk"; color: white; background: linear-gradient(135deg, #7c5cff, #22d3ee); box-shadow: 0 15px 35px rgba(124,92,255,.3); }
.stat-icon { font-size: 22px; }
.reminder-list { display: grid; gap: 10px; }
.ai-suggestion { padding: 12px; border-radius: 12px; background: rgba(34,211,238,.05); border: 1px solid rgba(34,211,238,.12); }
.quiz-question { padding: 15px; border-radius: 14px; border: 1px solid #28314a; margin-bottom: 10px; }
.quiz-option { width: 100%; text-align: left; padding: 10px 12px; border-radius: 10px; margin-top: 7px; border: 1px solid #2a334d; background: #101629; color: #cbd3e5; }
.quiz-option:hover { border-color: #7c5cff; }

@keyframes pulse { 50% { transform: scale(1.08); opacity: .8; } }

@media(max-width: 980px) {
  .sidebar { display: none; }
  .mobile-nav { display: flex; position: fixed; bottom: 14px; left: 14px; right: 14px; z-index: 30; background: #101629eF; border: 1px solid #2b3450; border-radius: 16px; padding: 7px; justify-content: space-around; }
  .mobile-nav .nav-btn { justify-content: center; width: auto; }
  .stats, .three { grid-template-columns: 1fr 1fr; }
  .content { padding: 20px; }
}

@media(max-width: 650px) {
  .stats, .two, .three, .form-grid { grid-template-columns: 1fr; }
  .topbar { padding: 0 14px; }
  .content { padding: 15px; }
  .title { font-size: 27px; }
  .hero h1 { letter-spacing: -2px; }
  .timer-face { font-size: 58px; }
  .hide-mobile { display: none; }
  .page-head { align-items: flex-start; flex-direction: column; }
}

/* Real-time AI Assistant UI */
.ai-shell { overflow: hidden; }
.ai-status-row { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:16px; flex-wrap:wrap; }
.ai-status { display:flex; align-items:center; gap:9px; font-weight:700; }
.ai-status small { color:#7e899f; font-weight:500; }
.ai-live-dot { width:9px; height:9px; border-radius:50%; background:#34d399; box-shadow:0 0 0 5px rgba(52,211,153,.10), 0 0 18px rgba(52,211,153,.7); animation:aiPulse 1.8s infinite; }
.ai-context-tags { display:flex; gap:7px; flex-wrap:wrap; }
.ai-chat-window { min-height:360px; max-height:540px; overflow:auto; padding:8px 4px 12px; display:grid; gap:14px; scrollbar-width:thin; }
.ai-message { display:flex; gap:10px; max-width:88%; animation:aiIn .25s ease; }
.ai-message.user { margin-left:auto; flex-direction:row-reverse; }
.ai-message-avatar { width:36px; height:36px; flex:0 0 36px; display:grid; place-items:center; border-radius:12px; background:linear-gradient(135deg,#7c5cff,#22d3ee); color:#fff; font-weight:800; box-shadow:0 8px 20px rgba(124,92,255,.22); }
.ai-message.user .ai-message-avatar { background:#20273b; }
.ai-message-body { min-width:0; }
.ai-message-name { font-size:11px; color:#7e899f; margin:2px 0 5px; font-weight:700; }
.ai-message.user .ai-message-name { text-align:right; }
.ai-message-text { white-space:pre-wrap; line-height:1.7; padding:13px 15px; border:1px solid #28314a; border-radius:16px 16px 16px 5px; background:rgba(255,255,255,.035); }
.ai-message.user .ai-message-text { border-radius:16px 16px 5px 16px; background:linear-gradient(135deg,rgba(124,92,255,.20),rgba(79,140,255,.10)); border-color:rgba(124,92,255,.28); }
.ai-typing { display:flex; align-items:center; gap:5px; color:#8993aa; padding:10px 0; }
.ai-typing i { width:7px; height:7px; border-radius:50%; background:#7c5cff; animation:aiBounce 1s infinite; }
.ai-typing i:nth-child(2){animation-delay:.15s}.ai-typing i:nth-child(3){animation-delay:.3s}
.ai-quick-row { display:flex; gap:8px; flex-wrap:wrap; padding:12px 0; }
.ai-quick { border:1px solid #2a334d; background:rgba(255,255,255,.025); color:#aab4cc; padding:8px 11px; border-radius:99px; font-size:12px; transition:.2s; }
.ai-quick:hover { transform:translateY(-2px); border-color:#7c5cff; color:#fff; background:rgba(124,92,255,.09); }
.ai-composer { border:1px solid #28314a; background:rgba(8,12,25,.55); border-radius:18px; padding:13px; }
.ai-composer-top { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
.ai-composer-top select { flex:1; }
.ai-mode-label { color:#7e899f; font-size:12px; white-space:nowrap; }
.ai-mode-label b { color:#cfd7e8; }
.ai-composer textarea { min-height:95px; border:0; background:transparent; padding:8px 2px; box-shadow:none; resize:vertical; }
.ai-composer textarea:focus { border:0; box-shadow:none; }
.ai-compose-footer { display:flex; justify-content:space-between; align-items:center; gap:12px; padding-top:8px; border-top:1px solid #222a42; }
.ai-compose-footer small { color:#66708a; }
.ai-score-badge { padding:9px 13px; border-radius:99px; background:rgba(52,211,153,.10); color:#6ee7b7; border:1px solid rgba(52,211,153,.18); font-weight:800; }
.quiz-option.selected { border-color:#7c5cff; background:rgba(124,92,255,.14); }
.quiz-option.correct { border-color:#34d399; background:rgba(52,211,153,.10); }
.quiz-option span { display:inline-grid; place-items:center; width:24px; height:24px; margin-right:9px; border-radius:7px; background:#20273b; font-size:11px; font-weight:800; }
@keyframes aiPulse { 50% { opacity:.55; transform:scale(.82); } }
@keyframes aiBounce { 0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)} }
@keyframes aiIn { from { opacity:0; transform:translateY(7px); } to { opacity:1; transform:none; } }
@media(max-width:650px){ .ai-message{max-width:96%}.ai-composer-top{align-items:stretch; flex-direction:column}.ai-mode-label{padding:4px 0}.ai-compose-footer{align-items:stretch; flex-direction:column}.ai-compose-footer .primary-btn{width:100%}.ai-chat-window{min-height:300px} }
`;

/* -----------------------------------------------------------
   LAYOUT
----------------------------------------------------------- */

function Layout({ children, page, navigate, dark, setDark, logout }) {
  const items = [
    ["dashboard", "⌂", "Dashboard"],
    ["subjects", "◈", "Subjects"],
    ["tasks", "✓", "Tasks"],
    ["schedule", "◷", "Schedule"],
    ["progress", "◔", "Progress"],
    ["reminders", "!", "Reminders"],
    ["ai", "✦", "AI Assistant"],
  ];

  return (
    <div className={"sf-app " + (!dark ? "light" : "")}>
      <header className="topbar">
        <button className="ghost-btn brand" onClick={() => navigate("dashboard")}>
          ✦ Study<span>Flow</span>
        </button>

        <div className="top-actions">
          <button className="icon-btn" onClick={() => setDark((v) => !v)}>
            {dark ? "☀" : "☾"}
          </button>
          <button className="ghost-btn hide-mobile" onClick={() => navigate("profile")}>
            Profile
          </button>
          <button className="danger-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <div className="shell">
        <aside className="sidebar">
          <div className="nav-section">Workspace</div>
          {items.map(([id, icon, label]) => (
            <button
              key={id}
              className={"nav-btn " + (page === id ? "active" : "")}
              onClick={() => navigate(id)}
            >
              <b>{icon}</b>
              {label}
            </button>
          ))}
          <div className="nav-section">Tools</div>
          <button
            className={"nav-btn " + (page === "pomodoro" ? "active" : "")}
            onClick={() => navigate("pomodoro")}
          >
            <b>◉</b> Pomodoro
          </button>
          <button
            className={"nav-btn " + (page === "profile" ? "active" : "")}
            onClick={() => navigate("profile")}
          >
            <b>◉</b> Profile
          </button>
        </aside>

        <main className="content">{children}</main>
      </div>

      <div className="mobile-nav">
        {items.slice(0, 6).map(([id, icon]) => (
          <button
            key={id}
            className={"nav-btn " + (page === id ? "active" : "")}
            onClick={() => navigate(id)}
          >
            <span>{icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   WELCOME
----------------------------------------------------------- */

function Welcome({ go }) {
  return (
    <div className="welcome">
      <div className="hero">
        <div className="orb" />
        <div className="eyebrow">Student command center</div>
        <h1>
          Study smarter.<br />
          <span className="gradient">Stay in flow.</span>
        </h1>
        <p>
          Build your own study workspace with custom courses, tasks, deadlines, progress tracking, real-time AI study tools and smart reminders.
        </p>
        <div className="feature-row">
          {["Custom subjects", "Task manager", "Study streak", "AI assistant", "Smart reminders", "Progress goals", "Pomodoro", "Quiz generator"].map((x) => (
            <span className="pill" key={x}>{x}</span>
          ))}
        </div>
        <div className="actions" style={{ justifyContent: "center" }}>
          <button className="primary-btn" onClick={() => go("login")}>
            Create my StudyFlow →
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   LOGIN
----------------------------------------------------------- */

function Login({ onLogin, go }) {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [course, setCourse] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const profile = {
      ...initialProfile,
      name: name.trim() || "Student",
      studentClass: studentClass.trim(),
      course: course.trim(),
    };
    onLogin(profile);
  };

  return (
    <div className="auth">
      <div className="panel auth-card">
        <div className="eyebrow">Create your workspace</div>
        <h1>Welcome to StudyFlow.</h1>
        <p className="muted">Tell us a little about yourself. You can change these details later from Profile.</p>
        <form onSubmit={submit}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student name" />
          <input value={studentClass} onChange={(e) => setStudentClass(e.target.value)} placeholder="Class / Year" />
          <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course / Program" />
          <button className="primary-btn">Enter StudyFlow →</button>
        </form>
        <button className="ghost-btn" style={{ marginTop: 10, width: "100%" }} onClick={() => go("welcome")}>
          ← Back
        </button>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------
   DASHBOARD
----------------------------------------------------------- */

function Dashboard({ profile, navigate, subjects, tasks, exams, studySessions }) {
  const completed = tasks.filter((task) => task.done).length;
  const pending = tasks.filter((task) => !task.done).length;

  const todayMinutes = studySessions
    .filter((session) => session.date === getTodayKey())
    .reduce((sum, session) => sum + session.minutes, 0);

  const goal = Number(profile.dailyGoal) || 60;
  const goalPercent = Math.min(100, Math.round((todayMinutes / goal) * 100));

  const upcomingTasks = tasks
    .filter((task) => !task.done && task.due)
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 4);

  const upcomingExams = exams
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3);

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Good morning</div>
          <h1 className="title">{profile.name || "Student"}'s command center</h1>
          <div className="muted">{profile.course ? profile.course : "Your personalized study workspace"}</div>
        </div>
        <div className="actions">
          <button className="ghost-btn" onClick={() => navigate("subjects")}>+ Subject</button>
          <button className="primary-btn" onClick={() => navigate("tasks")}>+ Add task</button>
        </div>
      </div>

      <div className="grid stats">
        <div className="panel">
          <div className="stat-icon">🔥</div>
          <div className="stat-label">Study streak</div>
          <div className="stat-value">{profile.streak} days</div>
          <div className="muted">Keep your momentum</div>
        </div>
        <div className="panel">
          <div className="stat-icon">⏱️</div>
          <div className="stat-label">Today's study</div>
          <div className="stat-value">{todayMinutes} min</div>
          <div className="progress">
            <div className="bar" style={{ width: goalPercent + "%" }} />
          </div>
        </div>
        <div className="panel">
          <div className="stat-icon">✓</div>
          <div className="stat-label">Tasks completed</div>
          <div className="stat-value">{completed}</div>
          <div className="muted">{pending} pending</div>
        </div>
        <div className="panel">
          <div className="stat-icon">📚</div>
          <div className="stat-label">My subjects</div>
          <div className="stat-value">{subjects.length}</div>
          <div className="muted">Student-created courses</div>
        </div>
      </div>

      <div className="grid two" style={{ marginTop: 16 }}>
        <div className="panel">
          <div className="row">
            <h2 className="card-title">Upcoming tasks</h2>
            <button className="ghost-btn" onClick={() => navigate("tasks")}>View all</button>
          </div>
          <div className="list">
            {upcomingTasks.map((task) => {
              const subject = subjects.find((s) => s.id === task.subjectId);
              const priority = getPriorityInfo(task.priority);
              return (
                <div className="item" key={task.id}>
                  <div className="row">
                    <div>
                      <b>{task.title}</b>
                      <div className="task-meta">
                        {subject && (
                          <span className="subject-mini">
                            {getDifficultyInfo(subject.difficulty).icon} {subject.name}
                          </span>
                        )}
                        <span className="muted">Due {formatDate(task.due)}</span>
                      </div>
                    </div>
                    <span className={"tag " + priority.className}>{priority.icon} {task.priority}</span>
                  </div>
                </div>
              );
            })}
            {!upcomingTasks.length && <div className="empty">🎉<br />No pending tasks.</div>}
          </div>
        </div>

        <div className="panel">
          <div className="row">
            <h2 className="card-title">Exam radar</h2>
            <button className="ghost-btn" onClick={() => navigate("reminders")}>Manage</button>
          </div>
          <div className="reminder-list">
            {upcomingExams.map((exam) => {
              const days = daysUntil(exam.date);
              return (
                <div className={"item reminder-card " + (days === 0 ? "today" : "")} key={exam.id}>
                  <div className="row">
                    <div>
                      <b>{exam.title}</b>
                      <div className="muted">{formatDate(exam.date)}</div>
                    </div>
                    <span className="tag high">{days === 0 ? "Today" : days < 0 ? "Passed" : `${days} days`}</span>
                  </div>
                </div>
              );
            })}
            {!upcomingExams.length && <div className="empty">📅<br />No exams added yet.</div>}
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="row">
          <h2 className="card-title">Subject pulse</h2>
          <button className="ghost-btn" onClick={() => navigate("subjects")}>Manage subjects →</button>
        </div>
        {!subjects.length ? (
          <div className="empty">
            <div style={{ fontSize: 40 }}>📚</div>
            <h3>Create your first subject</h3>
            <p>There are no predefined courses. Add whatever you are studying.</p>
            <button className="primary-btn" onClick={() => navigate("subjects")}>+ Add my subject</button>
          </div>
        ) : (
          <div className="grid three">
            {subjects.slice(0, 6).map((subject) => {
              const difficulty = getDifficultyInfo(subject.difficulty);
              const progress = calculateSubjectProgress(subject.id, tasks);
              return (
                <div className="item" key={subject.id}>
                  <div className="row">
                    <div className="row" style={{ justifyContent: "flex-start" }}>
                      <div className="subject-icon" style={{ background: difficulty.background }}>{difficulty.icon}</div>
                      <div>
                        <b>{subject.name}</b>
                        <div className="muted">{subject.difficulty}</div>
                      </div>
                    </div>
                    <b>{progress}%</b>
                  </div>
                  <div className="progress" style={{ marginTop: 12 }}>
                    <div className="bar" style={{ width: progress + "%", background: `linear-gradient(90deg, ${subject.color}, #22d3ee)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

/* -----------------------------------------------------------
   SUBJECTS
----------------------------------------------------------- */

function Subjects({ subjects, setSubjects, tasks, notify }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDifficulty, setEditDifficulty] = useState("Medium");

  const addSubject = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      notify("Please enter a subject name");
      return;
    }
    const info = getDifficultyInfo(difficulty);
    const newSubject = {
      id: Date.now(),
      name: name.trim(),
      difficulty,
      color: info.color,
      createdAt: new Date().toISOString(),
    };
    setSubjects((current) => [...current, newSubject]);
    setName("");
    setDifficulty("Medium");
    notify(`${newSubject.name} added ✦`);
  };

  const startEdit = (subject) => {
    setEditingId(subject.id);
    setEditName(subject.name);
    setEditDifficulty(subject.difficulty);
  };

  const saveEdit = (id) => {
    if (!editName.trim()) {
      notify("Subject name cannot be empty");
      return;
    }
    const info = getDifficultyInfo(editDifficulty);
    setSubjects((current) =>
      current.map((subject) =>
        subject.id === id
          ? { ...subject, name: editName.trim(), difficulty: editDifficulty, color: info.color }
          : subject
      )
    );
    setEditingId(null);
    notify("Subject updated");
  };

  const deleteSubject = (id) => {
    const subject = subjects.find((s) => s.id === id);
    const relatedTasks = tasks.filter((task) => task.subjectId === id);
    const message = relatedTasks.length
      ? `This subject has ${relatedTasks.length} task(s). Delete the subject and its tasks?`
      : "Delete this subject?";

    if (!window.confirm(message)) return;

    setSubjects((current) => current.filter((s) => s.id !== id));
    notify(`${subject?.name || "Subject"} deleted`);
  };

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Knowledge map</div>
          <h1 className="title">My Subjects</h1>
          <div className="muted">Add any course or subject you are studying. Nothing is predefined.</div>
        </div>
      </div>

      <div className="panel">
        <h2 className="card-title">+ Add a new subject</h2>
        <form className="form-grid" onSubmit={addSubject}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Example: Machine Learning, Biology, Accounting..." />
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Easy">🟢 Easy</option>
            <option value="Medium">🟡 Medium</option>
            <option value="Hard">🔴 Hard</option>
          </select>
          <button className="primary-btn full">+ Add Subject</button>
        </form>
      </div>

      <div className="grid three" style={{ marginTop: 16 }}>
        {!subjects.length && (
          <div className="panel" style={{ gridColumn: "1 / -1" }}>
            <div className="empty">
              <div style={{ fontSize: 50 }}>📚</div>
              <h3>No subjects yet</h3>
              <p>Add your own subjects above. You can add as many as you need.</p>
            </div>
          </div>
        )}

        {subjects.map((subject) => {
          const info = getDifficultyInfo(subject.difficulty);
          const progress = calculateSubjectProgress(subject.id, tasks);
          const taskCount = tasks.filter((task) => task.subjectId === subject.id).length;
          const completed = tasks.filter((task) => task.subjectId === subject.id && task.done).length;

          if (editingId === subject.id) {
            return (
              <div className="panel" key={subject.id}>
                <h2 className="card-title">Edit subject</h2>
                <div className="list">
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} />
                  <select value={editDifficulty} onChange={(e) => setEditDifficulty(e.target.value)}>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                  <div className="actions">
                    <button className="primary-btn" onClick={() => saveEdit(subject.id)}>Save</button>
                    <button className="ghost-btn" onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div className="panel subject-card" key={subject.id} style={{ "--subject-color": subject.color }}>
              <div className="row">
                <div className="row" style={{ justifyContent: "flex-start" }}>
                  <div className="subject-icon" style={{ background: info.background }}>{info.icon}</div>
                  <div>
                    <h2 className="card-title" style={{ marginBottom: 3 }}>{subject.name}</h2>
                    <div style={{ color: info.color, fontSize: 12 }}>
                      {info.icon} {subject.difficulty} · {info.description}
                    </div>
                  </div>
                </div>
                <span className="tag">{progress}%</span>
              </div>

              <div className="progress" style={{ marginTop: 17 }}>
                <div className="bar" style={{ width: progress + "%", background: `linear-gradient(90deg, ${subject.color}, #22d3ee)` }} />
              </div>

              <div className="row" style={{ marginTop: 12 }}>
                <span className="muted">{completed}/{taskCount} tasks</span>
                <span className="muted">{taskCount ? "In progress" : "No tasks yet"}</span>
              </div>

              <div className="actions" style={{ marginTop: 15 }}>
                <button className="ghost-btn" onClick={() => startEdit(subject)}>✎ Edit</button>
                <button className="danger-btn" onClick={() => deleteSubject(subject.id)}>× Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* -----------------------------------------------------------
   TASKS
----------------------------------------------------------- */

function Tasks({ tasks, setTasks, subjects, notify }) {
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const addTask = (e) => {
    e.preventDefault();
    if (!subjects.length) {
      notify("Please add a subject first");
      return;
    }
    if (!title.trim()) {
      notify("Please enter a task name");
      return;
    }
    if (!subjectId) {
      notify("Please select a subject");
      return;
    }
    if (!due) {
      notify("Please select a due date");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      subjectId: Number(subjectId),
      due,
      priority,
      done: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((current) => [...current, newTask]);
    setTitle("");
    setDue("");
    setPriority("Medium");
    notify("Task added successfully ✦");
  };

  const toggleTask = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, done: !task.done, completedAt: !task.done ? new Date().toISOString() : null }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
    notify("Task deleted");
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === "all" ||
      (filter === "pending" && !task.done) ||
      (filter === "completed" && task.done);

    const subjectMatch =
      subjectFilter === "all" ||
      task.subjectId === Number(subjectFilter);

    return statusMatch && subjectMatch;
  });

  const getSubject = (id) => subjects.find((subject) => subject.id === id);

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Execution</div>
          <h1 className="title">Tasks</h1>
          <div className="muted">Add tasks to any subject, set deadlines and choose priority.</div>
        </div>
      </div>

      <div className="grid two">
        <div className="panel">
          <h2 className="card-title">+ Add Task</h2>
          {!subjects.length ? (
            <div className="empty">
              <div style={{ fontSize: 40 }}>📚</div>
              <h3>Add a subject first</h3>
              <p>Tasks are connected to the subjects you create.</p>
            </div>
          ) : (
            <form className="form-grid" onSubmit={addTask}>
              <div className="full">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Example: Finish chapter 4 notes" />
              </div>
              <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                <option value="">Select subject</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {getDifficultyInfo(subject.difficulty).icon} {subject.name}
                  </option>
                ))}
              </select>
              <input type="date" value={due} onChange={(e) => setDue(e.target.value)} />
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🟢 Low Priority</option>
              </select>
              <button className="primary-btn">+ Add Task</button>
            </form>
          )}
        </div>

        <div className="panel">
          <h2 className="card-title">Task Overview</h2>
          <div className="grid three">
            <div className="item">
              <div className="muted">Total</div>
              <b style={{ fontSize: 22 }}>{tasks.length}</b>
            </div>
            <div className="item">
              <div className="muted">Pending</div>
              <b style={{ fontSize: 22, color: "#ffd58a" }}>{tasks.filter((task) => !task.done).length}</b>
            </div>
            <div className="item">
              <div className="muted">Completed</div>
              <b style={{ fontSize: 22, color: "#6ee7b7" }}>{tasks.filter((task) => task.done).length}</b>
            </div>
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="row">
          <h2 className="card-title">Your Tasks</h2>
          <span className="tag">{filteredTasks.length} shown</span>
        </div>

        <div className="filter-row">
          {[["all", "All"], ["pending", "Pending"], ["completed", "Completed"]].map(([id, label]) => (
            <button
              key={id}
              className={"filter-btn " + (filter === id ? "active" : "")}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="filter-row">
          <button
            className={"filter-btn " + (subjectFilter === "all" ? "active" : "")}
            onClick={() => setSubjectFilter("all")}
          >
            All Subjects
          </button>
          {subjects.map((subject) => (
            <button
              key={subject.id}
              className={"filter-btn " + (subjectFilter === String(subject.id) ? "active" : "")}
              onClick={() => setSubjectFilter(String(subject.id))}
            >
              {getDifficultyInfo(subject.difficulty).icon} {subject.name}
            </button>
          ))}
        </div>

        <div className="list">
          {filteredTasks
            .sort((a, b) => (a.due || "").localeCompare(b.due || ""))
            .map((task) => {
              const subject = getSubject(task.subjectId);
              const difficulty = subject ? getDifficultyInfo(subject.difficulty) : null;
              const priority = getPriorityInfo(task.priority);

              return (
                <div className="item row" key={task.id}>
                  <div className="row" style={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
                    <button className={"check " + (task.done ? "done" : "")} onClick={() => toggleTask(task.id)}>
                      {task.done ? "✓" : ""}
                    </button>
                    <div>
                      <b style={{ textDecoration: task.done ? "line-through" : "none", opacity: task.done ? 0.6 : 1 }}>
                        {task.title}
                      </b>
                      <div className="task-meta">
                        {subject && (
                          <span className="subject-mini">
                            {difficulty.icon} {subject.name}
                          </span>
                        )}
                        <span className="muted">Due: {formatDate(task.due)}</span>
                        <span className={"tag " + priority.className}>{priority.icon} {task.priority}</span>
                        {isToday(task.due) && <span className="tag medium">Today</span>}
                        {isPast(task.due) && !task.done && <span className="tag high">Overdue</span>}
                      </div>
                    </div>
                  </div>
                  <button className="danger-btn" onClick={() => deleteTask(task.id)}>×</button>
                </div>
              );
            })}
          {!filteredTasks.length && (
            <div className="empty">
              <div style={{ fontSize: 35 }}>✓</div>
              <h3>No tasks found</h3>
              <p>Add a task or change your filters.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* -----------------------------------------------------------
   PROGRESS
----------------------------------------------------------- */

function Progress({ profile, setProfile, tasks, subjects, studySessions, notify }) {
  const [minutes, setMinutes] = useState("");
  const today = getTodayKey();

  const todayMinutes = studySessions
    .filter((session) => session.date === today)
    .reduce((sum, session) => sum + session.minutes, 0);

  const goal = Number(profile.dailyGoal) || 60;
  const goalPercent = Math.min(100, Math.round((todayMinutes / goal) * 100));
  const completed = tasks.filter((task) => task.done).length;
  const completionPercent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const addStudyTime = (e) => {
    e.preventDefault();
    const value = Number(minutes);
    if (!value || value <= 0) {
      notify("Enter valid study minutes");
      return;
    }

    setProfile((p) => {
      const currentDate = getTodayKey();
      let newStreak = Number(p.streak) || 0;

      if (p.lastStudyDate !== currentDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().slice(0, 10);
        if (p.lastStudyDate === yesterdayKey) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }

      return {
        ...p,
        streak: newStreak,
        lastStudyDate: currentDate,
      };
    });

    setMinutes("");
    notify(`${value} minutes recorded 🔥`);
  };

  const weekData = useMemo(() => {
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().slice(0, 10);
      const total = studySessions
        .filter((session) => session.date === key)
        .reduce((sum, session) => sum + session.minutes, 0);

      result.push({
        key,
        label: date.toLocaleDateString(undefined, { weekday: "short" }),
        total,
      });
    }
    return result;
  }, [studySessions]);

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Analytics</div>
          <h1 className="title">Progress Tracker</h1>
          <div className="muted">Track study time, streaks, goals and subject progress.</div>
        </div>
      </div>

      <div className="grid three">
        <div className="panel">
          <h2 className="card-title">Today's Goal</h2>
          <div className="goal-circle" style={{ "--goal": goalPercent + "%" }}>
            <div className="goal-circle-inner">
              <div>
                <div className="goal-number">{goalPercent}%</div>
                <div className="muted">{todayMinutes}/{goal} min</div>
              </div>
            </div>
          </div>
          <form className="list" onSubmit={addStudyTime}>
            <input
              type="number"
              min="1"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="Add study minutes"
            />
            <button className="primary-btn">Record Study Time</button>
          </form>
        </div>

        <div className="panel">
          <h2 className="card-title">🔥 Study Streak</h2>
          <div style={{ font: '800 55px "Space Grotesk"', textAlign: "center", marginTop: 25 }}>
            {profile.streak}
          </div>
          <p className="muted" style={{ textAlign: "center" }}>consecutive study days</p>
          <div className="ai-suggestion">
            {profile.streak >= 7
              ? "Amazing consistency! Keep protecting your study habit."
              : "Study today to build your streak."}
          </div>
        </div>

        <div className="panel">
          <h2 className="card-title">Task Completion</h2>
          <div style={{ font: '700 45px "Space Grotesk"' }}>{completionPercent}%</div>
          <div className="progress" style={{ marginTop: 15 }}>
            <div className="bar" style={{ width: completionPercent + "%" }} />
          </div>
          <p className="muted">{completed} completed out of {tasks.length} tasks.</p>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <h2 className="card-title">Weekly Study Time</h2>
        <div className="chart">
          {weekData.map((day) => {
            const max = Math.max(...weekData.map((x) => x.total), goal);
            const height = max ? Math.max(7, (day.total / max) * 100) : 7;
            return (
              <div className="bar-col" key={day.key}>
                <b style={{ fontSize: 11 }}>{day.total}</b>
                <i style={{ height: height + "%" }} />
                <small>{day.label}</small>
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="row">
          <h2 className="card-title">Subject Progress</h2>
          <span className="tag">{subjects.length} subjects</span>
        </div>
        {!subjects.length ? (
          <div className="empty">Add subjects to start tracking them.</div>
        ) : (
          <div className="list">
            {subjects.map((subject) => {
              const info = getDifficultyInfo(subject.difficulty);
              const progress = calculateSubjectProgress(subject.id, tasks);
              return (
                <div className="item" key={subject.id}>
                  <div className="row">
                    <div>
                      <b>{info.icon} {subject.name}</b>
                      <div className="muted">{subject.difficulty}</div>
                    </div>
                    <b>{progress}%</b>
                  </div>
                  <div className="progress" style={{ marginTop: 10 }}>
                    <div className="bar" style={{ width: progress + "%", background: `linear-gradient(90deg, ${subject.color}, #22d3ee)` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

/* -----------------------------------------------------------
   REMINDERS
----------------------------------------------------------- */

function Reminders({ exams, setExams, tasks, subjects, notify }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("High");

  const addExam = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) {
      notify("Enter exam name and date");
      return;
    }
    setExams((current) => [
      ...current,
      { id: Date.now(), title: title.trim(), date, priority },
    ]);
    setTitle("");
    setDate("");
    setPriority("High");
    notify("Exam reminder added 📅");
  };

  const deleteExam = (id) => {
    setExams((current) => current.filter((exam) => exam.id !== id));
    notify("Exam reminder deleted");
  };

  const sortedExams = [...exams].sort((a, b) => a.date.localeCompare(b.date));
  const upcomingTasks = [...tasks]
    .filter((task) => !task.done && task.due)
    .sort((a, b) => a.due.localeCompare(b.due))
    .slice(0, 10);

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Smart alerts</div>
          <h1 className="title">Reminders</h1>
          <div className="muted">Exams and upcoming tasks in one place.</div>
        </div>
      </div>

      <div className="grid two">
        <div className="panel">
          <h2 className="card-title">📅 Add Exam Reminder</h2>
          <form className="list" onSubmit={addExam}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Exam / assignment / test name"
            />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <button className="primary-btn">+ Add Reminder</button>
          </form>
        </div>

        <div className="panel">
          <h2 className="card-title">🔔 Upcoming Task Reminders</h2>
          <div className="reminder-list">
            {upcomingTasks.map((task) => {
              const subject = subjects.find((s) => s.id === task.subjectId);
              const days = daysUntil(task.due);
              return (
                <div
                  className={"item reminder-card " + (isPast(task.due) ? "overdue" : isToday(task.due) ? "today" : "")}
                  key={task.id}
                >
                  <div className="row">
                    <div>
                      <b>{task.title}</b>
                      <div className="muted">{subject ? subject.name : "Unknown subject"} · {formatDate(task.due)}</div>
                    </div>
                    <span className={"tag " + getPriorityInfo(task.priority).className}>
                      {days === 0 ? "Today" : days < 0 ? "Overdue" : `${days}d`}
                    </span>
                  </div>
                </div>
              );
            })}
            {!upcomingTasks.length && <div className="empty">No upcoming tasks.</div>}
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <h2 className="card-title">Exam Calendar</h2>
        <div className="list">
          {sortedExams.map((exam) => {
            const days = daysUntil(exam.date);
            return (
              <div
                className={"item reminder-card " + (days < 0 ? "overdue" : days === 0 ? "today" : "")}
                key={exam.id}
              >
                <div className="row">
                  <div>
                    <b>{exam.title}</b>
                    <div className="task-meta">
                      <span className="muted">{formatDate(exam.date)}</span>
                      <span className={"tag " + getPriorityInfo(exam.priority).className}>
                        {getPriorityInfo(exam.priority).icon} {exam.priority}
                      </span>
                    </div>
                  </div>
                  <div className="actions">
                    <span className="tag">
                      {days < 0 ? "Passed" : days === 0 ? "Today" : `${days} days left`}
                    </span>
                    <button className="danger-btn" onClick={() => deleteExam(exam.id)}>×</button>
                  </div>
                </div>
              </div>
            );
          })}
          {!sortedExams.length && <div className="empty">📅<br />No exams or deadlines added yet.</div>}
        </div>
      </div>
    </>
  );
}

/* -----------------------------------------------------------
   AI ASSISTANT (SMART DUAL REAL-TIME SOLVER)
----------------------------------------------------------- */

function AIAssistant({ subjects, tasks, profile }) {
  const [mode, setMode] = useState("ask");
  const [input, setInput] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: `Hi ${profile.name || "there"}! 👋\n\nI'm your StudyFlow AI. Ask me anything about your studies, ask for a study plan, explain a difficult topic, or generate a quiz.`,
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const selectedSubject = subjects.find((subject) => subject.id === Number(subjectId));
  const subjectName = selectedSubject?.name || "your subjects";

  const context = useMemo(() => ({
    student: profile.name || "Student",
    course: profile.course || "",
    streak: profile.streak || 0,
    subjects: subjects.map((s) => ({
      name: s.name,
      difficulty: s.difficulty,
    })),
    pendingTasks: tasks
      .filter((task) => !task.done)
      .slice(0, 8)
      .map((task) => ({
        title: task.title,
        due: task.due,
        priority: task.priority,
      })),
  }), [profile, subjects, tasks]);

  // BULLETPROOF LIVE STREAMING / REAL-TIME SOLVER
  const askAI = async () => {
    const question = input.trim();
    if (!question && !["tips", "plan"].includes(mode)) return;

    const prompt = question || `Create a personalized ${mode} session for ${subjectName}.`;
    const modePrompt = mode === "ask" ? prompt : `${mode}: ${prompt}`;
    setInput("");
    setQuizScore(null);

    const userMsgId = Date.now();
    const botMsgId = Date.now() + 1;

    setMessages((current) => [
      ...current,
      { id: userMsgId, role: "user", text: prompt },
      { id: botMsgId, role: "assistant", text: "" },
    ]);
    setTyping(true);

    try {
      // 1. Attempt Real-Time SSE Stream Endpoint
      let streamSuccess = false;
      try {
        const streamRes = await fetch("http://localhost:5000/api/ai/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: modePrompt, context }),
        });

        if (streamRes.ok) {
          const reader = streamRes.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let accumulatedText = "";
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop();

            for (const line of lines) {
              const cleanLine = line.trim();
              if (cleanLine.startsWith("data: ")) {
                const dataStr = cleanLine.slice(6);
                if (dataStr === "[DONE]") break;
                try {
                  const { text } = JSON.parse(dataStr);
                  if (text) {
                    accumulatedText += text;
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === botMsgId ? { ...msg, text: accumulatedText } : msg
                      )
                    );
                  }
                } catch {
                  // Ignore partial chunks
                }
              }
            }
          }
          if (accumulatedText.trim()) {
            streamSuccess = true;
          }
        }
      } catch {
        // Stream endpoint failed, try standard endpoint
      }

      if (streamSuccess) return;

      // 2. Fallback: Query standard endpoint and type out live
      const standardRes = await fetch("http://localhost:5000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: modePrompt, context }),
      });

      const data = await standardRes.json();
      if (!standardRes.ok || !data.answer) {
        throw new Error(data.error || `Server returned status ${standardRes.status}`);
      }

      // Smooth live typing simulation
      const fullText = data.answer;
      let currentText = "";
      for (let i = 0; i < fullText.length; i += 3) {
        currentText += fullText.slice(i, i + 3);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId ? { ...msg, text: currentText } : msg
          )
        );
        await new Promise((r) => setTimeout(r, 12));
      }
    } catch (err) {
      console.error("AI Error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMsgId
            ? {
                ...msg,
                text: `⚠️ Connection Error: ${err.message}\n\nPlease check:\n1. Is your backend running? ('node server.cjs' in terminal)\n2. Is your GEMINI_API_KEY valid in .env?\n3. Visit http://localhost:5000/api/health in browser to test.`,
              }
            : msg
        )
      );
    } finally {
      setTyping(false);
    }
  };

  const generateQuiz = () => {
    const topic = input.trim() || subjectName;
    const generatedQuiz = [
      {
        id: Date.now() + 1,
        question: `Which approach is most effective when learning ${topic}?`,
        options: [
          "Only reread the same notes",
          "Use active recall and practice questions",
          "Study everything in one sitting",
          "Skip difficult concepts",
        ],
        answer: 1,
      },
      {
        id: Date.now() + 2,
        question: `What should you do when ${topic} feels difficult?`,
        options: [
          "Break it into smaller concepts",
          "Ignore it permanently",
          "Memorize without understanding",
          "Stop practicing",
        ],
        answer: 0,
      },
      {
        id: Date.now() + 3,
        question: "Which technique checks whether you can remember information without looking?",
        options: [
          "Active recall",
          "Highlighting every sentence",
          "Passive rereading",
          "Watching a video repeatedly",
        ],
        answer: 0,
      },
    ];

    setQuiz(generatedQuiz);
    setQuizAnswers({});
    setQuizScore(null);
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "assistant",
        text: `🧠 Quiz ready! I created 3 practice questions around “${topic}”. Choose an answer for each question and check your score.`,
      },
    ]);
  };

  const scoreQuiz = () => {
    const score = quiz.reduce(
      (total, question) => total + (quizAnswers[question.id] === question.answer ? 1 : 0),
      0
    );
    setQuizScore(score);
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "assistant",
        text: `🎯 Quiz result: ${score}/${quiz.length}. ${
          score === quiz.length
            ? "Excellent — you are ready for a harder set!"
            : score >= Math.ceil(quiz.length / 2)
            ? "Good job. Review the questions you missed and try again."
            : "No problem. Do a quick revision, then retake the quiz."
        }`,
      },
    ]);
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        text: "Chat cleared. ✨ What would you like to study now?",
      },
    ]);
    setQuiz([]);
    setQuizAnswers({});
    setQuizScore(null);
  };

  const copyLast = async () => {
    const last = [...messages].reverse().find((m) => m.role === "assistant");
    if (!last) return;
    try {
      await navigator.clipboard.writeText(last.text);
    } catch {
      // Clipboard may be restricted
    }
  };

  const quickPrompts = [
    "Explain this topic like I'm a beginner",
    "Make a study plan for today",
    "Give me 5 exam tips",
    "Quiz me on my subject",
  ];

  const tabs = [
    ["ask", "💬 Chat"],
    ["explain", "📘 Explain"],
    ["plan", "🗓️ Study Plan"],
    ["revision", "⚡ Revision"],
    ["tips", "💡 Coaching"],
    ["quiz", "🧠 Quiz"],
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">AI Study Lab · Real Time</div>
          <h1 className="title">Study Assistant <span className="gradient">✦</span></h1>
          <div className="muted">A smarter study companion that uses your subjects, tasks, streak and questions in real time.</div>
        </div>
        <div className="actions">
          <button className="ghost-btn" onClick={copyLast}>⧉ Copy answer</button>
          <button className="ghost-btn" onClick={clearChat}>↺ Clear chat</button>
        </div>
      </div>

      <div className="ai-shell panel">
        <div className="ai-status-row">
          <div className="ai-status">
            <span className="ai-live-dot" />
            <span>StudyFlow AI</span>
            <small>Live Real-Time</small>
          </div>
          <div className="ai-context-tags">
            <span className="tag">📚 {subjects.length} subjects</span>
            <span className="tag">✓ {tasks.filter((task) => !task.done).length} pending</span>
            <span className="tag">🔥 {profile.streak} day streak</span>
          </div>
        </div>

        <div className="ai-tabs">
          {tabs.map(([id, label]) => (
            <button
              key={id}
              className={`ai-tab ${mode === id ? "active" : ""}`}
              onClick={() => {
                setMode(id);
                setQuiz([]);
                setQuizScore(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="ai-chat-window">
          {messages.map((message) => (
            <div key={message.id} className={`ai-message ${message.role}`}>
              <div className="ai-message-avatar">
                {message.role === "assistant" ? "✦" : (profile.name || "S").charAt(0).toUpperCase()}
              </div>
              <div className="ai-message-body">
                <div className="ai-message-name">{message.role === "assistant" ? "StudyFlow AI" : "You"}</div>
                <div className="ai-message-text">{message.text}</div>
              </div>
            </div>
          ))}
          {typing && !messages[messages.length - 1]?.text && (
            <div className="ai-message assistant">
              <div className="ai-message-avatar">✦</div>
              <div className="ai-message-body">
                <div className="ai-message-name">StudyFlow AI</div>
                <div className="ai-typing"><i /><i /><i /> Solving live…</div>
              </div>
            </div>
          )}
        </div>

        <div className="ai-quick-row">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              className="ai-quick"
              onClick={() => {
                if (prompt.startsWith("Quiz")) setMode("quiz");
                else if (prompt.includes("study plan")) setMode("plan");
                else if (prompt.includes("exam")) setMode("tips");
                else setMode("explain");
                setInput(prompt);
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="ai-composer">
          <div className="ai-composer-top">
            <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              <option value="">Use all subjects</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {getDifficultyInfo(subject.difficulty).icon} {subject.name}
                </option>
              ))}
            </select>
            <span className="ai-mode-label">Mode: <b>{tabs.find(([id]) => id === mode)?.[1]}</b></span>
          </div>

          {mode === "quiz" && (
            <div className="ai-suggestion">Choose a subject, enter a topic, and generate practice questions.</div>
          )}

          {mode !== "tips" && mode !== "plan" && (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  mode === "quiz" ? generateQuiz() : askAI();
                }
              }}
              placeholder={mode === "quiz" ? "Enter topic for quiz…" : "Ask any question… e.g. Solve 2x + 5 = 15 or explain Mitosis"}
            />
          )}

          {(mode === "tips" || mode === "plan") && (
            <div className="ai-suggestion">
              {mode === "tips"
                ? `Personalized study coaching for ${subjectName}.`
                : `Prioritizing your pending tasks to build a study plan.`}
            </div>
          )}

          <div className="ai-compose-footer">
            <small>Tip: Press Ctrl + Enter to send</small>
            <button
              className="primary-btn"
              disabled={typing}
              onClick={mode === "quiz" ? generateQuiz : askAI}
            >
              {typing ? "Generating…" : mode === "quiz" ? "🧠 Generate Quiz" : "✦ Ask StudyFlow AI"}
            </button>
          </div>
        </div>
      </div>

      {quiz.length > 0 && (
        <div className="panel ai-quiz-panel" style={{ marginTop: 16 }}>
          <div className="row">
            <div>
              <div className="eyebrow">Knowledge check</div>
              <h2 className="card-title">🧠 Interactive Practice Quiz</h2>
            </div>
            {quizScore !== null && <span className="ai-score-badge">{quizScore}/{quiz.length}</span>}
          </div>

          {quiz.map((question, index) => (
            <div className="quiz-question" key={question.id}>
              <b>{index + 1}. {question.question}</b>
              {question.options.map((option, optionIndex) => {
                const selected = quizAnswers[question.id] === optionIndex;
                const correct = quizScore !== null && question.answer === optionIndex;
                return (
                  <button
                    className={`quiz-option ${selected ? "selected" : ""} ${correct ? "correct" : ""}`}
                    key={option}
                    onClick={() => setQuizAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>{option}
                  </button>
                );
              })}
            </div>
          ))}

          <button className="primary-btn" onClick={scoreQuiz}>
            Check My Score →
          </button>
        </div>
      )}
    </>
  );
}

/* -----------------------------------------------------------
   POMODORO
----------------------------------------------------------- */

function Pomodoro({ notify, onStudyComplete }) {
  const [mode, setMode] = useState("Focus");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          setRunning(false);
          if (mode === "Focus") {
            onStudyComplete(25);
            notify("Focus session complete 🔥");
          } else {
            notify("Break complete ✦");
          }
          return mode === "Focus" ? 5 * 60 : 25 * 60;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running, mode, notify, onStudyComplete]);

  const selectMode = (newMode) => {
    setMode(newMode);
    setRunning(false);
    setSeconds(newMode === "Focus" ? 25 * 60 : 5 * 60);
  };

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Deep work</div>
          <h1 className="title">Pomodoro Focus Lab</h1>
        </div>
      </div>

      <div className="panel timer">
        <div className="mode-row">
          {["Focus", "Break"].map((item) => (
            <button
              key={item}
              className={"ghost-btn " + (mode === item ? "active" : "")}
              onClick={() => selectMode(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="timer-face">{minutes}:{secs}</div>
        <p className="muted">
          {mode === "Focus" ? "Focus on one task. Notifications off." : "Give your brain a short reset."}
        </p>
        <div className="actions" style={{ justifyContent: "center" }}>
          <button className="primary-btn" onClick={() => setRunning((v) => !v)}>
            {running ? "Pause" : "Start session"}
          </button>
          <button className="ghost-btn" onClick={() => selectMode(mode)}>Reset</button>
        </div>
      </div>
    </>
  );
}

/* -----------------------------------------------------------
   SCHEDULE
----------------------------------------------------------- */

function Schedule({ tasks, exams, subjects }) {
  const scheduleTasks = [...tasks]
    .filter((task) => task.due)
    .sort((a, b) => a.due.localeCompare(b.due));

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">Your week</div>
          <h1 className="title">Smart Schedule</h1>
          <div className="muted">Your upcoming academic workload.</div>
        </div>
      </div>

      <div className="grid two">
        <div className="panel">
          <h2 className="card-title">Task Schedule</h2>
          <div className="list">
            {scheduleTasks.map((task) => {
              const subject = subjects.find((s) => s.id === task.subjectId);
              return (
                <div className="item row" key={task.id}>
                  <div>
                    <b>{task.title}</b>
                    <div className="muted">{subject?.name || "Subject"} · {formatDate(task.due)}</div>
                  </div>
                  <span className={"tag " + getPriorityInfo(task.priority).className}>{task.priority}</span>
                </div>
              );
            })}
            {!scheduleTasks.length && <div className="empty">No scheduled tasks yet.</div>}
          </div>
        </div>

        <div className="panel">
          <h2 className="card-title">Exam Schedule</h2>
          <div className="list">
            {exams.sort((a, b) => a.date.localeCompare(b.date)).map((exam) => (
              <div className="item" key={exam.id}>
                <b>{exam.title}</b>
                <div className="muted">{formatDate(exam.date)}</div>
              </div>
            ))}
            {!exams.length && <div className="empty">No exams scheduled.</div>}
          </div>
        </div>
      </div>
    </>
  );
}

/* -----------------------------------------------------------
   PROFILE
----------------------------------------------------------- */

function Profile({ profile, setProfile, subjects, tasks, notify, logout }) {
  const [name, setName] = useState(profile.name);
  const [studentClass, setStudentClass] = useState(profile.studentClass);
  const [course, setCourse] = useState(profile.course);
  const [goal, setGoal] = useState(profile.goal);
  const [dailyGoal, setDailyGoal] = useState(profile.dailyGoal);

  const saveProfile = (e) => {
    e.preventDefault();
    setProfile((current) => ({
      ...current,
      name: name.trim() || "Student",
      studentClass: studentClass.trim(),
      course: course.trim(),
      goal: goal.trim(),
      dailyGoal: Number(dailyGoal) || 60,
    }));
    notify("Profile updated successfully ✦");
  };

  const initials = (profile.name || "Student").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">My account</div>
          <h1 className="title">Profile & Goals</h1>
          <div className="muted">Customize your StudyFlow experience.</div>
        </div>
      </div>

      <div className="grid two">
        <div className="panel">
          <div className="row" style={{ marginBottom: 20 }}>
            <div className="profile-avatar">{initials}</div>
            <div>
              <h2 className="card-title" style={{ marginBottom: 4 }}>{profile.name || "Student"}</h2>
              <div className="muted">{profile.course || "Add your course"}</div>
            </div>
          </div>

          <form className="list" onSubmit={saveProfile}>
            <label>
              <div className="muted">Student name</div>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </label>
            <label>
              <div className="muted">Class / Year</div>
              <input value={studentClass} onChange={(e) => setStudentClass(e.target.value)} placeholder="Example: Class 12 / 2nd Year" />
            </label>
            <label>
              <div className="muted">Course / Program</div>
              <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Example: B.Tech Computer Science" />
            </label>
            <label>
              <div className="muted">Main study goal</div>
              <textarea value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Example: Score above 90% this semester" />
            </label>
            <label>
              <div className="muted">Daily study goal (minutes)</div>
              <input type="number" min="10" value={dailyGoal} onChange={(e) => setDailyGoal(e.target.value)} />
            </label>
            <button className="primary-btn">Save Profile</button>
          </form>
        </div>

        <div className="panel">
          <h2 className="card-title">Your Study Identity</h2>
          <div className="grid two">
            <div className="item">
              <div className="muted">Class</div>
              <b>{profile.studentClass || "Not added"}</b>
            </div>
            <div className="item">
              <div className="muted">Course</div>
              <b>{profile.course || "Not added"}</b>
            </div>
            <div className="item">
              <div className="muted">Subjects</div>
              <b>{subjects.length}</b>
            </div>
            <div className="item">
              <div className="muted">Tasks</div>
              <b>{tasks.length}</b>
            </div>
          </div>

          <div className="item" style={{ marginTop: 12, textAlign: "center" }}>
            <div style={{ fontSize: 45 }}>🔥</div>
            <div style={{ font: '700 35px "Space Grotesk"' }}>{profile.streak}</div>
            <div className="muted">day study streak</div>
          </div>

          <div className="item" style={{ marginTop: 12 }}>
            <b>🎯 My Goal</b>
            <p className="muted">{profile.goal || "You haven't added a study goal yet."}</p>
          </div>

          <div className="actions" style={{ marginTop: 16 }}>
            <button className="danger-btn" onClick={logout}>Log out</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* -----------------------------------------------------------
   APP ROOT
----------------------------------------------------------- */

function App() {
  const [page, setPage] = useState("welcome");
  const [profile, setProfile] = useStore("studyFlowProfile", null);
  const [data, setData] = useStore("studyFlowDataV2", initialData);
  const [dark, setDark] = useState(true);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2800);
  };

  const navigate = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = (newProfile) => {
    setProfile(newProfile);
    navigate("dashboard");
    notify("Welcome to StudyFlow ✦");
  };

  const logout = () => {
    setProfile(null);
    navigate("welcome");
    notify("You have been logged out");
  };

  const updateData = (key, value) => {
    setData((current) => ({
      ...current,
      [key]: typeof value === "function" ? value(current[key]) : value,
    }));
  };

  const recordStudySession = (minutes) => {
    const today = getTodayKey();
    updateData("studySessions", (sessions) => [
      ...sessions,
      { id: Date.now(), date: today, minutes },
    ]);

    setProfile((current) => {
      if (!current) return current;
      let streak = Number(current.streak) || 0;
      if (current.lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayKey = yesterday.toISOString().slice(0, 10);
        if (current.lastStudyDate === yesterdayKey) {
          streak += 1;
        } else {
          streak = 1;
        }
      }
      return { ...current, streak, lastStudyDate: today };
    });
  };

  if (page === "welcome") {
    return (
      <>
        <style>{styles}</style>
        <Welcome go={navigate} />
      </>
    );
  }

  if (page === "login") {
    return (
      <>
        <style>{styles}</style>
        <Login onLogin={login} go={navigate} />
      </>
    );
  }

  let view = null;
  if (page === "dashboard") {
    view = <Dashboard profile={profile || initialProfile} navigate={navigate} subjects={data.subjects} tasks={data.tasks} exams={data.exams} studySessions={data.studySessions} />;
  } else if (page === "subjects") {
    view = <Subjects subjects={data.subjects} setSubjects={(val) => updateData("subjects", val)} tasks={data.tasks} notify={notify} />;
  } else if (page === "tasks") {
    view = <Tasks tasks={data.tasks} setTasks={(val) => updateData("tasks", val)} subjects={data.subjects} notify={notify} />;
  } else if (page === "progress") {
    view = <Progress profile={profile || initialProfile} setProfile={setProfile} tasks={data.tasks} subjects={data.subjects} studySessions={data.studySessions} notify={notify} />;
  } else if (page === "reminders") {
    view = <Reminders exams={data.exams} setExams={(val) => updateData("exams", val)} tasks={data.tasks} subjects={data.subjects} notify={notify} />;
  } else if (page === "ai") {
    view = <AIAssistant subjects={data.subjects} tasks={data.tasks} profile={profile || initialProfile} />;
  } else if (page === "pomodoro") {
    view = <Pomodoro notify={notify} onStudyComplete={recordStudySession} />;
  } else if (page === "schedule") {
    view = <Schedule tasks={data.tasks} exams={data.exams} subjects={data.subjects} />;
  } else if (page === "profile") {
    view = <Profile profile={profile || initialProfile} setProfile={setProfile} subjects={data.subjects} tasks={data.tasks} notify={notify} logout={logout} />;
  }

  return (
    <>
      <style>{styles}</style>
      <Layout page={page} navigate={navigate} dark={dark} setDark={setDark} logout={logout}>
        {view}
      </Layout>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

export default App;