"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function CustomCursor() {
  const prefersReduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop pointer devices with fine pointer
    if (prefersReduced) return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "button, a, [role='button'], input, textarea, video, .card-surface, .interactive-hover"
      );

      if (interactive) {
        setIsHovered(true);
        const label = interactive.getAttribute("data-cursor-label");
        setHoverLabel(label || null);
      } else {
        setIsHovered(false);
        setHoverLabel(null);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Spring interpolation loop for smooth trailing follower
    let animId: number;
    const loop = () => {
      // Direct dot positioning
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Smooth lerp for trailing ring
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [prefersReduced, isVisible]);

  if (!enabled || prefersReduced) return null;

  return (
    <>
      {/* Precision Micro Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--ink)] pointer-events-none z-50 -ml-1 -mt-1 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${isHovered ? "scale-0 opacity-0" : "scale-100"}`}
        style={{ willChange: "transform" }}
        aria-hidden="true"
      />

      {/* Trailing Inertial Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full transition-all duration-300 ease-out flex items-center justify-center font-mono text-[9px] uppercase tracking-wider ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? "w-11 h-11 -ml-[22px] -mt-[22px] bg-black/10 backdrop-blur-xs border border-black/25 text-[var(--ink)] font-bold shadow-xs scale-110"
            : "w-8 h-8 -ml-4 -mt-4 border border-black/25 bg-transparent"
        } ${isClicking ? "scale-90" : ""}`}
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        {hoverLabel && <span className="animate-in fade-in duration-150">{hoverLabel}</span>}
      </div>
    </>
  );
}
