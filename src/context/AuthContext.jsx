// ─────────────────────────────────────────────────────────────────────────────
// context/AuthContext.jsx
//
// WHAT IS CONTEXT?
//   React Context lets you share state across many components without "prop
//   drilling" (passing props through every level of the tree).
//   Think of it like a global announcement board that any component can read.
//
// HOW IT WORKS HERE:
//   1. We create a Context object (AuthContext).
//   2. AuthProvider wraps the whole app and holds the auth state.
//   3. Any component calls useAuth() to read or update that state.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from "react";

// 1️⃣  Create the context (starts as null — no value yet)
const AuthContext = createContext(null);

// ─────────────────────────────────────────────────────────────────────────────
// AuthProvider — wraps the whole app in App.jsx
// ─────────────────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  // useState: stores the logged-in user object (or null if not logged in)
  const [user, setUser] = useState(null);

  // useState: tracks whether we've finished checking localStorage
  const [loading, setLoading] = useState(true);

  // useEffect runs ONCE when the component mounts.
  // We check localStorage to restore the session if the user refreshes the page.
  useEffect(() => {
    const saved = localStorage.getItem("vivah_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false); // done checking
  }, []); // ← empty array means "run only once"

  // ── login() ───────────────────────────────────────────────────────────────
  // Simulates an API call. In a real app you would POST to your backend.
  // Returns { success, message } so the calling component can show feedback.
  const login = (email, password) => {
    // Basic demo validation (any email/password combo works)
    if (!email || !password) {
      return { success: false, message: "Please fill in all fields." };
    }

    const userData = {
      id: Date.now(),
      name: email.split("@")[0], // use part before @ as display name
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
    };

    setUser(userData);
    localStorage.setItem("vivah_user", JSON.stringify(userData));
    return { success: true, message: "Logged in successfully!" };
  };

  // ── register() ────────────────────────────────────────────────────────────
  const register = (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, message: "Please fill in all fields." };
    }
    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters." };
    }

    const userData = {
      id: Date.now(),
      name,
      email,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
    };

    setUser(userData);
    localStorage.setItem("vivah_user", JSON.stringify(userData));
    return { success: true, message: "Account created successfully!" };
  };

  // ── logout() ──────────────────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    localStorage.removeItem("vivah_user");
  };

  // 2️⃣  Everything we want to share is packed into this "value" object
  const value = { user, loading, login, register, logout };

  // 3️⃣  Wrap children with the Provider so they can all access "value"
  return (
    <AuthContext.Provider value={value}>
      {/* Don't render children until we've checked localStorage */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom hook — any component calls useAuth() instead of useContext(AuthContext)
// This is a best practice: cleaner syntax + error if used outside provider.
// ─────────────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
