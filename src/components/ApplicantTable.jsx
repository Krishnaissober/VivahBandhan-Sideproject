import { useState } from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiEdit2, FiEye, FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import CandidateScore from "./CandidateScore";
import { useHiring } from "../App";

export const statusClass = (status) => status.toLowerCase().replaceAll(" ", "-");

export default function ApplicantTable({ applicants }) {
  const [menu, setMenu] = useState(null);
  const { deleteApplicant, updateApplicant } = useHiring();
  return (
    <div className="table-scroll"><table className="applicant-table"><thead><tr><th>Candidate</th><th>Position</th><th>Experience</th><th>Salary range</th><th>Score</th><th>Status</th><th></th></tr></thead>
      <tbody>{applicants.map((person) => <tr key={person.id}><td><Link className="candidate-cell" to={`/hr/applicants/${person.id}`}><span className="avatar">{person.avatar}</span><span><strong>{person.name}</strong><small>{person.email}</small></span></Link></td><td><strong className="table-role">{person.role}</strong><small>{person.department}</small></td><td>{person.experience}</td><td><span>{person.currentSalary}</span><small>Exp. {person.expectedSalary}</small></td><td><CandidateScore score={person.score} /></td><td><span className={`status-pill ${statusClass(person.status)}`}>{person.status}</span></td><td className="menu-cell"><button className="row-menu" onClick={() => setMenu(menu === person.id ? null : person.id)}><FiMoreHorizontal /></button>{menu === person.id && <div className="action-menu"><Link to={`/hr/applicants/${person.id}`}><FiEye /> View profile</Link><button onClick={() => { updateApplicant(person.id, { notes: `${person.notes} Notes updated.` }); setMenu(null); }}><FiEdit2 /> Edit notes</button><button onClick={() => { updateApplicant(person.id, { status: "Interview Scheduled" }); setMenu(null); }}><FiCalendar /> Schedule interview</button><button className="danger" onClick={() => deleteApplicant(person.id)}><FiTrash2 /> Delete</button></div>}</td></tr>)}</tbody>
    </table></div>
  );
}
