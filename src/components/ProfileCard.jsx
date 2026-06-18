// components/ProfileCard.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Reusable card component used on Home (Featured), Search, and Matches pages.
// Props:
//   profile  — the profile object (from data/profiles.js)
//   onConnect — optional callback when "Connect" is clicked
//
// Uses: useState (for "interested" toggle — heart button)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileCard({ profile, onConnect }) {
  // Local state: whether the user has "liked" this profile
  const [interested, setInterested] = useState(false);

  return (
    // card is a custom Tailwind component class defined in index.css
    // group class enables hover effects on child elements
    <div className="card group overflow-hidden flex flex-col">

      {/* ── Photo area ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Heart / Interest button — absolute positioned over photo */}
        <button
          onClick={() => setInterested((prev) => !prev)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
          title={interested ? "Remove Interest" : "Show Interest"}
        >
          <svg
            className={`w-5 h-5 transition-colors ${interested ? "text-brand-red" : "text-gray-300"}`}
            viewBox="0 0 24 24"
            fill={interested ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Badges row: Verified + Premium ─────────────────────────── */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {profile.verified && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Verified
            </span>
          )}
          {profile.premium && (
            <span className="bg-brand-gold text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              ★ Premium
            </span>
          )}
        </div>
      </div>

      {/* ── Profile info ────────────────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name + age */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-display font-semibold text-lg text-brand-charcoal">{profile.name}</h3>
          <span className="text-brand-red font-medium text-sm">{profile.age} yrs</span>
        </div>

        {/* Key details row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            📍 {profile.location}
          </span>
          <span className="flex items-center gap-1">
            🎓 {profile.education}
          </span>
          <span className="flex items-center gap-1">
            💼 {profile.occupation}
          </span>
          <span className="flex items-center gap-1">
            🙏 {profile.religion}
          </span>
        </div>

        {/* Bio — clamp to 2 lines */}
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
          {profile.bio}
        </p>

        {/* Interests tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {profile.interests.slice(0, 3).map((interest) => (
            <span
              key={interest}
              className="bg-brand-redSoft text-brand-red text-xs px-2.5 py-0.5 rounded-full font-medium"
            >
              {interest}
            </span>
          ))}
        </div>

        {/* Action buttons: Connect + View Profile */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onConnect && onConnect(profile)}
            className="btn-primary flex-1 text-xs py-2"
          >
            Connect
          </button>
          <Link
            to={`/profile/${profile.id}`}
            className="btn-outline flex-1 text-xs py-2 text-center"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
