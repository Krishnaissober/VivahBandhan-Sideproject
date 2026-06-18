// App.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Root component. Sets up:
//  1. AuthProvider — wraps everything so any component can call useAuth()
//  2. BrowserRouter — enables client-side routing
//  3. Routes — maps URL paths to page components
//  4. Navbar + Footer wrap around all page content
//
// HOW REACT ROUTER WORKS:
//   <Routes> looks at the current URL and renders the matching <Route>.
//   <Route path="/search" element={<Search />} /> means "when URL is /search, show Search".
//   The * path is a catch-all — shown when nothing else matches (404).
// ─────────────────────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home     from "./pages/Home";
import Login    from "./pages/Login";
import Register from "./pages/Register";
import Profile  from "./pages/Profile";
import Search   from "./pages/Search";
import Matches  from "./pages/Matches";

// ── 404 Not Found page ────────────────────────────────────────────────────────
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-ivory">
      <div className="text-center px-4">
        <div className="text-8xl font-display font-bold text-brand-red mb-2">404</div>
        <h2 className="font-display text-2xl font-semibold text-brand-charcoal mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-primary px-8 py-3">Go Home</a>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    // 1️⃣  AuthProvider makes auth state available everywhere
    <AuthProvider>
      {/* 2️⃣  BrowserRouter enables React Router */}
      <BrowserRouter>
        {/* Sticky navbar appears on every page */}
        <Navbar />

        {/* 3️⃣  Routes: only ONE route renders at a time */}
        <Routes>
          <Route path="/"           element={<Home />}     />
          <Route path="/login"      element={<Login />}    />
          <Route path="/register"   element={<Register />} />
          <Route path="/profile"    element={<Profile />}  />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search"     element={<Search />}   />
          <Route path="/matches"    element={<Matches />}  />
          <Route path="*"           element={<NotFound />} />
        </Routes>

        {/* Footer appears on every page */}
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
