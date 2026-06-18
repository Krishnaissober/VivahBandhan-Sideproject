// pages/Login.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Login form page.
// Uses: useState (form fields + error), useAuth (login function), useNavigate
//
// FORM VALIDATION PATTERN:
//   1. Store field values in state
//   2. On submit, validate — if error set error state and return early
//   3. If valid, call login(), get back {success, message}
//   4. If success, navigate to home; else show the message as error
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // Controlled input state
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");          // error message to show
  const [loading,  setLoading]  = useState(false);      // disable button while processing

  const { login }    = useAuth();
  const navigate     = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();   // stop page reload
    setError("");          // clear previous errors

    // Basic client-side validation before calling login()
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!password)     { setError("Please enter your password."); return; }

    setLoading(true);
    const result = login(email.trim(), password);
    setLoading(false);

    if (result.success) {
      navigate("/"); // redirect to home on success
    } else {
      setError(result.message);
    }
  };

  return (
    // Full-height page with centred card
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <svg className="w-8 h-8 text-brand-red" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
            </svg>
            <span className="font-display font-bold text-2xl text-brand-charcoal">
              Vivah<span className="text-brand-red">Bandhan</span>
            </span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-brand-charcoal mt-4">Welcome back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to continue your search</p>
        </div>

        {/* Form card */}
        <div className="card p-8">

          {/* Error message box */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                autoComplete="email"
              />
            </div>

            {/* Password field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-xs text-brand-red hover:underline">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                autoComplete="current-password"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand-red font-medium hover:underline">
              Register free
            </Link>
          </p>
        </div>

        {/* Demo hint */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Demo: use any email + any password (min 1 char) to log in
        </p>
      </div>
    </div>
  );
}
