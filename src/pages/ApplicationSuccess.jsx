import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck, FiCopy, FiHome } from "react-icons/fi";
import { useHiring } from "../App";

export default function ApplicationSuccess() {
  const { lastApplication } = useHiring();
  const id = lastApplication?.id || "APP-2026-0042";
  return <main className="success-page"><div className="success-card"><div className="success-ring"><FiCheck /></div><p className="eyebrow">Application received</p><h1>You’re officially in<br />the running.</h1><p>Thanks{lastApplication ? `, ${lastApplication.name.split(" ")[0]}` : ""}! Your application is now with our hiring team. We’ll review it carefully and be in touch within 3–5 working days.</p><div className="application-id"><span>Your application ID</span><strong>{id}</strong><button onClick={() => navigator.clipboard?.writeText(id)} aria-label="Copy application ID"><FiCopy /></button></div><div className="success-timeline"><span className="done"><i><FiCheck /></i><b>Submitted</b></span><span><i>2</i><b>Team review</b></span><span><i>3</i><b>Next steps</b></span></div><div className="success-actions"><Link className="button button-primary" to="/jobs">Track application <FiArrowRight /></Link><Link className="button button-ghost" to="/"><FiHome /> Back to home</Link></div></div></main>;
}
