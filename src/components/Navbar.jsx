import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiArrowUpRight, FiBriefcase, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="public-nav-wrap">
      <nav className="public-nav container">
        <Link className="brand" to="/" onClick={close}><span className="brand-mark"><FiBriefcase /></span><span>Hire<span>flow</span></span></Link>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <FiX /> : <FiMenu />}</button>
        <div className={`public-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={close}>Home</NavLink>
          <NavLink to="/jobs" onClick={close}>Open roles</NavLink>
          <a href="/#life" onClick={close}>Life at Hireflow</a>
          <a href="/#process" onClick={close}>How we hire</a>
          <Link className="nav-hr" to="/hr" onClick={close}>HR portal</Link>
          <Link className="button button-primary nav-apply" to="/jobs" onClick={close}>View openings <FiArrowUpRight /></Link>
        </div>
      </nav>
    </header>
  );
}
