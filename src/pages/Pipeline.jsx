import { useState } from "react";
import { FiArrowRight, FiCalendar, FiMoreHorizontal, FiTrello } from "react-icons/fi";
import { useHiring } from "../App";
import CandidateScore from "../components/CandidateScore";

const stages = ["Applied", "Under Review", "Interview Scheduled", "Interview Completed", "Shortlisted", "Offer Sent", "Hired"];
export default function Pipeline() {
  const { applicants, updateApplicant } = useHiring();
  const [dragging, setDragging] = useState(null);
  return <div><div className="page-title-row"><div><p className="eyebrow">Recruitment workflow</p><h1>Hiring pipeline</h1><p>Drag candidates between stages to keep every role moving.</p></div><div className="pipeline-legend"><span><i /> Active roles</span><strong>6</strong></div></div><div className="pipeline-board">{stages.map((stage) => { const candidates = applicants.filter((a) => a.status === stage); return <section className="pipeline-column" key={stage} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (dragging) updateApplicant(dragging, { status: stage }); setDragging(null); }}><div className="pipeline-header"><span><i className={stage.toLowerCase().replaceAll(" ", "-")} />{stage}</span><b>{candidates.length}</b></div><div className="pipeline-cards">{candidates.map((person) => <article draggable onDragStart={() => setDragging(person.id)} onDragEnd={() => setDragging(null)} className={`pipeline-card ${dragging === person.id ? "dragging" : ""}`} key={person.id}><div><span className="avatar">{person.avatar}</span><button><FiMoreHorizontal /></button></div><h3>{person.name}</h3><p>{person.role}</p><div className="pipeline-card-meta"><CandidateScore score={person.score} /><span><FiCalendar /> {person.applied.split(",")[0]}</span></div></article>)}{candidates.length === 0 && <div className="pipeline-empty"><FiTrello /><span>Drop candidate here</span></div>}</div></section>})}</div><div className="pipeline-tip"><FiArrowRight /><p><strong>Tip:</strong> Drag any candidate card into a new column. Status updates instantly across the dashboard.</p></div></div>;
}
