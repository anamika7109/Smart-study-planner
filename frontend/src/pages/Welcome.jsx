import React from "react";

function Welcome({ onLogin, onRegister }) {
  return (
    <div style={styles.page}>
      <div style={styles.glowOne}></div>
      <div style={styles.glowTwo}></div>

      <div style={styles.card}>
        <div style={styles.logo}>✦</div>

        <p style={styles.smallText}>WELCOME TO</p>

        <h1 style={styles.title}>
          Smart Study
          <br />
          Planner
        </h1>

        <p style={styles.description}>
          Plan smarter. Study better. Achieve more.
          <br />
          Your personal space for organized and
          <br />
          stress-free studying.
        </p>

        <div style={styles.features}>
          <div style={styles.feature}>
            <span>📚</span>
            <span>Organize Subjects</span>
          </div>

          <div style={styles.feature}>
            <span>✓</span>
            <span>Manage Tasks</span>
          </div>

          <div style={styles.feature}>
            <span>📈</span>
            <span>Track Progress</span>
          </div>
        </div>

        <button style={styles.primaryButton} onClick={onLogin}>
          Get Started
          <span>→</span>
        </button>

        <button style={styles.secondaryButton} onClick={onRegister}>
          Create New Account
        </button>

        <p style={styles.footer}>
          Your journey to better studying starts here ✨
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #eaf7ff 0%, #d9f0ff 45%, #f7fcff 100%)",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "20px",
    boxSizing: "border-box",
  },

  glowOne: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(102, 190, 255, 0.25)",
    filter: "blur(70px)",
    top: "-100px",
    left: "-100px",
  },

  glowTwo: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "rgba(160, 220, 255, 0.3)",
    filter: "blur(70px)",
    bottom: "-100px",
    right: "-80px",
  },

  card: {
    width: "100%",
    maxWidth: "600px",
    padding: "50px 40px",
    borderRadius: "32px",
    background: "rgba(255, 255, 255, 0.55)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow: "0 25px 70px rgba(70, 150, 200, 0.18)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
  },

  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "22px",
    margin: "0 auto 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.8)",
    color: "#4da9dc",
    fontSize: "35px",
    boxShadow: "0 10px 30px rgba(77, 169, 220, 0.18)",
  },

  smallText: {
    color: "#5a9fc4",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "3px",
    marginBottom: "8px",
  },

  title: {
    color: "#164b6b",
    fontSize: "46px",
    lineHeight: "1.05",
    fontStyle: "italic",
    fontWeight: "800",
    fontFamily: "Georgia, serif",
    margin: "0 0 20px",
  },

  description: {
    color: "#52778c",
    fontSize: "16px",
    lineHeight: "1.7",
    marginBottom: "30px",
  },

  features: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "30px",
  },

  feature: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "10px 14px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.65)",
    color: "#47748b",
    fontSize: "13px",
    fontWeight: "600",
  },

  primaryButton: {
    width: "100%",
    border: "none",
    borderRadius: "16px",
    padding: "16px",
    background: "linear-gradient(135deg, #65b8e8, #439bd0)",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(67, 155, 208, 0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },

  secondaryButton: {
    width: "100%",
    border: "1px solid rgba(91, 169, 210, 0.35)",
    borderRadius: "16px",
    padding: "15px",
    background: "rgba(255, 255, 255, 0.55)",
    color: "#3987b5",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  footer: {
    marginTop: "25px",
    marginBottom: "0",
    color: "#7c9cac",
    fontSize: "12px",
  },
};

export default Welcome;