import React, { useState } from "react";

function Register({ onRegister, onLogin, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    onRegister({
      name: name.trim(),
      email: email.trim(),
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.glowOne}></div>
      <div style={styles.glowTwo}></div>

      <div style={styles.card}>
        <button style={styles.backButton} onClick={onBack}>
          ← Back
        </button>

        <div style={styles.logo}>✦</div>

        <p style={styles.smallTitle}>START YOUR JOURNEY</p>

        <h1 style={styles.title}>Create Account</h1>

        <p style={styles.subtitle}>
          Set up your personal study space and start
          <br />
          achieving your goals.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Your Name</label>

          <div style={styles.inputWrapper}>
            <span style={styles.icon}>👤</span>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <label style={styles.label}>Email Address</label>

          <div style={styles.inputWrapper}>
            <span style={styles.icon}>✉</span>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <label style={styles.label}>Password</label>

          <div style={styles.inputWrapper}>
            <span style={styles.icon}>🔒</span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <label style={styles.label}>Confirm Password</label>

          <div style={styles.inputWrapper}>
            <span style={styles.icon}>🔐</span>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <label style={styles.terms}>
            <input type="checkbox" required />
            <span>
              I agree to the terms and conditions.
            </span>
          </label>

          <button type="submit" style={styles.registerButton}>
            Create My Account
            <span>→</span>
          </button>
        </form>

        <div style={styles.divider}>
          <span></span>
          <p>ALREADY HAVE AN ACCOUNT?</p>
          <span></span>
        </div>

        <button onClick={onLogin} style={styles.loginButton}>
          Log In Instead
        </button>

        <p style={styles.footer}>
          Smart Study Planner • Your success starts today ✨
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #eaf7ff 0%, #d9f0ff 45%, #f7fcff 100%)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
  },

  glowOne: {
    position: "absolute",
    width: "330px",
    height: "330px",
    borderRadius: "50%",
    background: "rgba(91, 184, 235, 0.23)",
    filter: "blur(75px)",
    top: "-110px",
    left: "-100px",
  },

  glowTwo: {
    position: "absolute",
    width: "330px",
    height: "330px",
    borderRadius: "50%",
    background: "rgba(164, 224, 255, 0.3)",
    filter: "blur(75px)",
    bottom: "-110px",
    right: "-100px",
  },

  card: {
    width: "100%",
    maxWidth: "480px",
    padding: "36px",
    borderRadius: "30px",
    background: "rgba(255, 255, 255, 0.58)",
    border: "1px solid rgba(255, 255, 255, 0.85)",
    boxShadow: "0 25px 70px rgba(70, 150, 200, 0.18)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    position: "relative",
    zIndex: 2,
    boxSizing: "border-box",
  },

  backButton: {
    border: "none",
    background: "transparent",
    color: "#568ba5",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0",
    marginBottom: "18px",
  },

  logo: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255, 255, 255, 0.75)",
    color: "#55a9d8",
    fontSize: "29px",
    marginBottom: "16px",
  },

  smallTitle: {
    color: "#5ca0c2",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "2px",
    margin: "0 0 6px",
  },

  title: {
    color: "#164b6b",
    fontSize: "36px",
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    fontWeight: "800",
    margin: "0 0 8px",
  },

  subtitle: {
    color: "#67899a",
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "22px",
  },

  label: {
    display: "block",
    color: "#3e697e",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "7px",
    marginTop: "13px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.72)",
    border: "1px solid rgba(91, 169, 210, 0.25)",
    padding: "0 13px",
    height: "49px",
    boxSizing: "border-box",
  },

  icon: {
    fontSize: "15px",
    marginRight: "10px",
  },

  input: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    color: "#31566a",
    minWidth: 0,
  },

  eyeButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "15px",
  },

  error: {
    color: "#d65c6c",
    fontSize: "13px",
    margin: "9px 0 0",
  },

  terms: {
    display: "flex",
    alignItems: "flex-start",
    gap: "7px",
    color: "#6b8998",
    fontSize: "12px",
    margin: "17px 0",
    lineHeight: "1.4",
  },

  registerButton: {
    width: "100%",
    border: "none",
    borderRadius: "15px",
    padding: "15px",
    background: "linear-gradient(135deg, #65b8e8, #439bd0)",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(67, 155, 208, 0.23)",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    margin: "22px 0 15px",
  },

  loginButton: {
    width: "100%",
    border: "1px solid rgba(91, 169, 210, 0.3)",
    borderRadius: "15px",
    padding: "13px",
    background: "rgba(255, 255, 255, 0.58)",
    color: "#3987b5",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
  },

  footer: {
    textAlign: "center",
    color: "#8aa5b2",
    fontSize: "11px",
    marginTop: "20px",
    marginBottom: "0",
  },
};

styles.divider = {
  display: "flex",
  alignItems: "center",
  gap: "9px",
  margin: "22px 0 15px",
  color: "#91aab6",
  fontSize: "9px",
  textAlign: "center",
};

styles.divider["span"] = {
  flex: 1,
  height: "1px",
  background: "rgba(100, 160, 185, 0.2)",
};

styles.divider["p"] = {
  margin: 0,
  whiteSpace: "nowrap",
};

export default Register;