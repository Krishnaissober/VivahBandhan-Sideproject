// pages/Matches.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Matches page — shows profiles that are compatible with the logged-in user.
// If not logged in, shows a "login to view matches" prompt.
// Demonstrates: useAuth, useProfiles, conditional rendering
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth }     from "../context/AuthContext";
import { useProfiles } from "../hooks/useProfiles";
import ProfileCard     from "../components/ProfileCard";
import LoadingSpinner  from "../components/LoadingSpinner";

// Match quality categories
const TABS = ["All Matches", "Premium Matches", "Recently Joined", "Near Me"];

export default function Matches() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("All Matches");

  // useProfiles with default filters (shows all profiles for demo)
  const { profiles, loading } = useProfiles({
    gender:     "female",  // In a real app this would be opposite of user's gender
    ageMin:     21,
    ageMax:     40,
    religion:   "All",
    location:   "All",
    education:  "All",
    occupation: "All",
  });

  // ── If user is not logged in, show CTA ───────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen bg-brand-ivory flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">💑</div>
          <h1 className="font-display text-3xl font-bold text-brand-charcoal mb-3">
            View Your Matches
          </h1>
          <p className="text-gray-500 mb-8">
            Log in to see profiles matched specifically for you based on your preferences, location, and religion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login"    className="btn-primary px-8 py-3">Sign In</Link>
            <Link to="/register" className="btn-outline px-8 py-3">Register Free</Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Filter profiles per tab ─────────────────────────────────────────────
  const displayProfiles = (() => {
    switch (activeTab) {
      case "Premium Matches":   return profiles.filter((p) => p.premium);
      case "Recently Joined":   return [...profiles].reverse().slice(0, 6);
      case "Near Me":           return profiles.filter((p) => p.location === "Delhi" || p.location === "Mumbai");
      default:                  return profiles;
    }
  })();

  const handleConnect = (profile) => {
    alert(`Interest sent to ${profile.name}! 🎉`);
  };

  return (
    <div className="min-h-screen bg-brand-ivory">

      {/* ── Hero banner ─────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-brand-red to-brand-redDark text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">
              Matches for {user.name} 👋
            </h1>
            <p className="text-red-100 text-sm">
              Based on your preferences — {profiles.length} compatible profiles found
            </p>
          </div>
          {/* Match score badge */}
          <div className="bg-white bg-opacity-20 backdrop-blur px-5 py-3 rounded-xl text-center">
            <p className="text-2xl font-bold">{profiles.length}</p>
            <p className="text-xs text-red-100">Compatible Matches</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Tab bar ───────────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-8 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-max px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                ${activeTab === tab
                  ? "bg-brand-red text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Profiles grid ─────────────────────────────────────────────── */}
        {loading ? (
          <LoadingSpinner text="Finding your matches..." />
        ) : displayProfiles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🤷</div>
            <p className="text-gray-500">No profiles in this category right now.</p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <p className="text-sm text-gray-500 mb-5">
              Showing {displayProfiles.length} {activeTab.toLowerCase()}
            </p>

            {/* Flex wrapping grid */}
            <div className="flex flex-wrap gap-6">
              {displayProfiles.map((profile) => (
                <div key={profile.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]">
                  <ProfileCard profile={profile} onConnect={handleConnect} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Upgrade banner ────────────────────────────────────────────── */}
        <div className="mt-12 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-2xl p-6 text-white text-center">
          <h3 className="font-display text-xl font-bold mb-2">Upgrade to Premium</h3>
          <p className="text-yellow-100 text-sm mb-4">
            Get unlimited profile views, direct messaging, and priority placement.
          </p>
          <button className="bg-white text-brand-gold font-bold px-6 py-2 rounded-full hover:bg-yellow-50 transition">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
