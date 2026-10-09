"use client";

import React, { useState, useEffect } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollToTarget } = useScroll();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Keyboard escape closes mobile menu & locks body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      scrollToTarget(el, { offset: -30 });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* 2px Ink Scroll Progress Bar at the very top */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ink)] z-50 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Nav Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4 sm:py-6 px-[var(--gutter)] flex items-center justify-between pointer-events-none`}
      >
        {/* Left Initials Mark & Full Name */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={() => scrollToTarget(0)}
            className="group flex items-center gap-3 text-left focus-visible:outline-none"
            aria-label="Back to top"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 group-hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[var(--ink)] text-[var(--paper)] border border-transparent shadow-sm"
                  : "bg-transparent text-[var(--ink)] border border-[var(--ink)]"
              }`}
            >
              LP
            </div>
            <div
              className={`flex flex-col transition-opacity duration-300 ${
                scrolled ? "opacity-0 pointer-events-none w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              <span className="text-sm font-semibold tracking-tight text-[var(--ink)]">
                {PROFILE.name}
              </span>
              <span className="font-mono text-[10px] text-[var(--mute)]">
                {PROFILE.role}
              </span>
            </div>
          </button>
        </div>

        {/* Center / Right: Desktop Pill of nav links */}
        <nav
          className={`hidden md:flex items-center gap-1 p-1.5 rounded-full pointer-events-auto transition-all duration-300 ${
            scrolled
              ? "bg-[rgba(255,255,255,0.75)] backdrop-blur-md shadow-sm border border-[var(--line)]"
              : "bg-transparent"
          }`}
          aria-label="Primary navigation"
        >
          {NAV.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-medium tracking-tight transition-colors duration-300 z-10 ${
                  isActive ? "text-[var(--paper)]" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                }`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 bg-[var(--ink)] rounded-full -z-10 transition-all duration-300"
                    style={{
                      boxShadow: "0 2px 8px rgba(13, 13, 13, 0.15)",
                    }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile: "Menu" Pill */}
        <div className="md:hidden pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--line)] shadow-sm text-xs font-semibold tracking-wide uppercase font-mono text-[var(--ink)] active:scale-95 transition-transform"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[var(--paper)] flex flex-col justify-between p-8 transition-all duration-500 ease-out md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "opacity-0 pointer-events-none [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--mute)]">00 — NAVIGATION</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-sm font-semibold active:scale-95"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="group flex items-baseline gap-4 text-left transition-transform active:translate-x-2"
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
            >
              <span className="font-mono text-xs text-[var(--mute)]">
                {item.number}
              </span>
              <span className="text-3xl font-bold tracking-tight text-[var(--ink)] group-hover:text-[var(--ink-2)]">
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="border-t border-[var(--line)] pt-6 flex justify-between items-center text-xs text-[var(--mute)] font-mono">
          <span>{PROFILE.location}</span>
          <a
            href={PROFILE.resumePath}
            download
            className="text-[var(--ink)] font-semibold underline underline-offset-2"
          >
            Download Résumé ↓
          </a>
        </div>
      </div>
    </>
  );
}
