// components/SearchForm.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Quick search form shown on the Home page.
// Collects basic filter values, then navigates to /search with those filters
// encoded as URL query parameters so the Search page can read them.
// Uses: useState (form fields), useNavigate (routing)
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  // Each field is a piece of state — updated when user changes the select
  const [lookingFor, setLookingFor] = useState("female");
  const [ageMin,     setAgeMin]     = useState("22");
  const [ageMax,     setAgeMax]     = useState("30");
  const [religion,   setReligion]   = useState("All");

  const navigate = useNavigate();

  // When the form is submitted, build query string and navigate to /search
  const handleSearch = (e) => {
    e.preventDefault(); // prevent page reload (default form behaviour)
    const params = new URLSearchParams({
      gender: lookingFor,
      ageMin,
      ageMax,
      religion,
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="section-title text-2xl md:text-3xl mb-2">Find Your Match</h2>
          <p className="text-gray-500 text-sm">Search from thousands of verified profiles</p>
        </div>

        {/* Search card */}
        <div className="card p-6 md:p-8">
          <form onSubmit={handleSearch}>
            {/* Four filters in a flex row (wraps on small screens) */}
            <div className="flex flex-wrap gap-4 mb-6">

              {/* 1. Looking for */}
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  I'm looking for
                </label>
                <select
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  className="form-input"
                >
                  <option value="female">Bride (Woman)</option>
                  <option value="male">Groom (Man)</option>
                </select>
              </div>

              {/* 2. Age From */}
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Age From
                </label>
                <select
                  value={ageMin}
                  onChange={(e) => setAgeMin(e.target.value)}
                  className="form-input"
                >
                  {/* Generate age options 18-50 */}
                  {Array.from({ length: 33 }, (_, i) => i + 18).map((age) => (
                    <option key={age} value={age}>{age} yrs</option>
                  ))}
                </select>
              </div>

              {/* 3. Age To */}
              <div className="flex-1 min-w-[120px]">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Age To
                </label>
                <select
                  value={ageMax}
                  onChange={(e) => setAgeMax(e.target.value)}
                  className="form-input"
                >
                  {Array.from({ length: 33 }, (_, i) => i + 18).map((age) => (
                    <option key={age} value={age}>{age} yrs</option>
                  ))}
                </select>
              </div>

              {/* 4. Religion */}
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                  Religion
                </label>
                <select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="form-input"
                >
                  {["All", "Hindu", "Muslim", "Christian", "Sikh", "Jain"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit button — full width */}
            <button type="submit" className="btn-primary w-full py-3 text-base">
              Search Profiles
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
