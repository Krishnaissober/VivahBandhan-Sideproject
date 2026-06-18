// pages/Home.jsx
// ─────────────────────────────────────────────────────────────────────────────
// The landing page. Assembles all the section components together.
// useEffect loads a subset of profiles for the "Featured Profiles" section.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SearchForm from "../components/SearchForm";
import ProfileCard from "../components/ProfileCard";
import Testimonials from "../components/Testimonials";
import LoadingSpinner from "../components/LoadingSpinner";
import { FileText, Search, MessageCircle, HeartHandshake } from "lucide-react";
import { profiles } from "../data/profiles";

// ── "How it works" steps ──────────────────────────────────────────────────────
const steps = [
  {
    icon: <FileText/>,
    title: "Create Profile",
    desc: "Register free and build your detailed matrimonial profile in minutes.",
  },
  {
    icon: <Search/>,
    title: "Search & Filter",
    desc: "Use smart filters to find profiles that match your preferences.",
  },
  {
    icon: <MessageCircle/>,
    title: "Connect & Chat",
    desc: "Express interest and start a conversation with compatible matches.",
  },
  {
    icon: <HeartHandshake/>,
    title: "Get Married",
    desc: "Meet, bond, and begin your beautiful journey together.",
  },
];

export default function Home() {
  // State: featured profiles to show (top 6 by premium/verified status)
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect: runs once after the component mounts (empty dependency array)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Sort: premium first, then verified, then rest. Take top 6.
      const sorted = [...profiles].sort((a, b) => {
        if (a.premium && !b.premium) return -1;
        if (!a.premium && b.premium) return 1;
        if (a.verified && !b.verified) return -1;
        return 1;
      });
      setFeatured(sorted.slice(0, 6));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer); // cleanup
  }, []);

  const handleConnect = (profile) => {
    alert(`Interest sent to ${profile.name}! They will be notified.`);
  };

  return (
    <main>
      {/* 1. Hero banner */}
      <Hero />

      {/* 2. Quick search */}
      <SearchForm />

      {/* 3. How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">
              Simple Process
            </span>
            <h2 className="section-title mt-2">How Vivah Bandhan Works</h2>
          </div>
          {/* Flex row of step cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 flex-1 min-w-[180px] max-w-[220px] group"
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                {/* Step number circle */}
                <div className="w-8 h-8 rounded-full bg-brand-red text-white text-sm font-bold flex items-center justify-center mb-3">
                  {idx + 1}
                </div>
                <h3 className="font-display font-semibold text-brand-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Profiles */}
      <section className="py-16 px-4 bg-brand-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-3">
            <div>
              <span className="text-brand-red text-sm font-semibold uppercase tracking-widest">
                Browse Profiles
              </span>
              <h2 className="section-title mt-1">Featured Matches</h2>
            </div>
            <Link
              to="/search"
              className="btn-outline text-sm px-5 py-2 whitespace-nowrap"
            >
              View All Profiles
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="Loading featured profiles..." />
          ) : (
            // Flex row wrapping — each card takes 1/3 of row on md+, full width on mobile
            <div className="flex flex-wrap gap-6">
              {featured.map((profile) => (
                <div
                  key={profile.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                >
                  <ProfileCard profile={profile} onConnect={handleConnect} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Testimonials */}
      <Testimonials />

      {/* 6. CTA Banner */}
      <section className="bg-brand-red py-16 px-4 text-center text-white">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your Life Partner?
        </h2>
        <p className="text-red-100 mb-8 text-lg max-w-xl mx-auto">
          Join over 5 million members who have found their match. Registration
          is free!
        </p>
        <Link
          to="/register"
          className="bg-white text-brand-red font-bold px-10 py-3 rounded-full hover:bg-gray-100 transition text-lg"
        >
          Register Now — It's Free
        </Link>
      </section>
    </main>
  );
}
