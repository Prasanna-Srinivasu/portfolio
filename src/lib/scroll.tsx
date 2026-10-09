"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./hooks";

interface ScrollContextValue {
  lenis: Lenis | null;
  scrollToTarget: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => void;
  highlightSkill: (skillName: string) => void;
  highlightStack: (stackId: string) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  scrollToTarget: () => {},
  highlightSkill: () => {},
  highlightStack: () => {},
});

export const useScroll = () => useContext(ScrollContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      return;
    }

    // Configure butter-smooth Lenis with natural momentum and responsive wheel control
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Add lenis class to root for CSS synchronization
    document.documentElement.classList.add("lenis", "lenis-smooth");

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReduced]);

  const scrollToTarget = (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -30,
        duration: options?.duration ?? 1.2,
      });
    } else {
      if (typeof target === "number") {
        window.scrollTo({
          top: target,
          behavior: prefersReduced ? "auto" : "smooth",
        });
      } else {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (el) {
          el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
        }
      }
    }
  };

  const highlightSkill = (skillName: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio:highlight-skill", { detail: { skillName } })
      );
    }
  };

  const highlightStack = (stackId: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio:highlight-stack", { detail: { stackId } })
      );
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        lenis: lenisRef.current,
        scrollToTarget,
        highlightSkill,
        highlightStack,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
