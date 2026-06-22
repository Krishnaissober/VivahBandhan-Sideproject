import { useMemo, useState } from "react";
import { FiDownload, FiFilter, FiPlus, FiSearch, FiUsers } from "react-icons/fi";
import { useHiring } from "../App";
import ApplicantTable from "../components/ApplicantTable";

export default function Applicants() {
  const { applicants } = useHiring();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All statuses");
  const filtered = useMemo(() => applicants.filter((person) => `${person.name} ${person.role} ${person.email}`.toLowerCase().includes(search.toLowerCase()) && (status === "All statuses" || person.status === status)), [applicants, search, status]);
  return <div><div className="page-title-row"><div><p className="eyebrow">Talent pool</p><h1>Applicants</h1><p>Review, compare, and move candidates through your hiring flow.</p></div><div className="title-actions"><button className="button button-ghost"><FiDownload /> Export</button><button className="button button-primary small"><FiPlus /> Add candidate</button></div></div><div className="applicants-toolbar"><div className="search-box"><FiSearch /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applicants…" /></div><button className="filter-label"><FiFilter /> Filter</button><select value={status} onChange={(e) => setStatus(e.target.value)}>{["All statuses", "Applied", "Under Review", "Interview Scheduled", "Interview Completed", "Shortlisted", "Rejected"].map((s) => <option key={s}>{s}</option>)}</select><span className="result-count"><FiUsers /> {filtered.length} candidates</span></div><section className="dashboard-card table-card">{filtered.length ? <ApplicantTable applicants={filtered} /> : <div className="empty-state compact"><FiSearch /><h3>No candidates found</h3><p>Try a different name or status.</p></div>}<div className="table-footer"><span>Showing {filtered.length} of {applicants.length} applicants</span><div><button disabled>Previous</button><button className="active">1</button><button>Next</button></div></div></section></div>;
}
