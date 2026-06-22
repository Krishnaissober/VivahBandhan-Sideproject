export default function CandidateScore({ score, large = false }) {
  const level = score >= 80 ? "strong" : score >= 60 ? "average" : "weak";
  return <div className={`candidate-score ${level} ${large ? "large" : ""}`}><span>{score}</span>{large && <small>/ 100</small>}</div>;
}
