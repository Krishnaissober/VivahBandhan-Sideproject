import { Link } from "react-router-dom";
import { FiArrowDown, FiArrowRight, FiArrowUpRight, FiCheck, FiCompass, FiHeart, FiMessageSquare, FiPlay, FiTarget, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import JobCard from "../components/JobCard";
import { jobs } from "../data/hiringData";

const principles = [
  { icon: FiTarget, title: "Make the complex simple", text: "We turn knotty problems into clear, elegant experiences people enjoy using." },
  { icon: FiUsers, title: "Win as one team", text: "The best idea wins, wherever it comes from. We share context and build together." },
  { icon: FiTrendingUp, title: "Grow with intention", text: "Clear feedback, thoughtful coaching, and real ownership from your first week." },
  { icon: FiHeart, title: "People are the point", text: "We care about the humans behind the work—and build a culture that proves it." },
];

export default function Home() {
  return <>
    <main>
      <section className="hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy"><p className="eyebrow"><span /> Careers at Hireflow</p><h1>Build what’s next.<br /><em>Become who’s next.</em></h1><p className="hero-lead">Join a team of curious builders creating technology that makes work feel more human. Big challenges, kind people, and room to do the best work of your career.</p><div className="hero-actions"><Link className="button button-primary" to="/jobs">Explore open roles <FiArrowUpRight /></Link><a className="play-link" href="#life"><span><FiPlay /></span> See life at Hireflow</a></div><div className="hero-trust"><div className="mini-avatars"><span>PN</span><span>AM</span><span>RK</span><span>+84</span></div><p><strong>4.8 / 5</strong><br />team happiness score</p></div></div>
          <div className="hero-visual">
            <div className="visual-card main-photo"><div className="photo-gradient"><div className="people-art"><span className="person person-1"/><span className="person person-2"/><span className="person person-3"/><span className="table-art"/></div></div><div className="photo-caption"><span>Inside Hireflow</span><strong>Design critique, Bengaluru</strong></div></div>
            <div className="floating-card people-card"><span className="float-icon"><FiUsers /></span><div><strong>86 people</strong><small>12 cities · 4 countries</small></div></div>
            <div className="floating-card hiring-card"><span><FiZap /></span><div><small>We’re hiring</small><strong>6 open roles</strong></div><FiArrowRight /></div>
            <div className="quote-card"><FiMessageSquare /><p>“I’ve never had this much trust to shape the work.”</p><span>— Meera, Product Design</span></div>
          </div>
        </div><a href="#life" className="scroll-cue"><FiArrowDown /></a>
      </section>

      <section className="logo-strip"><div className="container"><span>Trusted by ambitious teams at</span><div><strong>northstar</strong><strong>Vertex</strong><strong>MONO</strong><strong>Riverbed</strong><strong>aperture</strong></div></div></section>

      <section className="section culture" id="life"><div className="container"><div className="section-heading split"><div><p className="eyebrow">Why Hireflow</p><h2>Do work you’re proud of.<br /><em>With people you like.</em></h2></div><p>We believe exceptional work and a genuinely good workplace belong together. Here’s how we make that real.</p></div><div className="principle-grid">{principles.map(({icon: Icon, title, text}, index) => <article key={title} className="principle-card"><div className={`principle-icon color-${index}`}><Icon /></div><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><a href="#process">Learn more <FiArrowRight /></a></article>)}</div></div></section>

      <section className="section openings"><div className="container"><div className="section-heading"><p className="eyebrow">Open positions</p><h2>Find your place<br />on the team.</h2><p>Different craft. Shared ambition. Explore where you could make your mark.</p></div><div className="jobs-grid">{jobs.slice(0, 3).map((job) => <JobCard job={job} key={job.id} />)}</div><div className="center-action"><Link className="button button-outline" to="/jobs">View all 6 openings <FiArrowRight /></Link></div></div></section>

      <section className="section process" id="process"><div className="container"><div className="section-heading centered"><p className="eyebrow">Our hiring process</p><h2>Clear, human, and<br />respectful of your time.</h2><p>No black boxes. You’ll always know what’s next and where you stand.</p></div><div className="process-line">{[
        ["01", "Apply", "Tell us what makes you, you. No keyword games.", "~5 min"],
        ["02", "Meet the team", "A genuine conversation about the role and your goals.", "30 min"],
        ["03", "Show your craft", "A practical, role-relevant conversation—not a trick test.", "60 min"],
        ["04", "Decision", "Clear feedback and a quick decision, whatever the outcome.", "2–3 days"],
      ].map(([n, title, text, time], i) => <article key={n}><div className="step-number">{i < 3 && <span />}<strong>{n}</strong></div><h3>{title}</h3><p>{text}</p><small>{time}</small></article>)}</div></div></section>

      <section className="section values-banner"><div className="container values-inner"><div><p className="eyebrow">Work from where you thrive</p><h2>Great work has<br />no postcode.</h2><p>We’re remote-friendly by design, with beautiful hubs for the days when being together makes the work better.</p><div className="check-list"><span><FiCheck /> Flexible hybrid work</span><span><FiCheck /> Home office budget</span><span><FiCheck /> Quarterly team gatherings</span></div></div><div className="location-map"><div className="map-grid"/><span className="map-pin pin-one">Bengaluru</span><span className="map-pin pin-two">Mumbai</span><span className="map-pin pin-three">Remote</span><div className="map-stat"><FiCompass /><strong>12 cities</strong><span>One connected team</span></div></div></div></section>
    </main>
  </>;
}
