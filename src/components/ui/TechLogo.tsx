"use client";

import React from "react";
import Image from "next/image";

export const BRAND_MAP: Record<string, { src: string; glow: string; name: string }> = {
  java: { src: "/logos/java.svg", glow: "transparent", name: "Java" },
  javascript: { src: "/logos/javascript.svg", glow: "transparent", name: "JavaScript" },
  react: { src: "/logos/react.svg", glow: "transparent", name: "React" },
  angular: { src: "/logos/angular.svg", glow: "transparent", name: "Angular" },
  html5: { src: "/logos/html5.svg", glow: "transparent", name: "HTML5" },
  css3: { src: "/logos/css3.svg", glow: "transparent", name: "CSS3" },
  bootstrap: { src: "/logos/bootstrap.svg", glow: "transparent", name: "Bootstrap" },
  tailwindcss: { src: "/logos/tailwindcss.svg", glow: "transparent", name: "Tailwind CSS" },
  spring: { src: "/logos/spring.svg", glow: "transparent", name: "Spring Boot" },
  mysql: { src: "/logos/mysql.svg", glow: "transparent", name: "MySQL" },
  git: { src: "/logos/git.svg", glow: "transparent", name: "Git" },
  github: { src: "/logos/github.svg", glow: "transparent", name: "GitHub" },
  postman: { src: "/logos/postman.svg", glow: "transparent", name: "Postman" },
  intellij: { src: "/logos/intellij.svg", glow: "transparent", name: "IntelliJ IDEA" },
  eclipse: { src: "/logos/eclipse.svg", glow: "transparent", name: "Eclipse" },
  maven: { src: "/logos/maven.svg", glow: "transparent", name: "Maven" },
  docker: { src: "/logos/docker.svg", glow: "transparent", name: "Docker" },
  netlify: { src: "/logos/netlify.svg", glow: "transparent", name: "Netlify" },
  chatgpt: { src: "/logos/chatgpt.svg", glow: "transparent", name: "ChatGPT" },
  copilot: { src: "/logos/copilot.svg", glow: "transparent", name: "GitHub Copilot" },
  jwt: { src: "/logos/jwt.svg", glow: "transparent", name: "JWT" },
  junit: { src: "/logos/junit.svg", glow: "transparent", name: "JUnit" },
};

export const CONCEPT_MAP: Record<string, { label: string; icon: React.ReactNode }> = {
  "REST APIs": {
    label: "REST APIs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M4 7h16M4 12h16M4 17h16M7 4v6M17 14v6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Microservices": {
    label: "Microservices",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <rect x="2" y="3" width="7" height="7" rx="1.5" />
        <rect x="15" y="3" width="7" height="7" rx="1.5" />
        <rect x="2" y="14" width="7" height="7" rx="1.5" />
        <rect x="15" y="14" width="7" height="7" rx="1.5" />
        <path d="M9 6.5h6M9 17.5h6M5.5 10v4M18.5 10v4" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
  },
  "OOP Design": {
    label: "OOP Design",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="12" cy="5" r="3" />
        <circle cx="6" cy="19" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M12 8v4M12 12l-5 4M12 12l5 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Data Structures": {
    label: "Data Structures",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M4 5h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM4 11h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1zM4 17h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2a1 1 0 011-1z" strokeLinecap="round" />
      </svg>
    ),
  },
  "Algorithm Design": {
    label: "Algorithm Design",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M3 12h4l3 8 4-16 3 8h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Problem Solving": {
    label: "Problem Solving",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
      </svg>
    ),
  },
  "Complexity Analysis": {
    label: "Complexity Analysis",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M4 19h16M4 19V5M4 19c4-1 8-6 10-10 2-4 3-4 6-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Communication": {
    label: "Communication",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Adaptability": {
    label: "Adaptability",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.19" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Passion for Learning": {
    label: "Passion for Learning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Agile Collaboration": {
    label: "Agile Collaboration",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "Process Optimization": {
    label: "Process Optimization",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
};

export function isBrand(key?: string): boolean {
  return !!key && key in BRAND_MAP;
}

interface TechLogoProps {
  name: string;
  brandKey?: string;
  size?: number;
  className?: string;
}

export function TechLogo({ name, brandKey, size = 40, className = "" }: TechLogoProps) {
  const brand = brandKey ? BRAND_MAP[brandKey] : undefined;

  if (brand) {
    return (
      <div
        className={`relative flex items-center justify-center transition-transform ${className}`}
        style={{ width: size, height: size }}
      >
        <div
          className="absolute inset-0 rounded-full blur-md opacity-40 transition-opacity"
          style={{ background: brand.glow }}
        />
        <Image
          src={brand.src}
          alt={brand.name}
          width={size}
          height={size}
          className="relative z-10 w-full h-full object-contain"
          unoptimized
          loading="lazy"
        />
      </div>
    );
  }

  const concept = CONCEPT_MAP[name] || CONCEPT_MAP[Object.keys(CONCEPT_MAP).find(k => name.includes(k)) || ""];

  if (concept) {
    return (
      <div
        className={`relative flex items-center justify-center text-[var(--ink-2)] ${className}`}
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full p-1 opacity-80">{concept.icon}</div>
      </div>
    );
  }

  // Fallback mono symbol
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper)] font-mono text-xs font-semibold text-[var(--ink-2)] ${className}`}
      style={{ width: size, height: size }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
