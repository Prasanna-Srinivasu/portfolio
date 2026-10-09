"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

interface Chapter {
  id: string;
  label: string;
  shortLabel: string;
  time: number;
  caption: string;
}

const CHAPTERS: Chapter[] = [
  { id: "intro", label: "01 · Intro", shortLabel: "Intro", time: 0.0, caption: "“Hi, I'm Prasanna.”" },
  { id: "experience", label: "02 · Experience", shortLabel: "Experience", time: 2.2, caption: "“Java Full Stack Developer with 3 years at HCL Technologies.”" },
  { id: "tech", label: "03 · Tech Core", shortLabel: "Tech Core", time: 6.0, caption: "“Specializing in Java, Spring Boot, Microservices & React.js.”" },
];

const HERO_STACK_SCROLL = [
  "Java 17",
  "Spring Boot",
  "Microservices",
  "React.js",
  "MySQL",
  "REST APIs",
  "JWT Auth",
  "GenAI (ChatGPT · Copilot)",
  "Maven & Git",
  "JUnit 5",
];

const SCROLLING_SKILLS_PILLS = [
  { name: "Java 17", badge: "Core & OOP", target: "#skills" },
  { name: "Spring Boot", badge: "Microservices", target: "#work" },
  { name: "Microservices", badge: "Architecture", target: "#work" },
  { name: "React.js", badge: "Frontend SPA", target: "#work" },
  { name: "MySQL", badge: "Queries & RDBMS", target: "#skills" },
  { name: "REST APIs", badge: "API Design", target: "#skills" },
  { name: "JWT Auth", badge: "Security", target: "#skills" },
  { name: "GenAI", badge: "ChatGPT & Copilot", target: "#skills" },
  { name: "JUnit 5", badge: "Unit Tests", target: "#skills" },
  { name: "Maven & Git", badge: "DevOps & CI", target: "#skills" },
  { name: "Postman", badge: "API Testing", target: "#skills" },
  { name: "JavaScript ES6+", badge: "Modern JS", target: "#skills" },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25>(1);
  const [showCenterAction, setShowCenterAction] = useState<"play" | "pause" | null>(null);

  // 3D Magnetic Tilt State
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });

  const { scrollToTarget, highlightSkill, highlightStack } = useScroll();

  // Video Autoplay & IntersectionObserver pause/resume
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryAutoplay = async () => {
      try {
        video.muted = false;
        await video.play();
        setIsMuted(false);
        setIsPlaying(true);
      } catch {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    };

    tryAutoplay();

    const unlockSound = () => {
      if (!hasInteracted && video) {
        setHasInteracted(true);
        video.muted = false;
        setIsMuted(false);
      }
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("keydown", unlockSound, { once: true });
    window.addEventListener("touchend", unlockSound, { once: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.intersectionRatio < 0.35) {
          video.pause();
          setIsPlaying(false);
        } else {
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      },
      { threshold: [0, 0.35, 1.0] }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };
  }, [hasInteracted]);

  // Track video playback time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  // Sound toggle
  const toggleSound = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      setHasInteracted(true);
      if (video.paused) {
        video.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, []);

  // Play/Pause toggle on card click
  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
      setShowCenterAction("play");
    } else {
      video.pause();
      setIsPlaying(false);
      setShowCenterAction("pause");
    }

    setTimeout(() => {
      setShowCenterAction(null);
    }, 550);
  }, []);

  // Seek to chapter
  const seekToChapter = useCallback((time: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setCurrentTime(time);
    if (video.paused) {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  // Speed toggle (1x <-> 1.25x)
  const toggleSpeed = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const newSpeed = playbackSpeed === 1 ? 1.25 : 1;
    video.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  }, [playbackSpeed]);

  // 3D Magnetic tilt physics on mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    const rotateX = -normY * 4;
    const rotateY = normX * 4;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY, isHovered: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovered: false });
  }, []);

  // Current active chapter
  const currentChapter = CHAPTERS.slice().reverse().find((c) => currentTime >= c.time) || CHAPTERS[0];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[95svh] lg:min-h-screen w-full flex flex-col justify-between items-center pt-24 pb-8 overflow-hidden bg-[var(--paper)] select-none"
    >
      {/* Background Architectural Ghost Watermark (low opacity 0.035, positioned low across waist so it never creates angel wings) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-extrabold text-[clamp(5rem,16vw,17rem)] tracking-[0.08em] text-[#000000] opacity-[0.035] select-none translate-y-6">
          PRASANNA
        </span>
      </div>

      {/* Top Floating Chapter Bar */}
      <div
        className="relative z-20 flex items-center gap-1.5 p-1 rounded-full bg-white/90 backdrop-blur-md border border-[var(--line)] shadow-2xs mt-1 rv-soft"
        style={{ "--i": 0 } as React.CSSProperties}
      >
        {CHAPTERS.map((chap) => {
          const isActive = currentChapter.id === chap.id;
          return (
            <button
              key={chap.id}
              onClick={(e) => seekToChapter(chap.time, e)}
              role="tab"
              aria-selected={isActive}
              className={`relative px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${
                isActive
                  ? "bg-[var(--ink)] text-[#ffffff] font-semibold shadow-xs"
                  : "text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-black/5"
              }`}
            >
              <span>{chap.label}</span>
            </button>
          );
        })}
      </div>

      {/* Center: The Seamless Presenter Video (No border box, no container card, 100% seamless canvas) */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto px-4">
        <div
          onClick={togglePlayPause}
          className="relative flex items-center justify-center cursor-pointer group"
          role="region"
          aria-label="Presenter video. Tap to play or pause."
        >
          <video
            ref={videoRef}
            loop
            playsInline
            muted={isMuted}
            preload="auto"
            className="h-[clamp(420px,68svh,740px)] w-auto object-contain pointer-events-auto mix-blend-multiply"
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>

          {/* Floating Minimalist Audio Pill under Presenter */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[var(--line)] shadow-sm hover:border-[var(--ink)] text-[11px] font-mono text-[var(--ink)] flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
            >
              {!isMuted ? (
                <>
                  <div className="flex items-end gap-0.5 h-3 w-3 shrink-0" aria-hidden="true">
                    <span className="w-0.5 bg-[var(--ink)] rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                    <span className="w-0.5 bg-[var(--ink)] rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1.5" />
                    <span className="w-0.5 bg-[var(--ink)] rounded-full animate-[pulse_0.4s_ease-in-out_infinite] h-3" />
                  </div>
                  <span className="font-medium truncate max-w-[200px]">{currentChapter.caption}</span>
                </>
              ) : (
                <>
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ink)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ink)]"></span>
                  </span>
                  <span>Tap for speech</span>
                </>
              )}
            </button>

            <button
              onClick={toggleSpeed}
              className="h-[30px] px-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[var(--line)] shadow-sm text-[10px] font-mono font-bold text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
              aria-label="Toggle playback speed"
            >
              {playbackSpeed}×
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Skills Ribbon across Hero */}
      <div
        className="relative z-20 w-full overflow-hidden py-2 border-y border-[var(--line)]/50 bg-white/60 backdrop-blur-[2px] mt-auto mb-2 rv-soft"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--paper)] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--paper)] to-transparent z-10" />
        <div className="flex overflow-hidden">
          <div className="flex items-center gap-2.5 animate-marquee whitespace-nowrap">
            {SCROLLING_SKILLS_PILLS.concat(SCROLLING_SKILLS_PILLS).map((s, idx) => (
              <button
                key={`${s.name}-${idx}`}
                onClick={() => {
                  scrollToTarget(s.target);
                  highlightSkill(s.name);
                }}
                className="group inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white text-[11px] font-mono text-[var(--ink-2)] transition-all shadow-2xs hover:scale-105 active:scale-95"
                title={`Explore ${s.name}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--faint)] group-hover:bg-white transition-colors" />
                <span className="font-medium">{s.name}</span>
                <span className="text-[9px] opacity-60 font-sans tracking-tight">({s.badge})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Left Headline & Right CTA Cluster (Matching sample video 1:1) */}
      <div className="relative z-20 w-full max-w-[1320px] mx-auto px-[var(--gutter)] flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-1 pb-2">
        {/* Left Headline */}
        <div className="max-w-xl rv-soft" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--mute)] block mb-1">
            LAKSHMI PRASANNA MANTHENA
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[var(--ink)] leading-[1.05] mb-2">
            Java Full Stack<br />Developer.
          </h1>
          <p className="text-xs sm:text-sm text-[var(--ink-2)] font-mono">
            {PROFILE.subtitle}
          </p>
        </div>

        {/* Right CTA Buttons Cluster */}
        <div
          className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 shrink-0 self-stretch sm:self-auto rv-soft"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          {/* Hero Button: Scrolling Skills Ticker Button */}
          <button
            onClick={() => {
              scrollToTarget("#skills");
              highlightStack("shopper");
            }}
            className="group relative flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[var(--line)] hover:border-[var(--ink)] shadow-2xs hover:shadow-md transition-all duration-300 w-full sm:w-auto overflow-hidden text-left cursor-pointer"
            aria-label="View core technical skills"
          >
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold tracking-wider text-[var(--ink)] shrink-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span>Stack</span>
            </div>
            <span className="h-3 w-[1px] bg-[var(--line)] shrink-0" />
            <div className="relative overflow-hidden w-[160px] sm:w-[210px] h-5 flex items-center">
              <div className="flex items-center gap-2.5 animate-marquee-fast whitespace-nowrap text-[11px] font-mono text-[var(--ink-2)] group-hover:text-[var(--ink)]">
                {HERO_STACK_SCROLL.concat(HERO_STACK_SCROLL).map((skill, i) => (
                  <span key={i} className="inline-flex items-center gap-2">
                    <span className="font-medium">{skill}</span>
                    <span className="text-[var(--faint)] text-[8px]">✦</span>
                  </span>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-[var(--mute)] group-hover:text-[var(--ink)] group-hover:translate-x-0.5 transition-transform shrink-0">
              ↓
            </span>
          </button>

          <button
            onClick={() => scrollToTarget("#work")}
            className="btn-pill btn-primary text-xs w-full sm:w-auto justify-center"
          >
            Explore work →
          </button>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => scrollToTarget("#contact")}
              className="btn-pill btn-secondary text-xs flex-1 sm:flex-none justify-center"
            >
              Let&apos;s talk
            </button>
            <a
              href={PROFILE.resumePath}
              download
              className="btn-pill btn-secondary text-xs flex-1 sm:flex-none justify-center"
            >
              <span>Résumé</span>
              <span className="font-mono text-xs">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
