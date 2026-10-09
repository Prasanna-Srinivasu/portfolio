"use client";

import React, { useState } from "react";
import { PROFILE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";
import { useScroll } from "@/lib/scroll";

export function Contact() {
  const [sectionRef] = useInView<HTMLElement>({ threshold: 0.1 });
  const { scrollToTarget } = useScroll();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback
    }
  };

  const scrollToTop = () => {
    scrollToTarget(0);
  };

  const headingText = "Let's build something together.";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="pt-24 md:pt-36 pb-12 px-[var(--gutter)] max-w-[1320px] mx-auto w-full relative"
    >
      <SectionHeader
        tagNumber="07"
        tagLabel="Get in Touch"
        titlePrimary="Start a"
        titleAccent="conversation"
      />

      <div
        className="card-surface p-8 sm:p-14 lg:p-16 relative overflow-hidden rv-soft"
      >
        {/* Spinning Circular "SAY HELLO" Badge */}
        <div className="absolute top-8 right-8 sm:top-12 sm:right-12 pointer-events-none select-none">
          <div className="w-24 h-24 sm:w-28 sm:h-28 relative animate-[spin_16s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[var(--mute)]">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="font-mono text-[9.5px] uppercase tracking-[0.22em] font-semibold">
                <textPath href="#circlePath">
                  · SAY HELLO · GET IN TOUCH · SAY HELLO
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-[var(--ink)]">
              ↗
            </div>
          </div>
        </div>

        {/* Large Hopping Letter Heading */}
        <div className="max-w-2xl mb-12 rv-slide-left">
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--ink)] leading-tight flex flex-wrap">
            {headingText.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4">
                {word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-block hover:-translate-y-2 hover:text-[var(--mute)] transition-transform duration-200 cursor-default"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h3>
          <p className="mt-4 text-sm sm:text-base text-[var(--mute)] leading-relaxed max-w-lg">
            Open to full-time Java Full Stack and backend development roles. Reach out directly via email, phone, or connected platforms.
          </p>
        </div>

        {/* Big Email Link with Copy Chip */}
        <div className="mb-12 pb-10 border-b border-[var(--line)]">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-2">
            Primary Email
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-xl sm:text-3xl md:text-4xl font-mono font-bold text-[var(--ink)] underline underline-offset-8 decoration-1 decoration-[var(--line)] hover:decoration-[var(--ink)] transition-colors break-all"
            >
              {PROFILE.email}
            </a>

            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--card)] text-xs font-mono text-[var(--ink)] transition-all flex items-center gap-1.5 active:scale-95 shadow-xs"
              aria-live="polite"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <span>Copy</span>
                  <span className="text-[var(--mute)]">⧉</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Channels Grid: Phone, GitHub, LinkedIn */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs rv-slide-right"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <div>
            <span className="text-[var(--mute)] uppercase block mb-1">
              Phone
            </span>
            <a
              href={PROFILE.phoneHref}
              className="font-bold text-[var(--ink)] hover:underline text-sm"
            >
              {PROFILE.phone}
            </a>
          </div>

          <div>
            <span className="text-[var(--mute)] uppercase block mb-1">
              GitHub Profile
            </span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--ink)] hover:underline text-sm inline-flex items-center gap-1"
            >
              <span>github.com/Prasanna-Srinivasu</span>
              <span>↗</span>
            </a>
          </div>

          <div>
            <span className="text-[var(--mute)] uppercase block mb-1">
              LinkedIn Profile
            </span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--ink)] hover:underline text-sm inline-flex items-center gap-1"
            >
              <span>in/manthena-lakshmiprasanna</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--mute)]">
        <div>
          © 2026 {PROFILE.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="hover:text-[var(--ink)] transition-colors underline underline-offset-4"
          >
            Back to top ↑
          </button>
        </div>
      </footer>
    </section>
  );
}
