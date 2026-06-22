import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBriefcase, FiClock, FiMapPin } from "react-icons/fi";

export default function JobCard({ job }) {
  return (
    <article className="job-card">
      <div className="job-card-top"><span className={`job-icon ${job.department.toLowerCase()}`}><FiBriefcase /></span><span className="job-type">{job.type}</span></div>
      <div><p className="job-department">{job.department}</p><h3>{job.title}</h3><p className="job-description">{job.description}</p></div>
      <div className="job-meta"><span><FiMapPin /> {job.location}</span><span><FiClock /> {job.experience}</span></div>
      <div className="skill-tags">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      <div className="job-footer"><strong>{job.salary}</strong><Link to={`/apply/${job.id}`}>View role <FiArrowUpRight /></Link></div>
    </article>
  );
}
