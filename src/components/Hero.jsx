// components/Hero.jsx
// ─────────────────────────────────────────────────────────────────────────────
// The large banner at the top of the Home page.
// Contains: headline, sub-text, CTA buttons, and decorative stats strip.
// Pure presentational component — no state needed here.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";

// ── Stats displayed at the bottom of the hero ────────────────────────────────
const stats = [
  { value: "5M+",  label: "Registered Members" },
  { value: "1.5M+", label: "Success Stories" },
  { value: "200+",  label: "Communities" },
  { value: "15+",   label: "Years of Trust" },
];

export default function Hero() {
  return (
    // Full-width section with gradient background
    <section className="relative bg-gradient-to-br from-brand-redSoft via-white to-brand-ivory overflow-hidden">

      {/* ── Decorative blurred circles (purely visual) ─────────────────── */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* ── Two-column layout: text left, image right ─────────────────── */}
        {/* On mobile: stacks vertically (flex-col). On md+: side by side (flex-row) */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">

          {/* ── Left column: text content ──────────────────────────────── */}
          <div className="flex-1 text-center md:text-left">

            {/* Eyebrow label */}
            <span className="inline-block bg-brand-red text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
              India's Most Trusted Matrimony
            </span>

            {/* Main headline */}
            <h1 className="section-title text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Find Your{" "}
              <span className="text-brand-red italic">Perfect</span>
              <br />
              Life Partner
            </h1>

            {/* Sub-text */}
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Join millions of families who found their perfect match on Vivah Bandhan.
              Genuine profiles. Verified members. Your journey to happiness starts here.
            </p>

            {/* CTA buttons — flex row, centred on mobile / left on desktop */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/register" className="btn-primary text-base px-8 py-3 text-center">
                Register Free
              </Link>
              <Link to="/search" className="btn-outline text-base px-8 py-3 text-center">
                Browse Profiles
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
              {["✓ 100% Free Registration", "✓ Verified Profiles", "✓ Safe & Secure"].map((b) => (
                <span key={b} className="text-sm text-gray-500 font-medium">{b}</span>
              ))}
            </div>
          </div>

          {/* ── Right column: photo collage ────────────────────────────── */}
          <div className="flex-1 flex justify-center relative">
            {/* Large centre photo */}
            <div className="relative z-10">
              <img
                src="https://i.pravatar.cc/400?img=47"
                alt="Happy couple"
                className="w-64 h-80 md:w-80 md:h-96 object-cover rounded-3xl shadow-2xl"
              />
              {/* Floating badge: "Matched!" */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-redSoft rounded-full flex items-center justify-center text-brand-red text-lg">💍</div>
                <div>
                  <p className="text-xs text-gray-500">Just Matched</p>
                  <p className="text-sm font-semibold text-brand-charcoal">Priya & Rahul</p>
                </div>
              </div>
              {/* Floating badge: star rating */}
              <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-lg px-4 py-3">
                <p className="text-xs text-gray-500 mb-1">Trusted by</p>
                <p className="text-sm font-bold text-brand-charcoal">5M+ Families</p>
                <div className="flex gap-0.5 mt-1">
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} className="w-3 h-3 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats strip ────────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          {/* flex wraps on small screens so stats stack nicely */}
          <div className="flex flex-wrap justify-center md:justify-between gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-brand-red">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
