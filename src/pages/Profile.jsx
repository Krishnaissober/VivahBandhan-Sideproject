// pages/Profile.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Displays a single matrimonial profile in detail.
// Route: /profile/:id  (when id is passed)  OR  /profile  (logged-in user's own)
// Uses: useParams (get id from URL), useState (for interest/saved state)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth }    from "../context/AuthContext";
import { profiles }   from "../data/profiles";

export default function Profile() {
  const { id }     = useParams(); // get :id from URL (undefined on /profile)
  const { user }   = useAuth();

  // State: user actions
  const [interested, setInterested] = useState(false);
  const [saved,      setSaved]      = useState(false);

  // Determine which profile to show
  // If :id is in the URL → show that profile.  Otherwise → show first profile (demo).
  const profile = id
    ? profiles.find((p) => p.id === Number(id))
    : profiles[0]; // fallback for /profile route

  // 404-style message if profile not found
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="font-display text-2xl font-bold mb-2">Profile not found</h2>
          <Link to="/search" className="btn-primary px-6 py-2">Back to Search</Link>
        </div>
      </div>
    );
  }

  // ── Info row helper ────────────────────────────────────────────────────────
  const InfoRow = ({ label, value }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-32 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-brand-charcoal font-medium">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-ivory py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Breadcrumb ──────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6">
          <Link to="/" className="hover:text-brand-red">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-brand-red">Search</Link>
          <span>/</span>
          <span className="text-brand-charcoal">{profile.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Left column: photo + action buttons ──────────────────── */}
          <div className="flex flex-col gap-4 lg:w-72 shrink-0">
            {/* Photo card */}
            <div className="card overflow-hidden">
              <div className="relative">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-80 object-cover"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {profile.verified && (
                    <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                  {profile.premium && (
                    <span className="bg-brand-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      ★ Premium
                    </span>
                  )}
                </div>
              </div>

              {/* Name / age below photo */}
              <div className="p-4 text-center">
                <h1 className="font-display text-xl font-bold text-brand-charcoal">{profile.name}</h1>
                <p className="text-brand-red text-sm font-medium mt-0.5">
                  {profile.age} years • {profile.location}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setInterested((v) => !v)}
                className={interested ? "btn-primary" : "btn-outline"}
              >
                {interested ? "💌 Interest Sent!" : "💌 Send Interest"}
              </button>
              <button
                onClick={() => setSaved((v) => !v)}
                className={`flex items-center justify-center gap-2 py-2.5 px-6 rounded-full border-2 font-semibold text-sm transition-all
                  ${saved ? "border-brand-gold text-brand-gold" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}
              >
                {saved ? "★ Saved" : "☆ Save Profile"}
              </button>
            </div>

            {/* Profile completeness */}
            <div className="card p-4">
              <p className="text-xs font-semibold text-gray-600 mb-2">Profile Completeness</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <div className="bg-brand-red h-2 rounded-full" style={{ width: "85%" }} />
              </div>
              <p className="text-xs text-gray-400">85% Complete</p>
            </div>
          </div>

          {/* ── Right column: details ─────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-5">

            {/* About */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-brand-charcoal mb-3">About</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>

              {/* Interests */}
              <div className="flex flex-wrap gap-2 mt-4">
                {profile.interests.map((i) => (
                  <span key={i} className="bg-brand-redSoft text-brand-red text-xs px-3 py-1 rounded-full font-medium">
                    {i}
                  </span>
                ))}
              </div>
            </div>

            {/* Personal Details */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-brand-charcoal mb-4">Personal Details</h2>
              <InfoRow label="Age"            value={`${profile.age} years`} />
              <InfoRow label="Height"         value={profile.height} />
              <InfoRow label="Religion"       value={profile.religion} />
              <InfoRow label="Caste"          value={profile.caste} />
              <InfoRow label="Marital Status" value={profile.maritalStatus} />
              <InfoRow label="Location"       value={profile.location} />
            </div>

            {/* Professional Details */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-brand-charcoal mb-4">Professional Details</h2>
              <InfoRow label="Education"  value={profile.education} />
              <InfoRow label="Occupation" value={profile.occupation} />
              <InfoRow label="Company"    value={profile.company} />
              <InfoRow label="Income"     value={profile.income} />
            </div>

            {/* Similar profiles */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-brand-charcoal mb-4">Similar Profiles</h2>
              <div className="flex flex-wrap gap-3">
                {profiles
                  .filter((p) => p.id !== profile.id && p.religion === profile.religion)
                  .slice(0, 3)
                  .map((p) => (
                    <Link
                      key={p.id}
                      to={`/profile/${p.id}`}
                      className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:border-brand-red hover:bg-brand-redSoft transition flex-1 min-w-[180px]"
                    >
                      <img src={p.photo} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-brand-charcoal">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.age} yrs • {p.location}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
