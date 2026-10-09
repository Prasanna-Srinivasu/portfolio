"use client";

import React, { useRef, useState, useEffect } from "react";
import { EXPERIENCE, EDUCATION } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";
import { useScroll } from "@/lib/scroll";

interface TimelineStop {
  id: string;
  type: "education" | "internship" | "experience";
  period: string;
  title: string;
  organization: string;
  location: string;
  bullets?: string[];
  details?: string;
}

export function Experience() {
  const [sectionRef] = useInView<HTMLElement>({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { scrollToTarget } = useScroll();

  // Chronological unified path: Education -> Datapro Internship -> HCL Technologies Experience
  const timelineStops: TimelineStop[] = [
    {
      id: "edu-1",
      type: "education",
      period: EDUCATION[0].period,
      title: EDUCATION[0].degree,
      organization: EDUCATION[0].institution,
      location: EDUCATION[0].location,
      details: EDUCATION[0].details,
    },
    {
      id: "exp-intern",
      type: "internship",
      period: EXPERIENCE[1].period,
      title: EXPERIENCE[1].role,
      organization: EXPERIENCE[1].company,
      location: EXPERIENCE[1].location,
      bullets: EXPERIENCE[1].bullets,
    },
    {
      id: "exp-hcl",
      type: "experience",
      period: EXPERIENCE[0].period,
      title: EXPERIENCE[0].role,
      organization: EXPERIENCE[0].company,
      location: EXPERIENCE[0].location,
      bullets: EXPERIENCE[0].bullets,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate progress from when top enters viewport until bottom leaves
      const start = windowH * 0.8;
      const total = rect.height;
      const current = start - rect.top;

      const p = Math.max(0, Math.min(1, current / total));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="py-24 md:py-36 px-[var(--gutter)] max-w-[1320px] mx-auto w-full relative"
    >
      <SectionHeader
        tagNumber="05"
        tagLabel="Career & Education"
        titlePrimary="One continuous"
        titleAccent="path"
        subtitle="Chronological trajectory spanning foundational computer science education, full-stack apprenticeship, and enterprise data operations at HCL Technologies."
      />

      <div ref={containerRef} className="relative mt-16 max-w-4xl mx-auto">
        {/* The Timeline Spine Line */}
        <div
          className="absolute left-4 sm:left-8 top-4 bottom-24 w-[2px] bg-[var(--line)]"
          aria-hidden="true"
        >
          {/* Active Drawn Spine */}
          <div
            className="w-full bg-[var(--ink)] origin-top transition-all duration-150"
            style={{
              height: `${progress * 100}%`,
            }}
          />
        </div>

        {/* Timeline Stops */}
        <div className="space-y-12 sm:space-y-16 pl-12 sm:pl-20">
          {timelineStops.map((stop, idx) => {
            const stopFraction = (idx + 0.3) / (timelineStops.length + 0.5);
            const isLit = progress >= stopFraction;
            const directionClass = idx % 2 === 0 ? "rv-slide-left" : "rv-slide-right";

            return (
              <div
                key={stop.id}
                style={{ "--i": idx } as React.CSSProperties}
                className={`relative group ${directionClass}`}
              >
                {/* Node indicator */}
                <div
                  className={`absolute -left-12 sm:-left-20 top-1.5 w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    isLit
                      ? "bg-[var(--card)] border-[var(--ink)] shadow-sm"
                      : "bg-[var(--paper)] border-[var(--line)]"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-transform duration-300 ${
                      isLit ? "bg-[var(--ink)] scale-100" : "bg-transparent scale-50"
                    }`}
                  />
                </div>

                {/* Card Container */}
                <div
                  className={`card-surface p-6 sm:p-8 border transition-all duration-300 ${
                    isLit
                      ? "border-[var(--line)] opacity-100"
                      : "border-transparent opacity-65"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--line)] pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-[var(--paper)] text-[var(--ink-2)] border border-[var(--line)]">
                          {stop.type}
                        </span>
                        <span className="font-mono text-xs text-[var(--mute)]">
                          {stop.location}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                        {stop.title}
                      </h3>
                      <h4 className="text-sm font-semibold text-[var(--ink-2)] mt-0.5">
                        {stop.organization}
                      </h4>
                    </div>

                    <div className="font-mono text-xs font-semibold text-[var(--ink)] sm:text-right shrink-0">
                      {stop.period}
                    </div>
                  </div>

                  {stop.details && (
                    <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                      {stop.details}
                    </p>
                  )}

                  {stop.bullets && (
                    <ul className="space-y-2 mt-2 text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed">
                      {stop.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-[var(--mute)] font-mono text-xs">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}

          {/* End Stop: Dashed card "Next — Your team?" */}
          <div
            className="relative rv-soft"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <div
              className={`absolute -left-12 sm:-left-20 top-6 w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 border-dashed border-[var(--ink)] flex items-center justify-center bg-[var(--paper)]`}
              aria-hidden="true"
            >
              <span className="font-mono text-xs">→</span>
            </div>

            <div className="rounded-[28px] border-2 border-dashed border-[var(--line)] hover:border-[var(--ink)] p-8 sm:p-10 text-center transition-colors duration-300 bg-[rgba(255,255,255,0.4)]">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)] block mb-2">
                Future Trajectory
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-3">
                Next — Your team?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--mute)] max-w-md mx-auto mb-6">
                Ready to contribute as a Java Full Stack or Backend Developer in a collaborative, growth-focused development team.
              </p>
              <button
                onClick={() => scrollToTarget("#contact")}
                className="btn-pill btn-primary text-xs cursor-pointer"
              >
                Let&apos;s build together ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
