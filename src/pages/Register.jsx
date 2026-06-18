// pages/Register.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Multi-field registration form with validation.
// Demonstrates: controlled inputs, derived error state, form submission,
// conditional rendering (step 1 personal → step 2 preferences).
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  // ── Form field state ────────────────────────────────────────────────────
  const [form, setForm] = useState({
    name:            "",
    email:           "",
    password:        "",
    confirmPassword: "",
    gender:          "female",
    dob:             "",
    phone:           "",
  });

  const [errors,  setErrors]  = useState({}); // { fieldName: "error message" }
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate     = useNavigate();

  // Generic input change handler — updates only the field that changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for this field as the user starts typing
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ── Validate all fields ──────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim())         newErrors.name   = "Full name is required.";
    if (!form.email.trim())        newErrors.email  = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (!form.phone.trim())        newErrors.phone  = "Phone number is required.";
    else if (form.phone.length < 10) newErrors.phone = "Enter a valid 10-digit number.";
    if (!form.dob)                 newErrors.dob    = "Date of birth is required.";
    if (!form.password)            newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    // If any errors, set them and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const result = register(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) {
      navigate("/"); // go to home after successful registration
    }
  };

  // Helper: show a red error message below a field
  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
    ) : null;

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">

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
          <h1 className="font-display text-2xl font-bold text-brand-charcoal mt-4">Create Your Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Free registration — find your perfect match today</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "border-red-400" : ""}`}
              />
              <ErrorMsg field="name" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? "border-red-400" : ""}`}
              />
              <ErrorMsg field="email" />
            </div>

            {/* Phone + Gender in a row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  className={`form-input ${errors.phone ? "border-red-400" : ""}`}
                  maxLength={10}
                />
                <ErrorMsg field="phone" />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a *</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="female">Bride (Woman)</option>
                  <option value="male">Groom (Man)</option>
                </select>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth *</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className={`form-input ${errors.dob ? "border-red-400" : ""}`}
                max={new Date(Date.now() - 18 * 365.25 * 24 * 3600 * 1000).toISOString().split("T")[0]}
              />
              <ErrorMsg field="dob" />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? "border-red-400" : ""}`}
              />
              <ErrorMsg field="password" />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat your password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`form-input ${errors.confirmPassword ? "border-red-400" : ""}`}
              />
              <ErrorMsg field="confirmPassword" />
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3">
              <input type="checkbox" id="terms" required className="mt-0.5 accent-brand-red" />
              <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed">
                I agree to the{" "}
                <a href="#" className="text-brand-red hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="#" className="text-brand-red hover:underline">Privacy Policy</a>.
                I confirm that I am 18+ years old.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register Free"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-red font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
