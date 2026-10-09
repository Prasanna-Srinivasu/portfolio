"use client";

import React from "react";
import { CERTIFICATIONS } from "@/lib/data";
import { useInView } from "@/lib/hooks";

export function Certifications() {
  const [sectionRef] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="w-full bg-[var(--card)] border-y border-[var(--line)] py-24 md:py-32 lazy-section"
    >
      <div className="max-w-[1320px] mx-auto px-[var(--gutter)] grid grid-cols-1 md:grid-cols-[380px_1fr] gap-12 items-start">
        {/* Left Sticky Column */}
        <div className="md:sticky md:top-32 rv-slide-left" style={{ "--i": 0 } as React.CSSProperties}>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)]">
              04 — Verification
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.045em] leading-tight text-[var(--ink)] mb-4">
            Always{" "}
            <span className="font-serif italic font-normal text-[var(--mute)]">
              learning.
            </span>
          </h2>

          <div className="font-mono text-xs text-[var(--mute)] space-y-1">
            <p>02 Professional credentials earned</p>
            <p>Verified through enterprise & academy training</p>
          </div>
        </div>

        {/* Right Ink-Flood Numbered Rows */}
        <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {CERTIFICATIONS.map((cert, idx) => (
            <a
              key={cert.id}
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ "--i": idx + 1 } as React.CSSProperties}
              className="group relative block overflow-hidden py-8 px-6 cursor-pointer focus-visible:outline-none rv-slide-right"
              tabIndex={0}
              aria-label={`Verify ${cert.title} issued by ${cert.issuer}`}
            >
              {/* Ink Flood Background Layer */}
              <div
                className="absolute inset-0 bg-[var(--ink)] origin-left scale-x-0 group-hover:scale-x-100 group-focus:scale-x-100 transition-transform duration-500 ease-[var(--ease)] z-0 pointer-events-none"
                aria-hidden="true"
              />

              {/* Row Content */}
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-6">
                  <span className="font-mono text-sm sm:text-base font-bold text-[var(--mute)] group-hover:text-[var(--paper)] group-focus:text-[var(--paper)] transition-colors duration-300">
                    {cert.number}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[#ffffff] group-focus:text-[#ffffff] transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-[var(--mute)] group-hover:text-[var(--soft)] group-focus:text-[var(--soft)] transition-colors duration-300 mt-1">
                      Issuer: {cert.issuer} {cert.certId && `· ID: ${cert.certId}`}
                    </p>
                    {cert.details && (
                      <p className="text-xs text-[var(--ink-2)] group-hover:text-[#e0ded8] group-focus:text-[#e0ded8] transition-colors duration-300 mt-1">
                        {cert.details}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center font-mono text-xs text-[var(--mute)] group-hover:text-[#ffffff] group-focus:text-[#ffffff] transition-colors duration-300">
                  <span className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
                    Verify Credential
                  </span>
                  <span className="text-lg transform translate-x-0 group-hover:translate-x-1 group-focus:translate-x-1 transition-transform duration-300">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
