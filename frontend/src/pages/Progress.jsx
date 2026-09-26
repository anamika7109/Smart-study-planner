import { useMemo, useState } from "react";

function Progress() {
  const [subjects, setSubjects] = useState([
    { name: "Mathematics", completed: 8, total: 10, icon: "📐" },
    { name: "Physics", completed: 6, total: 10, icon: "⚡" },
    { name: "Chemistry", completed: 7, total: 10, icon: "🧪" },
    { name: "Computer Science", completed: 9, total: 10, icon: "💻" },
  ]);

  const [weeklyGoal, setWeeklyGoal] = useState(12);
  const [completedHours, setCompletedHours] = useState(8);
  const [showDetails, setShowDetails] = useState(false);

  const overallProgress = useMemo(() => {
    const completed = subjects.reduce(
      (sum, subject) => sum + subject.completed,
      0
    );

    const total = subjects.reduce(
      (sum, subject) => sum + subject.total,
      0
    );

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [subjects]);

  const weeklyProgress =
    weeklyGoal === 0
      ? 0
      : Math.min(100, Math.round((completedHours / weeklyGoal) * 100));

  const totalCompleted = subjects.reduce(
    (sum, subject) => sum + subject.completed,
    0
  );

  const totalTasks = subjects.reduce(
    (sum, subject) => sum + subject.total,
    0
  );

  const updateSubject = (index, amount) => {
    setSubjects((previous) =>
      previous.map((subject, i) => {
        if (i !== index) return subject;

        const newCompleted = Math.max(
          0,
          Math.min(subject.total, subject.completed + amount)
        );

        return {
          ...subject,
          completed: newCompleted,
        };
      })
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.backgroundCircleOne}></div>
      <div style={styles.backgroundCircleTwo}></div>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <p style={styles.smallTitle}>YOUR LEARNING JOURNEY</p>

            <h1 style={styles.title}>
              Study <span style={styles.titleBlue}>Progress</span> 📊
            </h1>

            <p style={styles.subtitle}>
              Track your learning, celebrate your achievements, and keep
              moving forward.
            </p>
          </div>

          <div style={styles.overallCircle}>
            <div style={styles.circleInner}>
              <strong style={styles.circleNumber}>
                {overallProgress}%
              </strong>
              <span style={styles.circleText}>Overall</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📚</div>
            <div>
              <p style={styles.statLabel}>Tasks Completed</p>
              <h2 style={styles.statNumber}>
                {totalCompleted}
                <span style={styles.statTotal}> / {totalTasks}</span>
              </h2>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>⏱️</div>
            <div>
              <p style={styles.statLabel}>Study Hours</p>
              <h2 style={styles.statNumber}>{completedHours}h</h2>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🔥</div>
            <div>
              <p style={styles.statLabel}>Current Streak</p>
              <h2 style={styles.statNumber}>7 days</h2>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>🏆</div>
            <div>
              <p style={styles.statLabel}>Achievement</p>
              <h2 style={styles.statNumber}>Great!</h2>
            </div>
          </div>
        </div>

        {/* Weekly Goal */}
        <div style={styles.glassCard}>
          <div style={styles.sectionHeader}>
            <div>
              <p style={styles.cardMiniTitle}>THIS WEEK</p>
              <h2 style={styles.cardTitle}>Weekly Study Goal 🎯</h2>
            </div>

            <div style={styles.goalBadge}>
              {completedHours} / {weeklyGoal} hrs
            </div>
          </div>

          <div style={styles.progressTrack}>
            <div
              style={{
                ...styles.progressFill,
                width: `${weeklyProgress}%`,
              }}
            ></div>
          </div>

          <div style={styles.goalBottom}>
            <span>
              {weeklyProgress}% completed
            </span>

            <div style={styles.goalControls}>
              <button
                style={styles.smallButton}
                onClick={() =>
                  setCompletedHours((value) => Math.max(0, value - 1))
                }
              >
                −
              </button>

              <button
                style={styles.smallButton}
                onClick={() =>
                  setCompletedHours((value) => value + 1)
                }
              >
                +
              </button>

              <button
                style={styles.goalButton}
                onClick={() =>
                  setWeeklyGoal((value) => value + 1)
                }
              >
                Increase Goal
              </button>
            </div>
          </div>
        </div>

        {/* Subject Progress */}
        <div style={styles.glassCard}>
          <div style={styles.sectionHeader}>
            <div>
              <p style={styles.cardMiniTitle}>SUBJECTS</p>
              <h2 style={styles.cardTitle}>Subject Progress 📖</h2>
            </div>

            <button
              style={styles.detailsButton}
              onClick={() => setShowDetails((value) => !value)}
            >
              {showDetails ? "Hide Details" : "View Details"}
            </button>
          </div>

          <div style={styles.subjectList}>
            {subjects.map((subject, index) => {
              const percentage =
                subject.total === 0
                  ? 0
                  : Math.round(
                      (subject.completed / subject.total) * 100
                    );

              return (
                <div style={styles.subjectRow} key={subject.name}>
                  <div style={styles.subjectIcon}>{subject.icon}</div>

                  <div style={styles.subjectInfo}>
                    <div style={styles.subjectTop}>
                      <strong style={styles.subjectName}>
                        {subject.name}
                      </strong>

                      <span style={styles.subjectPercentage}>
                        {percentage}%
                      </span>
                    </div>

                    <div style={styles.subjectTrack}>
                      <div
                        style={{
                          ...styles.subjectFill,
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>

                    {showDetails && (
                      <p style={styles.detailsText}>
                        {subject.completed} of {subject.total} tasks
                        completed
                      </p>
                    )}
                  </div>

                  <div style={styles.subjectButtons}>
                    <button
                      style={styles.roundButton}
                      onClick={() => updateSubject(index, -1)}
                    >
                      −
                    </button>

                    <button
                      style={styles.roundButton}
                      onClick={() => updateSubject(index, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Motivation */}
        <div style={styles.motivationCard}>
          <div style={styles.motivationIcon}>✨</div>

          <div>
            <h2 style={styles.motivationTitle}>
              Keep going, you've got this!
            </h2>

            <p style={styles.motivationText}>
              Every completed task brings you one step closer to your
              goals. Stay consistent and keep learning.
            </p>
          </div>
        </div>

        {/* Achievement */}
        <div style={styles.glassCard}>
          <p style={styles.cardMiniTitle}>ACHIEVEMENTS</p>

          <h2 style={styles.cardTitle}>Your Milestones 🏅</h2>

          <div style={styles.achievementGrid}>
            <div style={styles.achievement}>
              <div style={styles.achievementIcon}>🔥</div>
              <strong>7 Day Streak</strong>
              <span>Keep it going!</span>
            </div>

            <div style={styles.achievement}>
              <div style={styles.achievementIcon}>📚</div>
              <strong>30 Tasks</strong>
              <span>Excellent progress</span>
            </div>

            <div style={styles.achievement}>
              <div style={styles.achievementIcon}>⏰</div>
              <strong>10 Hours</strong>
              <span>Focused learner</span>
            </div>

            <div style={styles.achievement}>
              <div style={styles.achievementIcon}>🌟</div>
              <strong>Top Learner</strong>
              <span>You're doing great</span>
            </div>
          </div>
        </div>

        <p style={styles.footerText}>
          Small progress every day leads to big results. 💙
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
    padding: "40px 20px",
    background:
      "linear-gradient(135deg, #eaf8ff 0%, #f7fcff 45%, #dff3ff 100%)",
    fontFamily:
      "Inter, Arial, Helvetica, sans-serif",
    color: "#17324d",
    position: "relative",
    overflow: "hidden",
  },

  backgroundCircleOne: {
    position: "fixed",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(130, 211, 255, 0.22)",
    top: "-100px",
    right: "-80px",
    filter: "blur(4px)",
    pointerEvents: "none",
  },

  backgroundCircleTwo: {
    position: "fixed",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(174, 227, 255, 0.25)",
    bottom: "-80px",
    left: "-80px",
    filter: "blur(4px)",
    pointerEvents: "none",
  },

  container: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    marginBottom: "30px",
  },

  smallTitle: {
    margin: "0 0 8px",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
    color: "#559bc2",
  },

  title: {
    margin: 0,
    fontSize: "42px",
    fontWeight: "800",
    fontStyle: "italic",
    fontFamily: "Georgia, serif",
    color: "#183b56",
  },

  titleBlue: {
    color: "#42a9df",
  },

  subtitle: {
    marginTop: "10px",
    color: "#668096",
    fontSize: "15px",
    maxWidth: "650px",
    lineHeight: 1.6,
  },

  overallCircle: {
    width: "135px",
    height: "135px",
    borderRadius: "50%",
    background:
      "conic-gradient(#55b8e8 0deg, #55b8e8 270deg, #d8eef9 270deg)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    boxShadow: "0 15px 35px rgba(72, 157, 202, 0.20)",
  },

  circleInner: {
    width: "105px",
    height: "105px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(15px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  circleNumber: {
    fontSize: "27px",
    color: "#258cc1",
  },

  circleText: {
    fontSize: "11px",
    color: "#7890a0",
    marginTop: "3px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  statCard: {
    background: "rgba(255,255,255,0.63)",
    border: "1px solid rgba(255,255,255,0.8)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    borderRadius: "22px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow:
      "0 12px 30px rgba(70, 143, 178, 0.10)",
  },

  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "16px",
    background: "rgba(218,242,253,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  statLabel: {
    margin: 0,
    color: "#7890a0",
    fontSize: "12px",
  },

  statNumber: {
    margin: "4px 0 0",
    fontSize: "22px",
    color: "#214861",
  },

  statTotal: {
    color: "#9aafbc",
    fontSize: "15px",
  },

  glassCard: {
    background: "rgba(255,255,255,0.60)",
    border: "1px solid rgba(255,255,255,0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "25px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow:
      "0 15px 40px rgba(61, 135, 172, 0.10)",
  },

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "22px",
  },

  cardMiniTitle: {
    margin: 0,
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.7px",
    color: "#5ba6cc",
  },

  cardTitle: {
    margin: "5px 0 0",
    fontSize: "22px",
    fontStyle: "italic",
    fontFamily: "Georgia, serif",
    color: "#244962",
  },

  goalBadge: {
    background: "rgba(211,241,254,0.85)",
    color: "#258cc1",
    borderRadius: "20px",
    padding: "8px 13px",
    fontWeight: "700",
    fontSize: "13px",
  },

  progressTrack: {
    width: "100%",
    height: "14px",
    background: "rgba(205,229,239,0.7)",
    borderRadius: "20px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "20px",
    background:
      "linear-gradient(90deg, #65c5ee, #389ed3)",
    transition: "width 0.3s ease",
  },

  goalBottom: {
    marginTop: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#708899",
    fontSize: "13px",
    gap: "15px",
    flexWrap: "wrap",
  },

  goalControls: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
  },

  smallButton: {
    width: "32px",
    height: "32px",
    border: "none",
    borderRadius: "10px",
    background: "#e3f5fd",
    color: "#238fc2",
    fontSize: "18px",
    cursor: "pointer",
  },

  goalButton: {
    border: "none",
    borderRadius: "12px",
    padding: "9px 13px",
    background: "#dff3fc",
    color: "#258fc0",
    fontWeight: "700",
    cursor: "pointer",
  },

  detailsButton: {
    border: "none",
    borderRadius: "12px",
    padding: "9px 14px",
    background: "#e2f5fd",
    color: "#258fc0",
    fontWeight: "700",
    cursor: "pointer",
  },

  subjectList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  subjectRow: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
  },

  subjectIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "15px",
    background: "rgba(226,245,253,0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    flexShrink: 0,
  },

  subjectInfo: {
    flex: 1,
    minWidth: 0,
  },

  subjectTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    gap: "10px",
  },

  subjectName: {
    fontSize: "14px",
    color: "#35566c",
  },

  subjectPercentage: {
    fontSize: "13px",
    fontWeight: "800",
    color: "#349aca",
  },

  subjectTrack: {
    height: "9px",
    borderRadius: "20px",
    background: "#dcecf3",
    overflow: "hidden",
  },

  subjectFill: {
    height: "100%",
    borderRadius: "20px",
    background:
      "linear-gradient(90deg, #75caed, #3da5d7)",
    transition: "width 0.3s ease",
  },

  detailsText: {
    fontSize: "11px",
    color: "#8a9eaa",
    margin: "6px 0 0",
  },

  subjectButtons: {
    display: "flex",
    gap: "5px",
  },

  roundButton: {
    width: "29px",
    height: "29px",
    borderRadius: "50%",
    border: "none",
    background: "#e3f5fd",
    color: "#258fc0",
    cursor: "pointer",
    fontSize: "17px",
  },

  motivationCard: {
    marginBottom: "20px",
    padding: "25px",
    borderRadius: "25px",
    background:
      "linear-gradient(135deg, rgba(213,243,255,0.85), rgba(239,250,255,0.72))",
    border: "1px solid rgba(255,255,255,0.9)",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow:
      "0 15px 35px rgba(67, 146, 184, 0.10)",
  },

  motivationIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "25px",
    flexShrink: 0,
  },

  motivationTitle: {
    margin: 0,
    fontSize: "20px",
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    color: "#24516c",
  },

  motivationText: {
    margin: "6px 0 0",
    fontSize: "13px",
    lineHeight: 1.5,
    color: "#668496",
  },

  achievementGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
    marginTop: "20px",
  },

  achievement: {
    background: "rgba(245,252,255,0.72)",
    border: "1px solid rgba(255,255,255,0.9)",
    borderRadius: "18px",
    padding: "17px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    color: "#416176",
  },

  achievementIcon: {
    fontSize: "25px",
    marginBottom: "5px",
  },

  footerText: {
    textAlign: "center",
    color: "#7894a5",
    fontSize: "13px",
    marginTop: "28px",
  },
};

export default Progress;