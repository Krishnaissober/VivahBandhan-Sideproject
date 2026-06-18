// components/Navbar.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Responsive navigation bar.
// - Desktop: horizontal links + login/register buttons
// - Mobile:  hamburger icon opens a dropdown menu
// Uses: useState (mobile menu toggle), useAuth (show user info), Link from Router
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  // Controls whether the mobile menu is open or closed
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // to highlight the active link

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  // Helper: returns extra classes when the link is active
  const linkClass = (path) =>
    `text-sm font-medium transition-colors duration-150 ${
      location.pathname === path
        ? "text-brand-red"
        : "text-gray-700 hover:text-brand-red"
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main bar: logo + links + cta ─────────────────────────────── */}
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            {/* Simple SVG heart logo */}
            <svg className="w-7 h-7 text-brand-red" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
            </svg>
            <span className="font-display font-bold text-xl text-brand-charcoal">
              Vivah<span className="text-brand-red">Bandhan</span>
            </span>
          </Link>

          {/* ── Desktop nav links (hidden on mobile) ─────────────────── */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/"        className={linkClass("/")}>Home</Link>
            <Link to="/search"  className={linkClass("/search")}>Search</Link>
            <Link to="/matches" className={linkClass("/matches")}>Matches</Link>
          </div>

          {/* ── Desktop auth buttons ──────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              // Logged in: show user avatar + logout
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-brand-red"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="btn-outline text-sm px-4 py-2">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login"    className="btn-outline text-sm px-4 py-2">Login</Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2">Register Free</Link>
              </>
            )}
          </div>

          {/* ── Hamburger button (mobile only) ───────────────────────── */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {/* Show X when open, three lines when closed */}
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile dropdown menu ──────────────────────────────────────── */}
        {/* Conditionally rendered — only when menuOpen is true */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-4 px-2">
            <Link to="/"        className={linkClass("/")}        onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/search"  className={linkClass("/search")}  onClick={() => setMenuOpen(false)}>Search</Link>
            <Link to="/matches" className={linkClass("/matches")} onClick={() => setMenuOpen(false)}>Matches</Link>

            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              {user ? (
                <>
                  <Link to="/profile" className="text-sm font-medium text-gray-700" onClick={() => setMenuOpen(false)}>
                    My Profile ({user.name})
                  </Link>
                  <button onClick={handleLogout} className="btn-outline w-full">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login"    className="btn-outline w-full text-center" onClick={() => setMenuOpen(false)}>Login</Link>
                  <Link to="/register" className="btn-primary w-full text-center" onClick={() => setMenuOpen(false)}>Register Free</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
