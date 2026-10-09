"use client";

import React from "react";
import { useInView } from "@/lib/hooks";

interface SectionHeaderProps {
  tagNumber: string;
  tagLabel: string;
  titlePrimary: string;
  titleAccent: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({
  tagNumber,
  tagLabel,
  titlePrimary,
  titleAccent,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className={`mb-12 md:mb-16 ${className}`}>
      {/* Section tag above heading with soft fade-in & slide */}
      <div
        className={`flex items-center gap-2 mb-3 transition-all duration-700 ease-[var(--ease)] will-change-[transform,opacity] ${
          isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--mute)]">
          {tagNumber} — {tagLabel}
        </span>
      </div>

      {/* Main Heading with Masked Upward Lift */}
      <div className="overflow-hidden">
        <h2
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.045em] leading-tight text-[var(--ink)] transition-all duration-800 ease-[var(--ease)] will-change-[transform,opacity] ${
            isInView
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
          }`}
        >
          {titlePrimary}{" "}
          <span className="font-serif italic font-normal text-[var(--mute)]">
            {titleAccent}.
          </span>
        </h2>
      </div>

      {/* Subtitle with soft delayed slide-up */}
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg text-[var(--mute)] max-w-2xl leading-relaxed transition-all duration-800 delay-150 ease-[var(--ease)] will-change-[transform,opacity] ${
            isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
