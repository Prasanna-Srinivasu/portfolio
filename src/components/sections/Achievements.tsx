"use client";

import React, { useState, useEffect, useRef } from "react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/lib/hooks";

export function Achievements() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % ACHIEVEMENTS.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + ACHIEVEMENTS.length) % ACHIEVEMENTS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="py-24 md:py-36 px-[var(--gutter)] max-w-[1320px] mx-auto w-full relative"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <SectionHeader
          tagNumber="06"
          tagLabel="Milestones"
          titlePrimary="Quantified"
          titleAccent="milestones"
          subtitle="Verified delivery metrics and enterprise benchmarks drawn strictly from my résumé."
        />

        {/* Interactive View Switcher Pill */}
        <div
          className="flex items-center gap-1 p-1 rounded-full bg-white border border-[var(--line)] shadow-xs shrink-0 self-start sm:self-end rv-slide-right"
          role="tablist"
          aria-label="Milestone View Switcher"
        >
          <button
            onClick={() => setViewMode("grid")}
            role="tab"
            aria-selected={viewMode === "grid"}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
              viewMode === "grid"
                ? "bg-[var(--ink)] text-[#ffffff] font-semibold shadow-xs"
                : "text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            <span>⊞</span>
            <span>Bento Grid</span>
          </button>
          <button
            onClick={() => setViewMode("carousel")}
            role="tab"
            aria-selected={viewMode === "carousel"}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
              viewMode === "carousel"
                ? "bg-[var(--ink)] text-[#ffffff] font-semibold shadow-xs"
                : "text-[var(--mute)] hover:text-[var(--ink)]"
            }`}
          >
            <span>↔</span>
            <span>Slider View</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: BENTO GRID MODEL (Default, Zero-Trap, Instant Overview) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, idx) => (
            <BentoMetricCard
              key={item.id}
              item={item}
              index={idx}
              parentInView={isInView}
            />
          ))}
        </div>
      )}

      {/* VIEW 2: INTERACTIVE CAROUSEL SLIDER (Smooth Controls & Pagination) */}
      {viewMode === "carousel" && (
        <div
          className={`relative w-full rv ${isInView ? "is-in" : ""}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Active Card Showcase */}
          <div className="w-full max-w-2xl mx-auto min-h-[340px] flex items-center justify-center">
            <BentoMetricCard
              item={ACHIEVEMENTS[activeSlide]}
              index={activeSlide}
              parentInView={true}
              isCarouselActive
            />
          </div>

          {/* Slider Controls Cluster */}
          <div className="flex items-center justify-between max-w-2xl mx-auto mt-8 pt-6 border-t border-[var(--line)]">
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-[var(--line)] bg-white text-[var(--ink)] flex items-center justify-center hover:bg-[var(--ink)] hover:text-white transition-colors duration-200 shadow-xs"
                aria-label="Previous milestone"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-[var(--line)] bg-white text-[var(--ink)] flex items-center justify-center hover:bg-[var(--ink)] hover:text-white transition-colors duration-200 shadow-xs"
                aria-label="Next milestone"
              >
                →
              </button>
              <span className="font-mono text-xs text-[var(--mute)] ml-3">
                {ACHIEVEMENTS[activeSlide].index}
              </span>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {ACHIEVEMENTS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeSlide
                      ? "w-6 bg-[var(--ink)]"
                      : "w-2 bg-[var(--line)] hover:bg-[var(--mute)]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Verified Résumé Footer Note */}
      <div className="mt-12 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[var(--mute)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>100% Verified against Manthena_Lakshmi_Prasannaa_Resume.pdf</span>
        </div>
        <span>Continuous software delivery & production readiness</span>
      </div>
    </section>
  );
}

function BentoMetricCard({
  item,
  index,
  parentInView,
  isCarouselActive = false,
}: {
  item: AchievementItem;
  index: number;
  parentInView: boolean;
  isCarouselActive?: boolean;
}) {
  const [count, setCount] = useState(0);
  const [hasCounted, setHasCounted] = useState(false);

  // Smooth easeOutQuart count-up animation
  useEffect(() => {
    if (parentInView && !hasCounted) {
      setHasCounted(true);
      const startTime = performance.now();
      const duration = 1200;
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

      const frame = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const currentVal = Math.round(easeOutQuart(progress) * item.targetNumber);
        setCount(currentVal);

        if (progress < 1) {
          requestAnimationFrame(frame);
        }
      };

      requestAnimationFrame(frame);
    }
  }, [parentInView, hasCounted, item.targetNumber]);

  const directionClass =
    index % 3 === 0 ? "rv-slide-left" : index % 3 === 1 ? "rv-scale" : "rv-slide-right";

  return (
    <div
      style={{ "--i": index } as React.CSSProperties}
      className={`card-surface p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-[#ffffff] border border-[var(--line)] ${
        isCarouselActive
          ? "w-full shadow-lg"
          : `hover:-translate-y-1.5 hover:shadow-md hover:border-black/20 ${directionClass}`
      }`}
    >
      {/* Top Header: Category Tag & Number */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--mute)] block mb-1">
            {item.caption}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
            {item.label}
          </h3>
        </div>

        <div className="w-12 h-12 rounded-xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center font-mono text-xs font-bold text-[var(--ink)] shrink-0 shadow-2xs">
          № {index + 1}
        </div>
      </div>

      {/* Centre Big Metric Number */}
      <div className="my-3 py-2 border-y border-[var(--line)] flex items-baseline justify-between">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--ink)] leading-none">
            {count}
          </span>
          <span className="text-2xl sm:text-3xl text-[var(--mute)] font-normal font-serif italic">
            {item.suffix}
          </span>
        </div>

        {/* Micro Visual Decorator */}
        <div className="flex items-center gap-1 opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
        </div>
      </div>

      {/* Bottom Detail Text */}
      <p className="text-xs sm:text-sm text-[var(--ink-2)] leading-relaxed mt-2">
        {item.detail}
      </p>
    </div>
  );
}
