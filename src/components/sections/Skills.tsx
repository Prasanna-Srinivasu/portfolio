"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { SKILLS, SKILL_GROUPS, SkillItem } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";
import {
  FAMILY_COLORS,
  CODE_STACKS,
} from "@/lib/skills-theme";

export function Skills() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedStack, setSelectedStack] = useState<string>("all");
  const [selectedGroup, setSelectedGroup] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS[0]);
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  // Transition hasEntered to true once the entry wave finishes
  useEffect(() => {
    if (isInView && !hasEntered) {
      const timer = setTimeout(() => {
        setHasEntered(true);
      }, 16 * 35 + 450);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasEntered]);

  // Cross-component coordination via custom window events (Hero, Work, Navigation)
  useEffect(() => {
    const handleHighlightSkill = (e: Event) => {
      const customEvent = e as CustomEvent<{ skillName?: string }>;
      const targetName = customEvent.detail?.skillName;
      if (!targetName) return;

      const found = SKILLS.find(
        (s) =>
          s.name.toLowerCase().includes(targetName.toLowerCase()) ||
          targetName.toLowerCase().includes(s.name.toLowerCase())
      );
      if (found) {
        setActiveSkill(found);
        setSelectedStack("all");
        setSelectedGroup("All");
      }
    };

    const handleHighlightStack = (e: Event) => {
      const customEvent = e as CustomEvent<{ stackId?: string }>;
      const targetStack = customEvent.detail?.stackId;
      if (!targetStack) return;

      const foundStack = CODE_STACKS.find((s) => s.id === targetStack);
      if (foundStack) {
        setSelectedStack(foundStack.id);
        setSelectedGroup("All");
        if (foundStack.skills.length > 0) {
          const firstInStack = SKILLS.find((s) =>
            foundStack.skills.includes(s.name)
          );
          if (firstInStack) setActiveSkill(firstInStack);
        }
      }
    };

    window.addEventListener("highlight-skill", handleHighlightSkill);
    window.addEventListener("highlight-stack", handleHighlightStack);

    return () => {
      window.removeEventListener("highlight-skill", handleHighlightSkill);
      window.removeEventListener("highlight-stack", handleHighlightStack);
    };
  }, []);

  const focalSkill = hoveredSkill || activeSkill;

  // Active stack or category config
  const isStackMode = selectedStack !== "all";
  const isCategoryMode = selectedGroup !== "All";

  const activeStackConfig = useMemo(() => {
    return CODE_STACKS.find((s) => s.id === selectedStack);
  }, [selectedStack]);

  // Handler for selecting a code stack filter
  const handleSelectStack = useCallback((stackId: string) => {
    setSelectedStack(stackId);
    setSelectedGroup("All");
    const stack = CODE_STACKS.find((s) => s.id === stackId);
    if (stack && stack.skills.length > 0) {
      const firstInStack = SKILLS.find((s) => stack.skills.includes(s.name));
      if (firstInStack) setActiveSkill(firstInStack);
    }
  }, []);

  // Handler for selecting a category filter
  const handleSelectGroup = useCallback((group: string) => {
    setSelectedGroup(group);
    setSelectedStack("all");
    if (group !== "All") {
      const firstInGroup = SKILLS.find((s) => s.family === group);
      if (firstInGroup) setActiveSkill(firstInGroup);
    }
  }, []);

  // Check if a skill belongs to the same code stack / shared project
  const checkIsRelated = useCallback(
    (skill: SkillItem) => {
      if (skill.number === focalSkill.number) return true;
      if (skill.family === focalSkill.family) return true;
      return skill.projects.some((proj) =>
        focalSkill.projects.some(
          (focalProj) =>
            proj.toLowerCase().includes(focalProj.toLowerCase()) ||
            focalProj.toLowerCase().includes(proj.toLowerCase())
        )
      );
    },
    [focalSkill]
  );

  // Count how many skills are currently lit / related
  const litCount = useMemo(() => {
    if (isStackMode && activeStackConfig) {
      return activeStackConfig.skills.length;
    }
    if (isCategoryMode) {
      return SKILLS.filter((s) => s.family === selectedGroup).length;
    }
    return SKILLS.filter((s) => checkIsRelated(s)).length;
  }, [isStackMode, isCategoryMode, selectedGroup, activeStackConfig, checkIsRelated]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 md:py-36 px-[var(--gutter)] max-w-[1320px] mx-auto w-full relative lazy-section"
    >
      <SectionHeader
        tagNumber="02"
        tagLabel="Technical Stack"
        titlePrimary="The periodic table of my"
        titleAccent="stack"
        subtitle="A categorized, interactive catalog of enterprise technologies, frameworks, and core computer science concepts. Select any code stack or element to coordinate and highlight related dependencies across the system in high-contrast monochrome."
      />

      {/* FILTER LEVEL 1: Code Stack Quick Selectors (Pure Black & White) */}
      <div className="mb-4 rv-soft" style={{ "--i": 0 } as React.CSSProperties}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--ink)]" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--mute)]">
              Filter by Production Code Stack
            </span>
          </div>
          <span className="font-mono text-[11px] text-[var(--mute)]">
            {isStackMode && activeStackConfig
              ? `${activeStackConfig.name} (${activeStackConfig.skills.length} skills active)`
              : isCategoryMode
              ? `${selectedGroup} Family (${litCount} skills active)`
              : `Inspecting ${focalSkill.name} (${litCount} related dependencies)`}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-1">
          {CODE_STACKS.map((stack) => {
            const isSelected = selectedStack === stack.id;
            return (
              <button
                key={stack.id}
                onClick={() => handleSelectStack(stack.id)}
                className={`group relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? "bg-[var(--ink)] text-white font-semibold shadow-sm border border-[var(--ink)]"
                    : "bg-[var(--paper)] text-[var(--ink-2)] hover:border-[var(--ink)] border border-[var(--line)] shadow-2xs hover:shadow-xs"
                }`}
                title={stack.description}
                aria-pressed={isSelected}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-white" : "bg-[var(--ink)]"
                  }`}
                />
                <span>{stack.shortLabel}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-sans transition-colors ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[var(--soft)] text-[var(--mute)]"
                  }`}
                >
                  {stack.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTER LEVEL 2: Category Family Chips (Pure Black & White) */}
      <div
        className="flex flex-wrap items-center gap-1.5 mb-8 pb-4 border-b border-[var(--line)] overflow-x-auto rv-soft"
        style={{ "--i": 1 } as React.CSSProperties}
      >
        <span className="font-mono text-[10px] uppercase text-[var(--mute)] mr-2 shrink-0">
          Categories:
        </span>
        {SKILL_GROUPS.map((group) => {
          const isSelected = selectedGroup === group;

          return (
            <button
              key={group}
              onClick={() => handleSelectGroup(group)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-[var(--ink)] text-white font-semibold shadow-sm border border-[var(--ink)]"
                  : "bg-[var(--paper)] text-[var(--mute)] hover:text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)]"
              }`}
              aria-pressed={isSelected}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isSelected ? "bg-white" : "bg-[var(--ink)]"
                }`}
              />
              <span>{group}</span>
            </button>
          );
        })}
      </div>

      {/* Layout: Periodic Table Grid (left/center) + Sticky Inspector (right) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        {/* The Grid: 8 columns desktop, 6 md, 4 sm, 3 mobile */}
        <div className="flex-1 w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-2.5 lg:gap-3">
          {SKILLS.map((skill, index) => {
            const isFocal = focalSkill.number === skill.number;

            // Highlight determination
            let isHighlighted = false;

            if (isFocal) {
              isHighlighted = true;
            } else if (isStackMode && activeStackConfig) {
              isHighlighted = activeStackConfig.skills.includes(skill.name);
            } else if (isCategoryMode) {
              isHighlighted = skill.family === selectedGroup;
            } else {
              const isSameFamily = skill.family === focalSkill.family;
              const isSameProject = skill.projects.some((p) =>
                focalSkill.projects.some(
                  (fp) =>
                    p.toLowerCase().includes(fp.toLowerCase()) ||
                    fp.toLowerCase().includes(p.toLowerCase())
                )
              );
              isHighlighted = isSameFamily || isSameProject;
            }

            // Diagonal wave delay for initial scroll reveal
            const cols = 8;
            const row = Math.floor(index / cols);
            const col = index % cols;
            const delayMs = (row + col) * 30;

            const tileStyle: React.CSSProperties = {
              transition:
                "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              transitionDelay: !hasEntered && isInView ? `${delayMs}ms` : "0ms",
            };

            if (!isInView && !hasEntered) {
              tileStyle.opacity = 0;
              tileStyle.transform = "translate3d(0, 16px, 0) scale(0.96)";
              tileStyle.pointerEvents = "none";
            } else if (isFocal) {
              tileStyle.backgroundColor = "var(--ink)";
              tileStyle.borderColor = "var(--ink)";
              tileStyle.boxShadow = "0 8px 24px -4px rgba(0, 0, 0, 0.25)";
              tileStyle.transform = "translate3d(0, -3px, 0) scale(1.05)";
              tileStyle.zIndex = 30;
              tileStyle.opacity = 1;
            } else if (isHighlighted) {
              tileStyle.backgroundColor = "rgba(0, 0, 0, 0.05)";
              tileStyle.borderColor = "var(--ink)";
              tileStyle.boxShadow = "0 2px 10px -2px rgba(0, 0, 0, 0.08)";
              tileStyle.opacity = 1;
              tileStyle.transform = "translate3d(0, 0, 0) scale(1)";
            } else {
              tileStyle.backgroundColor = "var(--card)";
              tileStyle.borderColor = "var(--line)";
              tileStyle.opacity = 0.25;
              tileStyle.filter = "grayscale(100%)";
              tileStyle.transform = "translate3d(0, 0, 0) scale(0.98)";
            }

            return (
              <button
                key={skill.number}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                onFocus={() => setActiveSkill(skill)}
                onClick={() => setActiveSkill(skill)}
                className="group relative p-2 sm:p-2.5 rounded-xl border text-left flex flex-col justify-between aspect-square cursor-pointer focus-visible:outline-none select-none"
                style={tileStyle}
                aria-label={`${skill.name} (${skill.family})`}
              >
                {/* Top: Atomic Number & Indicator */}
                <div className="flex items-center justify-between w-full pointer-events-none">
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] font-semibold transition-colors duration-200 ${
                      isFocal
                        ? "text-white"
                        : isHighlighted
                        ? "text-[var(--ink)]"
                        : "text-[var(--mute)]"
                    }`}
                  >
                    {String(skill.number).padStart(2, "0")}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                      isFocal
                        ? "bg-white"
                        : isHighlighted
                        ? "bg-[var(--ink)]"
                        : "bg-[var(--line)]"
                    }`}
                  />
                </div>

                {/* Center: 2-Letter Symbol */}
                <div className="my-auto text-center w-full pointer-events-none">
                  <span
                    className={`font-serif italic text-xl sm:text-2xl md:text-3xl font-bold tracking-tight block transition-colors duration-200 ${
                      isFocal
                        ? "text-white"
                        : isHighlighted
                        ? "text-[var(--ink)]"
                        : "text-[var(--ink)]"
                    }`}
                  >
                    {skill.symbol}
                  </span>
                </div>

                {/* Bottom: Skill Name */}
                <div className="w-full truncate text-center pointer-events-none">
                  <span
                    className={`font-mono text-[8px] sm:text-[9px] md:text-[10px] truncate block leading-tight font-medium transition-colors duration-200 ${
                      isFocal
                        ? "text-white font-bold"
                        : isHighlighted
                        ? "text-[var(--ink)] font-semibold"
                        : "text-[var(--mute)]"
                    }`}
                  >
                    {skill.name}
                  </span>
                </div>

                {/* Active Tag */}
                {isFocal && (
                  <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-full font-mono text-[7px] font-bold uppercase tracking-wider bg-white text-[var(--ink)] border border-[var(--ink)] shadow-xs">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Inspector Panel: Sticky on the right (Pure Black & White) */}
        <aside
          className="w-full lg:w-[320px] lg:sticky lg:top-28 card-surface p-6 sm:p-7 flex flex-col justify-between border border-[var(--line)] bg-[var(--card)] shadow-lg transition-all duration-300 overflow-hidden relative rv-soft"
          aria-live="polite"
        >
          {/* Top Black Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-[var(--ink)]" />

          <div>
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--ink)]" />
                <span className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider">
                  Element Inspector
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[var(--ink)]">
                № {String(focalSkill.number).padStart(2, "0")}
              </span>
            </div>

            {/* 140px Logo Card */}
            <div className="relative w-[140px] h-[140px] mx-auto my-3 flex items-center justify-center p-4 rounded-2xl border border-[var(--line)] bg-[var(--paper)] shadow-inner group overflow-hidden">
              <div
                key={focalSkill.name}
                className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              >
                <TechLogo
                  name={focalSkill.name}
                  brandKey={focalSkill.brandKey}
                  size={90}
                />
              </div>
            </div>

            {/* Skill Title & Family Chip */}
            <div className="text-center mt-5">
              <button
                onClick={() => handleSelectGroup(focalSkill.family)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider mb-2 font-semibold transition-all duration-200 hover:scale-105 cursor-pointer bg-[var(--ink)] text-white border border-[var(--ink)]"
                title={`Filter by ${focalSkill.family} family`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>{focalSkill.family}</span>
              </button>

              <h4 className="text-2xl font-bold text-[var(--ink)] tracking-tight">
                {focalSkill.name}
              </h4>
              <p className="font-serif italic text-sm text-[var(--mute)] mt-0.5">
                Symbol: {focalSkill.symbol} · Element #{focalSkill.number}
              </p>
            </div>

            {/* Projects & Deliverables Linked */}
            <div className="mt-6 pt-5 border-t border-[var(--line)]">
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)]">
                  Proven In Production
                </span>
                <span className="font-mono text-[10px] text-[var(--ink)] font-bold">
                  {focalSkill.projects.length} References
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {focalSkill.projects.map((proj, idx) => {
                  const isShopperProj = proj.toLowerCase().includes("shopper");
                  const isFoodieGoProj = proj.toLowerCase().includes("foodiego");
                  const isHclProj = proj.toLowerCase().includes("hcl");

                  const matchingStackId = isShopperProj
                    ? "shopper"
                    : isFoodieGoProj
                    ? "foodiego"
                    : isHclProj
                    ? "hcl"
                    : null;

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (matchingStackId) {
                          handleSelectStack(matchingStackId);
                        }
                      }}
                      className={`font-mono text-xs px-2.5 py-1 rounded-md text-[var(--ink)] border transition-all duration-200 text-left cursor-pointer ${
                        matchingStackId
                          ? "hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white bg-[var(--paper)] border-[var(--line)]"
                          : "bg-[var(--paper)] border-[var(--line)] cursor-default"
                      }`}
                      title={matchingStackId ? `Filter entire ${proj} stack` : undefined}
                    >
                      <span>{proj}</span>
                      {matchingStackId && <span className="ml-1 opacity-60">↗</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coordinated Highlighting Status */}
            <div className="mt-5 pt-4 border-t border-[var(--line)] bg-[var(--soft)]/50 -mx-6 -mb-6 p-4 rounded-b-[26px]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-2)]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--ink)] animate-pulse" />
                  <span>Coordinated Stack Items</span>
                </span>
                <span className="font-bold">{litCount} Lit</span>
              </div>
              <p className="text-[10px] text-[var(--mute)] mt-1 leading-snug">
                {isStackMode && activeStackConfig
                  ? `Active Stack: ${activeStackConfig.name} — All ${activeStackConfig.skills.length} components highlighted.`
                  : isCategoryMode
                  ? `${selectedGroup} Family: All ${litCount} items illuminated.`
                  : "All dependent frameworks and shared stack services coordinate in sync across the table."}
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Monochrome Stack & Category Legend */}
      <div
        className="mt-12 pt-6 border-t border-[var(--line)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono text-[var(--mute)] rv-soft"
        style={{ "--i": 2 } as React.CSSProperties}
      >
        <div className="flex items-center gap-2">
          <span className="uppercase text-[10px] tracking-wider text-[var(--ink)] font-bold">
            Monochrome Stack Legend:
          </span>
        </div>

        {/* Code Stacks Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase text-[var(--mute)]">Stacks:</span>
          {CODE_STACKS.filter((s) => s.id !== "all").map((stack) => (
            <button
              key={stack.id}
              onClick={() => handleSelectStack(stack.id)}
              className="inline-flex items-center gap-1.5 text-[11px] text-[var(--mute)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--ink)]" />
              <span>{stack.shortLabel}</span>
            </button>
          ))}
        </div>

        {/* Skill Families Indicators */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase text-[var(--mute)]">Families:</span>
          {Object.entries(FAMILY_COLORS).map(([family]) => (
            <button
              key={family}
              onClick={() => handleSelectGroup(family)}
              className="inline-flex items-center gap-1.5 text-[11px] text-[var(--mute)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
              <span>{family}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
