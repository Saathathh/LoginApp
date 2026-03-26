import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (example@domain.com).");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${apiBaseUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      navigate("/login");
    } catch {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-page signup-page">
      <div className="auth-card auth-card-dark">
        <div className="auth-brand">YourApp</div>
        <h1>Create Your Account</h1>
        <p className="auth-subtitle">Join us today! It's quick and easy.</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="input-shell">
            <input
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
            <span className="field-label">Full name</span>
          </label>

          <label className="input-shell">
            <input
              type="text"
              placeholder=" "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
            <span className="field-label">Email or phone</span>
          </label>

          <label className="input-shell has-toggle">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
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

          <label className="input-shell has-toggle">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder=" "
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
            />
            <span className="field-label">Confirm password</span>
            <button
              type="button"
              className="eye-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              )}
            </button>
          </label>

          {error && <p className="error-text">{error}</p>}

          <button className="primary-btn" type="submit">
            Sign Up
          </button>
        </form>

        <p className="divider-text">Or sign up with</p>
        <div className="social-row">
          <button
            type="button"
            className="social-btn"
            aria-label="Google"
            title="Google"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon google-icon">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.7 2.6 12 2.6 6.9 2.6 2.8 6.8 2.8 12s4.1 9.4 9.2 9.4c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1.1-.2-1.5H12z"
              />
              <path
                fill="#34A853"
                d="M2.8 12c0 1.7.4 3.2 1.2 4.6l3.2-2.5c-.2-.6-.3-1.3-.3-2.1s.1-1.4.3-2.1L4 7.4C3.2 8.8 2.8 10.3 2.8 12z"
              />
              <path
                fill="#FBBC05"
                d="M12 21.4c2.7 0 4.9-.9 6.6-2.4l-3.2-2.6c-.9.6-2.1 1-3.4 1-2.5 0-4.6-1.7-5.4-4l-3.3 2.5c1.6 3.2 4.9 5.5 8.7 5.5z"
              />
              <path
                fill="#4285F4"
                d="M18.6 19c1.9-1.8 3-4.3 3-7 0-.6-.1-1.1-.2-1.5H12v3.9h5.4c-.3 1.4-1.1 2.6-2.2 3.5l3.4 2.1z"
              />
            </svg>
          </button>
          <button
            type="button"
            className="social-btn"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon github-icon">
              <path
                fill="currentColor"
                d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.5 1.3-3.4-.1-.3-.6-1.6.1-3.3 0 0 1.1-.4 3.5 1.3 1-.3 2.1-.4 3.1-.4s2.1.1 3.1.4c2.4-1.7 3.5-1.3 3.5-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2 1.3 3.4 0 4.9-2.9 5.9-5.7 6.2.5.4.9 1.2.9 2.4v3.5c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7z"
              />
            </svg>
          </button>
        </div>

        <p className="auth-footer-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
