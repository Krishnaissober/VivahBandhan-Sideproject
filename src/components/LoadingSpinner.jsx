// components/LoadingSpinner.jsx
// ─────────────────────────────────────────────────────────────────────────────
// A simple centered spinner shown while profiles are loading.
// "size" prop lets the parent control how big the spinner appears.
// ─────────────────────────────────────────────────────────────────────────────

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  // Map the size prop to Tailwind width/height classes
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    // flex column — spinner on top, text below, all centred
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      {/* The spinning circle: top border is brand-red, rest is transparent */}
      <div
        className={`${sizeClasses[size]} rounded-full border-brand-red border-t-transparent animate-spin`}
      />
      {text && <p className="text-gray-500 text-sm">{text}</p>}
    </div>
  );
}
