// components/Testimonials.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Success stories section — displays couple testimonials in cards.
// Pure presentational — no state needed. Data comes from data/profiles.js.
// ─────────────────────────────────────────────────────────────────────────────

import { testimonials } from "../data/profiles";

export default function Testimonials() {
  return (
    <section className="bg-brand-redSoft py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-12">
          <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">Success Stories</span>
          <h2 className="section-title mt-2">Couples Who Found Love</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Over 1.5 million couples have begun their forever journey through Vivah Bandhan.
          </p>
        </div>

        {/* Cards container — flex row, wraps on smaller screens */}
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="card p-6 flex flex-col items-center text-center max-w-xs w-full flex-1 min-w-[240px]">

              {/* Couple photo */}
              <div className="relative mb-4">
                <img
                  src={t.photo}
                  alt={`${t.bride} & ${t.groom}`}
                  className="w-20 h-20 rounded-full object-cover border-4 border-brand-red"
                />
                {/* Ring emoji badge */}
                <span className="absolute -bottom-1 -right-1 text-xl">💑</span>
              </div>

              {/* Names */}
              <h3 className="font-display font-semibold text-brand-charcoal">
                {t.bride} &amp; {t.groom}
              </h3>
              <p className="text-brand-red text-xs font-medium mb-3">Married {t.marriedOn}</p>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed italic">"{t.quote}"</p>

              {/* Stars */}
              <div className="flex gap-1 mt-4">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-4 h-4 text-brand-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
