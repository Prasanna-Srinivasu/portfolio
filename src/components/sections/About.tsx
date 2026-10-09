"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";

export function About() {
  const [sectionRef] = useInView<HTMLElement>({ threshold: 0.1 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef({
    angle: 0,
    targetAngle: 0,
    velocity: 0,
    lastX: 0,
  });

  // Pendulum swing physics & idle sway
  useEffect(() => {
    let animId: number;
    let time = 0;

    const loop = () => {
      time += 0.03;
      const state = physicsRef.current;

      // Spring damper towards targetAngle + gentle idle sway
      const idleSway = Math.sin(time) * 1.5;
      const currentTarget = state.targetAngle + idleSway;
      const springK = 0.08;
      const damping = 0.88;

      const force = (currentTarget - state.angle) * springK;
      state.velocity = (state.velocity + force) * damping;
      state.angle += state.velocity;

      // Decay targetAngle back to 0
      state.targetAngle *= 0.95;

      setRotationAngle(state.angle);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const handlePointerMove = (e: MouseEvent) => {
      if (!cardContainerRef.current) return;
      const rect = cardContainerRef.current.getBoundingClientRect();
      const isNear =
        e.clientX >= rect.left - 150 &&
        e.clientX <= rect.right + 150 &&
        e.clientY >= rect.top - 100 &&
        e.clientY <= rect.bottom + 100;

      if (isNear) {
        const deltaX = e.clientX - physicsRef.current.lastX;
        const push = Math.max(-12, Math.min(12, deltaX * 0.4));
        physicsRef.current.targetAngle = push;
      }
      physicsRef.current.lastX = e.clientX;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 px-[var(--gutter)] max-w-[1320px] mx-auto w-full relative"
    >
      <SectionHeader
        tagNumber="01"
        tagLabel="About"
        titlePrimary="Building with"
        titleAccent="clarity"
      />

      <div
        className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px_minmax(0,1fr)] gap-8 lg:gap-12 items-stretch"
      >
        {/* Left Column: Summary & CTAs */}
        <div
          className="card-surface p-8 sm:p-10 flex flex-col justify-between rv-slide-left"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)] block mb-3">
              01.1 — Summary
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-4">
              Hi, I&apos;m {PROFILE.name}.
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--ink-2)] mb-4 text-justify">
              {PROFILE.resumeSummary}
            </p>
            <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed italic border-l-2 border-[var(--line)] pl-3">
              {PROFILE.shortSummaryLine}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[var(--line)]">
            <a
              href={PROFILE.resumePath}
              download
              className="btn-pill btn-primary text-xs"
            >
              <span>Download Résumé</span>
              <span className="font-mono text-xs">↓</span>
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-secondary text-xs"
            >
              <span>GitHub</span>
              <span className="font-mono text-xs">↗</span>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-secondary text-xs"
            >
              <span>LinkedIn</span>
              <span className="font-mono text-xs">↗</span>
            </a>
          </div>
        </div>

        {/* Centre Column: Hanging Lanyard ID Card */}
        <div
          ref={cardContainerRef}
          className="flex flex-col items-center justify-start relative select-none min-h-[500px] rv-soft"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {/* Lanyard Strap: 30x56 px with scrolling text and metal clip */}
          <div className="flex flex-col items-center z-10 -mt-6">
            <div
              className="w-[30px] h-[56px] bg-[var(--ink)] text-[var(--paper)] rounded-t-sm flex items-center justify-center overflow-hidden border border-[var(--ink-2)] shadow-sm"
              style={{
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              <div className="font-mono text-[8px] uppercase tracking-widest rotate-90 whitespace-nowrap opacity-75">
                {PROFILE.firstName} · DEV
              </div>
            </div>
            {/* Metal Clip */}
            <div className="w-[18px] h-[14px] bg-gradient-to-b from-[#b0ada8] to-[#6d6b67] rounded-sm -mt-0.5 shadow-inner border border-[#484643]" />
            <div className="w-[8px] h-[8px] border-2 border-[#807e79] rounded-full -mt-1" />
          </div>

          {/* Interactive Card: Pendulum Swing & 3D Flip */}
          <div
            className="w-[300px] h-[404px] cursor-pointer mt-1 focus-visible:outline-none"
            style={{
              perspective: "1200px",
              transform: `rotate(${rotationAngle}deg)`,
              transformOrigin: "top center",
              transition: "transform 0.05s linear",
            }}
            tabIndex={0}
            role="button"
            aria-label="Interactive Developer ID Card. Click or press Enter to flip."
            onClick={() => setIsFlipped(!isFlipped)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsFlipped(!isFlipped);
              }
            }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >
              {/* FRONT SIDE */}
              <div
                className="absolute inset-0 bg-[#ffffff] rounded-[24px] overflow-hidden border border-[var(--line)] shadow-xl flex flex-col justify-between p-5"
                style={{
                  backfaceVisibility: "hidden",
                  boxShadow:
                    "0 20px 40px -15px rgba(13, 13, 13, 0.12), inset 0 0 0 1px rgba(13, 13, 13, 0.08)",
                }}
              >
                {/* Black top band */}
                <div className="bg-[var(--ink)] text-[var(--paper)] py-1.5 px-3 -mx-5 -mt-5 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest font-semibold">
                    DEVELOPER ID
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>

                {/* Portrait centered in 128x156 frame */}
                <div className="flex flex-col items-center mt-3">
                  <div className="relative w-[128px] h-[156px] rounded-xl overflow-hidden p-1 bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] shadow-inner group">
                    <div className="relative w-full h-full rounded-lg overflow-hidden bg-[var(--paper)]">
                      <Image
                        src="/portrait-bust.webp"
                        alt={PROFILE.name}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  <h4 className="mt-3 text-base font-bold tracking-tight text-[var(--ink)] text-center">
                    {PROFILE.name}
                  </h4>
                  <p className="text-[11px] font-mono text-[var(--mute)] text-center">
                    {PROFILE.role}
                  </p>
                </div>

                {/* Metadata Rows */}
                <div className="space-y-1 font-mono text-[10px] border-t border-[var(--line)] pt-3 text-[var(--ink-2)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--mute)]">ID NO:</span>
                    <span className="font-semibold">HCL-2023-DEV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--mute)]">DEPT:</span>
                    <span className="font-semibold">Full Stack Development</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--mute)]">VALID:</span>
                    <span className="font-semibold">Permanent / 2026</span>
                  </div>
                </div>

                {/* Barcode & Holographic Sticker */}
                <div className="flex items-center justify-between border-t border-[var(--line)] pt-2 mt-1">
                  <div className="flex gap-[2px] items-center h-5 opacity-70">
                    {[3, 1, 4, 1, 2, 5, 1, 3, 2, 4, 2, 1, 3, 1, 4, 2].map(
                      (w, i) => (
                        <div
                          key={i}
                          className="h-full bg-[var(--ink)]"
                          style={{ width: `${w}px` }}
                        />
                      )
                    )}
                  </div>
                  {/* Holographic grayscale shimmer */}
                  <div className="w-7 h-7 rounded-full border border-[var(--line)] bg-gradient-to-tr from-[#cfcbc4] via-[#f7f5f0] to-[#b3afa8] opacity-80 flex items-center justify-center shadow-xs">
                    <span className="font-mono text-[7px] text-[var(--ink)] font-bold">
                      VERIFIED
                    </span>
                  </div>
                </div>
              </div>

              {/* BACK SIDE */}
              <div
                className="absolute inset-0 bg-[#ffffff] rounded-[24px] overflow-hidden border border-[var(--line)] shadow-xl flex flex-col justify-between p-5"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  boxShadow:
                    "0 20px 40px -15px rgba(13, 13, 13, 0.12), inset 0 0 0 1px rgba(13, 13, 13, 0.08)",
                }}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-3">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--mute)]">
                      Credentials
                    </span>
                    <span className="font-mono text-[10px] text-[var(--ink)] font-semibold">
                      RESUME PROVEN
                    </span>
                  </div>

                  <h5 className="font-serif italic text-lg text-[var(--ink)] mb-2">
                    What I am:
                  </h5>

                  <ul className="text-xs text-[var(--ink-2)] space-y-2 leading-snug">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[var(--mute)] font-mono">▸</span>
                      <span>
                        <strong>Role:</strong> {PROFILE.role}
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[var(--mute)] font-mono">▸</span>
                      <span>
                        <strong>Education:</strong> B.Sc. Computer Science
                        (2020–2023)
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[var(--mute)] font-mono">▸</span>
                      <span>
                        <strong>Enterprise:</strong> 3 yrs operations & data
                        validation at HCL
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[var(--mute)] font-mono">▸</span>
                      <span>
                        <strong>Personal Projects:</strong> Shopper (4 Microservices) &
                        FoodieGo SPA
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[var(--mute)] font-mono">▸</span>
                      <span>
                        <strong>Certifications:</strong> Java Full Stack & HCL
                        Yuva AI
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border-t border-[var(--line)] pt-3 text-[10px] font-mono text-[var(--mute)] space-y-1">
                  <div className="flex justify-between items-center">
                    <span>Signature:</span>
                    <span className="font-serif italic text-xs text-[var(--ink)]">
                      L. Prasanna Manthena
                    </span>
                  </div>
                  <div className="text-[9px] pt-1 text-center border-t border-[var(--line)]">
                    If found, say hello · {PROFILE.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="font-mono text-[10px] text-[var(--mute)] mt-3">
            [ Hover / tap or press Enter to flip ]
          </span>
        </div>

        {/* Right Column: Quick Facts & Quote */}
        <div
          className="card-surface p-8 sm:p-10 flex flex-col justify-between rv-slide-right"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)] block mb-3">
              01.2 — Quick facts
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-6">
              Verified details.
            </h3>

            <div className="space-y-4 font-mono text-xs border-t border-[var(--line)] pt-4">
              <div className="flex flex-col gap-1 pb-3 border-b border-[var(--line)]">
                <span className="text-[var(--mute)] text-[10px] uppercase">
                  Location
                </span>
                <span className="text-[var(--ink)] font-semibold text-sm">
                  {PROFILE.location} {PROFILE.openToRelocate && "(Open to Relocate)"}
                </span>
              </div>

              <div className="flex flex-col gap-1 pb-3 border-b border-[var(--line)]">
                <span className="text-[var(--mute)] text-[10px] uppercase">
                  Education
                </span>
                <span className="text-[var(--ink)] font-semibold text-sm">
                  B.Sc. Computer Science (2020–2023)
                </span>
                <span className="text-[var(--mute)] text-[11px]">
                  Aditya Group of Institutions, AP
                </span>
              </div>

              <div className="flex flex-col gap-1 pb-3 border-b border-[var(--line)]">
                <span className="text-[var(--mute)] text-[10px] uppercase">
                  Experience
                </span>
                <span className="text-[var(--ink)] font-semibold text-sm">
                  HCL Technologies (Aug 2023 – Apr 2026)
                </span>
                <span className="text-[var(--mute)] text-[11px]">
                  Customer Service Rep · Tech / App Exp
                </span>
              </div>

              <div className="flex flex-col gap-1 pb-1">
                <span className="text-[var(--mute)] text-[10px] uppercase">
                  Email
                </span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="text-[var(--ink)] font-semibold text-sm hover:underline"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--line)] bg-[var(--paper)] p-4 rounded-xl border border-[var(--line)]">
            <span className="font-mono text-[10px] text-[var(--mute)] uppercase block mb-1">
              Focus Principle
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[var(--ink)] leading-snug">
              &ldquo;{PROFILE.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
