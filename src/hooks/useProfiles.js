// ─────────────────────────────────────────────────────────────────────────────
// hooks/useProfiles.js
//
// WHAT IS A CUSTOM HOOK?
//   A custom hook is just a JavaScript function whose name starts with "use".
//   It can use React's built-in hooks (useState, useEffect, useMemo) inside it.
//   We extract this logic into a hook so that multiple pages (Search, Matches)
//   can reuse the same profile filtering logic without copy-pasting code.
//
// This hook:
//   - Loads all profiles (simulates an API call with a delay)
//   - Stores filter state
//   - Returns filtered profiles using useMemo (computed value, re-runs only
//     when profiles or filters change — avoids unnecessary work)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from "react";
import { profiles as allProfiles } from "../data/profiles";

// ─────────────────────────────────────────────────────────────────────────────
// Default filter state — exported so Search.jsx can reset to it
// ─────────────────────────────────────────────────────────────────────────────
export const defaultFilters = {
  gender:     "female",   // show opposite gender by default
  ageMin:     18,
  ageMax:     45,
  religion:   "All",
  location:   "All",
  education:  "All",
  occupation: "All",
};

// ─────────────────────────────────────────────────────────────────────────────
// The custom hook
// ─────────────────────────────────────────────────────────────────────────────
export function useProfiles(initialFilters = defaultFilters) {
  // State: all raw profiles (would come from API in a real app)
  const [profiles, setProfiles]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filters, setFilters]       = useState(initialFilters);

  // ── useEffect: simulate fetching data from a server ──────────────────────
  // The empty dependency array [] means this runs only ONCE after first render.
  useEffect(() => {
    setLoading(true);

    // Simulate network delay with setTimeout
    const timer = setTimeout(() => {
      setProfiles(allProfiles);
      setLoading(false);
    }, 800); // 800ms fake loading delay

    // Cleanup function: cancel the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, []);

  // ── useMemo: compute filtered profiles only when profiles or filters change ─
  // Without useMemo, filtering would re-run on EVERY render even if nothing changed.
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // Filter 1: gender
      if (filters.gender && filters.gender !== "all" && p.gender !== filters.gender) return false;

      // Filter 2: age range
      if (p.age < filters.ageMin || p.age > filters.ageMax) return false;

      // Filter 3: religion
      if (filters.religion !== "All" && p.religion !== filters.religion) return false;

      // Filter 4: location
      if (filters.location !== "All" && p.location !== filters.location) return false;

      // Filter 5: education
      if (filters.education !== "All" && p.education !== filters.education) return false;

      // Filter 6: occupation
      if (filters.occupation !== "All" && p.occupation !== filters.occupation) return false;

      return true; // profile passes all filters
    });
  }, [profiles, filters]); // ← re-compute only when these change

  // ── Helper to update a single filter key ─────────────────────────────────
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ── Reset all filters to defaults ────────────────────────────────────────
  const resetFilters = () => setFilters(initialFilters);

  // Return everything the component needs
  return {
    profiles: filteredProfiles, // filtered list
    allProfiles: profiles,       // unfiltered list (useful for counts)
    loading,
    filters,
    updateFilter,
    resetFilters,
    setFilters,
  };
}
