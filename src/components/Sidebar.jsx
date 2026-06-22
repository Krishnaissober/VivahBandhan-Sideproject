import { NavLink } from "react-router-dom";
import { FiActivity, FiBarChart2, FiBriefcase, FiChevronLeft, FiGrid, FiHelpCircle, FiLogOut, FiMessageCircle, FiSettings, FiTrello, FiUsers, FiX } from "react-icons/fi";

const links = [
  { to: "/hr", end: true, label: "Overview", icon: FiGrid },
  { to: "/hr/applicants", label: "Applicants", icon: FiUsers, badge: "24" },
  { to: "/hr/pipeline", label: "Pipeline", icon: FiTrello },
  { to: "/hr/reports", label: "Interview reports", icon: FiActivity },
  { to: "/hr/analytics", label: "Analytics", icon: FiBarChart2 },
  { to: "/hr/messages", label: "Messages", icon: FiMessageCircle, dot: true },
];

export default function Sidebar({ open, close }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-brand"><NavLink className="brand light" to="/hr"><span className="brand-mark"><FiBriefcase /></span><span>Hire<span>flow</span></span></NavLink><button onClick={close}><FiX /></button></div>
      <div className="workspace-select"><span>HF</span><div><strong>Hireflow Inc.</strong><small>Recruitment team</small></div><FiChevronLeft /></div>
      <p className="sidebar-label">Workspace</p>
      <nav className="sidebar-nav">{links.map(({ to, label, icon: Icon, ...rest }) => <NavLink key={to} to={to} end={rest.end} onClick={close}><Icon /><span>{label}</span>{rest.badge && <b>{rest.badge}</b>}{rest.dot && <i />}</NavLink>)}</nav>
      <p className="sidebar-label">Manage</p>
      <nav className="sidebar-nav secondary"><a href="#settings"><FiSettings /><span>Settings</span></a><a href="#help"><FiHelpCircle /><span>Help & support</span></a></nav>
      <div className="sidebar-user"><div className="avatar purple">NR</div><div><strong>Neha Rao</strong><small>HR Manager</small></div><button aria-label="Log out"><FiLogOut /></button></div>
    </aside>
  );
}
