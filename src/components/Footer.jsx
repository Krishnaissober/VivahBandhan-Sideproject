// components/Footer.jsx
// ─────────────────────────────────────────────────────────────────────────────
// Site footer with links and branding.
// Pure presentational component — no state, no hooks needed.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Privacy Policy", "Terms of Use", "Safety Tips"],
  Products: [
    "Premium Membership",
    "Verified Profiles",
    "Horoscope Matching",
    "Gift Cards",
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* ── Top section: logo + columns + newsletter ─────────────────── */}
        <div className="flex flex-wrap gap-10 mb-10">
          {/* Brand column */}
          <div className="flex-1 min-w-[200px] max-w-xs">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <svg
                className="w-7 h-7 text-brand-red"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
              </svg>
              <span className="font-display font-bold text-xl text-white">
                Vivah<span className="text-brand-red">Bandhan</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              India's most trusted matrimony platform. Connecting hearts and
              families since 2009.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-5">
              {[
                {
                  label: "Facebook",
                  svg: (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.987H7.898v-2.889h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.561v1.874h2.773l-.443 2.889h-2.33V21.876C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  ),
                  href: "https://www.facebook.com",
                },
                {
                  label: "Instagram",
                  svg: (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.5a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                  ),
                  href: "https://www.instagram.com",
                },
                {
                  label: "Twitter",
                  svg: (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M22.46 6c-.77.34-1.6.56-2.46.66a4.33 4.33 0 001.92-2.39 8.59 8.59 0 01-2.72 1.04 4.29 4.29 0 00-7.31 3.91A12.15 12.15 0 013 4.8a4.29 4.29 0 001.33 5.72c-.67-.02-1.3-.2-1.85-.5v.05a4.29 4.29 0 003.44 4.21 4.29 4.29 0 01-1.94.07 4.29 4.29 0 004.01 2.98A8.6 8.6 0 012 19.54a12.12 12.12 0 006.56 1.92c7.88 0 12.19-6.53 12.19-12.19 0-.19-.01-.37-.02-.56A8.72 8.72 0 0024 5.5a8.53 8.53 0 01-2.54.7z" />
                    </svg>
                  ),
                  href: "https://www.twitter.com",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-brand-red transition-colors"
                >
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex-1 min-w-[130px]">
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="flex-1 min-w-[200px] max-w-xs">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm mb-3">
              Get success stories and tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-700 text-white placeholder-gray-500 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
              <button className="bg-brand-red text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-redDark transition">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} VivahBandhan. All rights reserved.
          </p>
          <p className="text-xs text-gray-500"></p>
        </div>
      </div>
    </footer>
  );
}
