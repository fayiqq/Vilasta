import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { useToast, errorMessage } from "../context/ToastContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = await login({ username, password });
      pushToast(data.message || "Welcome back!");
      const dest = location.state?.from?.pathname || "/";
      navigate(dest, { replace: true });
    } catch (err) {
      pushToast(errorMessage(err), "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page page-narrow page-auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="listing-form">
        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn-dark" disabled={submitting}>
          {submitting ? "Logging in…" : "Login"}
        </button>
      </form>
      <p className="muted">
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}