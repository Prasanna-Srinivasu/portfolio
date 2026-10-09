"use client";

import React, { useEffect } from "react";
import { Navigation } from "./Navigation";
import { Hero } from "./hero/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Work } from "./sections/Work";
import { Certifications } from "./sections/Certifications";
import { Experience } from "./sections/Experience";
import { Achievements } from "./sections/Achievements";
import { Contact } from "./sections/Contact";
import { CustomCursor } from "./ui/CustomCursor";

const REVEAL_SELECTOR =
  ".rv, .rv-soft, .rv-slide-left, .rv-slide-right, .rv-scale, .rv-from-left, .rv-from-right, .rv-from-bottom, .rv-from-top, .rv-settle";

export function App() {
  // Universal Scroll-Reveal Observer for Widget Tree Items
  useEffect(() => {
    const observedElements = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: "0px 0px 60px 0px",
      }
    );

    const observeAll = () => {
      const elements = document.querySelectorAll(REVEAL_SELECTOR);
      elements.forEach((el) => {
        if (!observedElements.has(el) && !el.classList.contains("is-in")) {
          observedElements.add(el);
          observer.observe(el);
        }
      });
    };

    // Initial sweep
    observeAll();

    // Watch for dynamically added DOM elements (tab switches, carousels, accordion toggles, class changes)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <main className="relative w-full overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Certifications />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
