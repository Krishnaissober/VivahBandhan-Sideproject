import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBriefcase, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><Link className="brand light" to="/"><span className="brand-mark"><FiBriefcase /></span><span>Hire<span>flow</span></span></Link><p>We build thoughtful tools for modern teams—and a workplace where remarkable people can do their best work.</p><div className="social-links"><a href="https://linkedin.com" aria-label="LinkedIn"><FiLinkedin /></a><a href="https://twitter.com" aria-label="Twitter"><FiTwitter /></a></div></div>
        <div><h4>Explore</h4><Link to="/jobs">Open roles</Link><a href="/#life">Our culture</a><a href="/#process">Hiring process</a></div>
        <div><h4>Teams</h4><span>Engineering</span><span>Design</span><span>People & Culture</span></div>
        <div className="footer-cta"><p className="eyebrow">Find your next chapter</p><h3>Ready to do work that matters?</h3><Link className="button button-light" to="/jobs">Explore careers <FiArrowUpRight /></Link></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Hireflow Technologies</span><span>Equal opportunity. Always.</span></div>
    </footer>
  );
}
