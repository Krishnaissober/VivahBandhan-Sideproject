import { useMemo, useState } from "react";
import { FiBriefcase, FiSearch, FiSliders } from "react-icons/fi";
import JobCard from "../components/JobCard";
import { jobs } from "../data/hiringData";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ department: "All departments", experience: "All experience", location: "All locations", type: "All types" });
  const update = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const filtered = useMemo(() => jobs.filter((job) => {
    const matchesSearch = `${job.title} ${job.department} ${job.skills.join(" ")}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (filters.department.startsWith("All") || job.department === filters.department) && (filters.location.startsWith("All") || job.location === filters.location) && (filters.type.startsWith("All") || job.type === filters.type) && (filters.experience.startsWith("All") || job.experience.startsWith(filters.experience[0]));
  }), [search, filters]);
  return <main className="jobs-page"><section className="page-hero"><div className="container"><p className="eyebrow">Open positions</p><h1>Make your next move<br /><em>mean something.</em></h1><p>Explore roles where your craft, curiosity, and ambition can make a genuine difference.</p></div></section><section className="container jobs-content"><div className="filter-bar"><div className="job-search"><FiSearch /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by role, team, or skill" /></div><div className="filter-title"><FiSliders /> Filters</div>{[
    ["department", ["All departments", ...new Set(jobs.map(j => j.department))]], ["experience", ["All experience", "1–3 years", "2–4 years", "3–5 years", "4–7 years", "5–8 years"]], ["location", ["All locations", ...new Set(jobs.map(j => j.location))]], ["type", ["All types", ...new Set(jobs.map(j => j.type))]]
  ].map(([key, options]) => <select key={key} value={filters[key]} onChange={(e) => update(key, e.target.value)} aria-label={key}>{options.map((item) => <option key={item}>{item}</option>)}</select>)}</div><div className="jobs-results-title"><div><h2>{filtered.length} open {filtered.length === 1 ? "role" : "roles"}</h2><p>We’d love to meet the person behind the résumé.</p></div><span><FiBriefcase /> Hiring across India & remote</span></div>{filtered.length ? <div className="jobs-grid all-jobs">{filtered.map((job) => <JobCard job={job} key={job.id} />)}</div> : <div className="empty-state"><FiSearch /><h3>No roles match those filters</h3><p>Try widening your search—we’re adding new opportunities often.</p><button className="button button-outline" onClick={() => { setSearch(""); setFilters({ department: "All departments", experience: "All experience", location: "All locations", type: "All types" }); }}>Clear filters</button></div>}</section></main>;
}
