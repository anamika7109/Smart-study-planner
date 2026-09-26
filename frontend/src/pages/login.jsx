import React, { useState } from "react";

function Login({ onLogin, onRegister, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    onLogin({
      name: email.split("@")[0],
      email: email,
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

        <p style={styles.smallTitle}>WELCOME BACK</p>

        <h1 style={styles.title}>Log In</h1>

        <p style={styles.subtitle}>
          Continue your journey toward smarter studying.
        </p>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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

          {error && <p style={styles.error}>{error}</p>}

          <div style={styles.options}>
            <label style={styles.remember}>
              <input type="checkbox" />
              Remember me
            </label>

            <button
              type="button"
              style={styles.forgot}
              onClick={() => alert("Password recovery will be added soon.")}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" style={styles.loginButton}>
            Log In
            <span>→</span>
          </button>
        </form>

        <div style={styles.divider}>
          <span></span>
          <p>OR</p>
          <span></span>
        </div>

        <p style={styles.registerText}>
          Don't have an account?
        </p>

        <button onClick={onRegister} style={styles.registerButton}>
          Create an Account
        </button>

        <p style={styles.footer}>
          Smart Study Planner • Study smarter ✨
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
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(91, 184, 235, 0.23)",
    filter: "blur(75px)",
    top: "-100px",
    left: "-100px",
  },

  glowTwo: {
    position: "absolute",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "rgba(164, 224, 255, 0.3)",
    filter: "blur(75px)",
    bottom: "-100px",
    right: "-100px",
  },

  card: {
    width: "100%",
    maxWidth: "460px",
    padding: "38px",
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
    marginBottom: "20px",
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
    marginBottom: "18px",
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
    fontSize: "38px",
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    fontWeight: "800",
    margin: "0 0 8px",
  },

  subtitle: {
    color: "#67899a",
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "28px",
  },

  label: {
    display: "block",
    color: "#3e697e",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "8px",
    marginTop: "16px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.72)",
    border: "1px solid rgba(91, 169, 210, 0.25)",
    padding: "0 13px",
    height: "52px",
    boxSizing: "border-box",
  },

  icon: {
    fontSize: "16px",
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
    margin: "10px 0 0",
  },

  options: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 0 22px",
    gap: "10px",
  },

  remember: {
    color: "#648393",
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  forgot: {
    border: "none",
    background: "transparent",
    color: "#4295c3",
    fontSize: "12px",
    cursor: "pointer",
  },

  loginButton: {
    width: "100%",
    border: "none",
    borderRadius: "15px",
    padding: "16px",
    background: "linear-gradient(135deg, #65b8e8, #439bd0)",
    color: "white",
    fontSize: "16px",
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
    gap: "10px",
    margin: "25px 0 18px",
  },

  registerText: {
    textAlign: "center",
    color: "#67899a",
    fontSize: "13px",
    margin: "0 0 12px",
  },

  registerButton: {
    width: "100%",
    border: "1px solid rgba(91, 169, 210, 0.3)",
    borderRadius: "15px",
    padding: "14px",
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
    marginTop: "22px",
    marginBottom: "0",
  },
};

styles.divider = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  margin: "25px 0 18px",
  color: "#91aab6",
  fontSize: "10px",
};

styles.divider["span"] = {
  flex: 1,
  height: "1px",
  background: "rgba(100, 160, 185, 0.2)",
};

export default Login;