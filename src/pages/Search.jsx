// pages/Search.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Full-featured search page with sidebar filters and profile grid.
// Reads initial filters from URL query params (set by SearchForm on Home page).
// Uses the useProfiles custom hook for all data + filtering logic.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProfiles, defaultFilters } from "../hooks/useProfiles";
import { filterOptions }               from "../data/profiles";
import ProfileCard    from "../components/ProfileCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Search() {
  // useSearchParams reads URL query string e.g. ?gender=female&ageMin=22
  const [searchParams] = useSearchParams();

  // Sidebar open/closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Build initial filters from URL params (fallback to defaultFilters values)
  const initialFromUrl = {
    ...defaultFilters,
    gender:   searchParams.get("gender")   || defaultFilters.gender,
    ageMin:   Number(searchParams.get("ageMin"))   || defaultFilters.ageMin,
    ageMax:   Number(searchParams.get("ageMax"))   || defaultFilters.ageMax,
    religion: searchParams.get("religion") || defaultFilters.religion,
  };

  // useProfiles custom hook — manages all profile data and filtering
  const { profiles, allProfiles, loading, filters, updateFilter, resetFilters } =
    useProfiles(initialFromUrl);

  // Update page title
  useEffect(() => {
    document.title = `Search Profiles (${profiles.length} found) — VivahBandhan`;
    return () => { document.title = "Vivah Bandhan"; };
  }, [profiles.length]);

  const handleConnect = (profile) => {
    alert(`Interest sent to ${profile.name}!`);
  };

  // ── Filter sidebar content (reused on mobile drawer and desktop) ─────────
  const FilterPanel = () => (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-brand-charcoal">Filter Profiles</h3>
        <button
          onClick={resetFilters}
          className="text-xs text-brand-red hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Looking for */}
      <FilterGroup label="Looking For">
        <select
          value={filters.gender}
          onChange={(e) => updateFilter("gender", e.target.value)}
          className="form-input"
        >
          <option value="female">Bride (Women)</option>
          <option value="male">Groom (Men)</option>
          <option value="all">All</option>
        </select>
      </FilterGroup>

      {/* Age range */}
      <FilterGroup label={`Age: ${filters.ageMin} – ${filters.ageMax} yrs`}>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={18} max={50}
            value={filters.ageMin}
            onChange={(e) => updateFilter("ageMin", Number(e.target.value))}
            className="flex-1 accent-brand-red"
          />
          <input
            type="range"
            min={18} max={50}
            value={filters.ageMax}
            onChange={(e) => updateFilter("ageMax", Number(e.target.value))}
            className="flex-1 accent-brand-red"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>From {filters.ageMin}</span>
          <span>To {filters.ageMax}</span>
        </div>
      </FilterGroup>

      {/* Religion */}
      <FilterGroup label="Religion">
        <select
          value={filters.religion}
          onChange={(e) => updateFilter("religion", e.target.value)}
          className="form-input"
        >
          {filterOptions.religions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </FilterGroup>

      {/* Location */}
      <FilterGroup label="Location">
        <select
          value={filters.location}
          onChange={(e) => updateFilter("location", e.target.value)}
          className="form-input"
        >
          {filterOptions.locations.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </FilterGroup>

      {/* Education */}
      <FilterGroup label="Education">
        <select
          value={filters.education}
          onChange={(e) => updateFilter("education", e.target.value)}
          className="form-input"
        >
          {filterOptions.educations.map((ed) => (
            <option key={ed} value={ed}>{ed}</option>
          ))}
        </select>
      </FilterGroup>

      {/* Occupation */}
      <FilterGroup label="Occupation">
        <select
          value={filters.occupation}
          onChange={(e) => updateFilter("occupation", e.target.value)}
          className="form-input"
        >
          {filterOptions.occupations.map((oc) => (
            <option key={oc} value={oc}>{oc}</option>
          ))}
        </select>
      </FilterGroup>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-ivory">
      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-charcoal">Search Profiles</h1>
            <p className="text-gray-500 text-sm mt-0.5">
              {loading ? "Loading..." : `${profiles.length} profiles found out of ${allProfiles.length}`}
            </p>
          </div>
          {/* Mobile: filter toggle button */}
          <button
            className="md:hidden btn-outline text-sm px-4 py-2 flex items-center gap-2"
            onClick={() => setSidebarOpen(true)}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── Layout: sidebar + main grid ──────────────────────────────── */}
        <div className="flex gap-8">

          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-{50%} shrink-0">
            <div className="card p-5 sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Profile Grid */}
          <main className="flex-1">
            {loading ? (
              <LoadingSpinner text="Searching profiles..." />
            ) : profiles.length === 0 ? (
              // Empty state
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-display text-xl font-semibold text-gray-600 mb-2">No profiles found</h3>
                <p className="text-gray-400 text-sm mb-5">Try adjusting your filters to see more results.</p>
                <button onClick={resetFilters} className="btn-primary px-6 py-2">
                  Reset Filters
                </button>
              </div>
            ) : (
              // Results grid — flex wrapping
              <div className="flex flex-wrap gap-6">
                {profiles.map((profile) => (
                  <div key={profile.id} className="w-full sm:w-[calc(50%-12px)] xl:w-[calc(33.33%-16px)]">
                    <ProfileCard profile={profile} onConnect={handleConnect} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Mobile filter drawer overlay ─────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Dark backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer panel */}
          <div className="relative ml-auto w-80 max-w-full bg-white h-full overflow-y-auto p-6 shadow-xl">
            <button
              className="absolute top-4 right-4 p-1 rounded hover:bg-gray-100"
              onClick={() => setSidebarOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <FilterPanel />
            <button
              className="btn-primary w-full mt-6"
              onClick={() => setSidebarOpen(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Small reusable wrapper for filter sections ────────────────────────────────
function FilterGroup({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
