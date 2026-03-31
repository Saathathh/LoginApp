import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm({ onSubmit, loading, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    if (!email.trim() || !password.trim()) {
      setLocalError("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    await onSubmit({ email: email.trim(), password });
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-card auth-card-dark">
        <div className="auth-brand">TaskPilot</div>
        <h1>Sign in</h1>
        <p className="auth-subtitle">Use your account to continue.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="input-shell">
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLocalError("");
              }}
            />
            <span className="field-label">Email</span>
          </label>

          <label className="input-shell has-toggle">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLocalError("");
              }}
            />
            <span className="field-label">Password</span>
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              )}
            </button>
          </label>

          {(localError || error) && <p className="error-text">{localError || error}</p>}

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="auth-footer-text">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
