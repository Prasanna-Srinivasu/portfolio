"use client";

import { PROJECTS } from "@/lib/data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechLogo } from "@/components/ui/TechLogo";
import { useInView } from "@/lib/hooks";
import { useScroll } from "@/lib/scroll";

export function Work() {
  const [sectionRef] = useInView<HTMLElement>({ threshold: 0.1 });
  const { scrollToTarget, highlightSkill, highlightStack } = useScroll();

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-24 md:py-36 px-[var(--gutter)] max-w-[1320px] mx-auto w-full relative lazy-section"
    >
      <SectionHeader
        tagNumber="03"
        tagLabel="Personal Projects"
        titlePrimary="Personal"
        titleAccent="projects"
        subtitle="Independent, production-ready full-stack applications engineered with Java, Spring Boot, Microservices, React.js, and MySQL. Both applications built and deployed independently."
      />

      {/* Grid: Both Personal Projects prominently visible & interactive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {PROJECTS.map((project, pIdx) => {
          return (
            <div
              key={project.id}
              style={{ "--i": pIdx } as React.CSSProperties}
              className="card-surface p-7 sm:p-10 flex flex-col justify-between border border-[var(--line)] bg-[var(--card)] hover:border-black/30 transition-all duration-300 shadow-sm hover:shadow-md rv-soft"
            >
              <div>
                {/* Header: Project Index, Kicker, Subtitle */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-[var(--ink)]">
                    {project.index}
                  </span>
                  <span className="text-[var(--line)]">/</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--paper)] text-[var(--ink)] border border-[var(--line)] font-mono text-[10px] uppercase tracking-wider font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
                    <span>Personal Project</span>
                  </span>
                  <span className="text-[var(--line)]">/</span>
                  <span className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider">
                    {project.kicker.replace("Personal Project · ", "")}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-4">
                  {project.title}
                </h3>

                <p className="text-sm text-[var(--ink-2)] leading-relaxed mb-6 text-justify">
                  {project.description}
                </p>

                {/* Key Deliverables Bullet Points */}
                <div className="mb-6">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--mute)] block mb-3">
                    Key Deliverables
                  </span>
                  <ul className="space-y-2 text-xs text-[var(--ink-2)]">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--ink)] font-mono font-bold">▸</span>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interactive Tech Chips (Black & White) */}
                <div className="mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--mute)] block mb-2">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          scrollToTarget("#skills");
                          highlightSkill(t);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white text-xs font-mono border border-[var(--line)] transition-all cursor-pointer shadow-2xs hover:scale-105"
                        title={`Inspect ${t} in Periodic Table`}
                      >
                        <TechLogo name={t} size={14} />
                        <span>{t}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Illustrative Mini-UI Console / Pipeline */}
                <div className="mb-8">
                  <IllustrativeUi type={project.illustrativeType} />
                </div>
              </div>

              {/* Action Buttons: Inspect Stack, GitHub, Live Demo */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[var(--line)]">
                <button
                  onClick={() => {
                    scrollToTarget("#skills");
                    highlightStack(project.id);
                  }}
                  className="btn-pill btn-secondary text-xs cursor-pointer flex items-center gap-1.5 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition-colors"
                  title={`Inspect full ${project.title} stack in Periodic Table`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--ink)]" />
                  <span>Inspect Stack</span>
                  <span className="font-mono text-xs">⚡</span>
                </button>

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-primary text-xs"
                  >
                    <span>View on GitHub</span>
                    <span className="font-mono text-xs">↗</span>
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-secondary text-xs border-[var(--ink)]"
                  >
                    <span>Live Demo</span>
                    <span className="font-mono text-xs">↗</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Illustrative Mini-UI Component (Strict Monochrome Black & White)
function IllustrativeUi({
  type,
}: {
  type: "ecommerce-microservices" | "food-delivery-spa";
}) {
  return (
    <div className="w-full rounded-2xl bg-[var(--paper)] border border-[var(--line)] p-5 relative overflow-hidden select-none">
      {/* Top Banner Disclaimer */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--line)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--ink)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--faint)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
          </div>
          <span className="font-mono text-[10px] text-[var(--mute)]">
            system-preview://localhost
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-[var(--soft)] text-[var(--ink)] border border-[var(--line)] font-semibold">
          Personal Project Architecture
        </span>
      </div>

      {type === "ecommerce-microservices" ? (
        // Shopper Microservices Topology & REST Endpoint Console
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {[
              { name: "Product Service", port: ":8081", status: "HEALTHY 200" },
              { name: "Cart Service", port: ":8082", status: "HEALTHY 200" },
              { name: "Order Service", port: ":8083", status: "HEALTHY 200" },
              { name: "User & Auth (JWT)", port: ":8084", status: "RBAC ACTIVE" },
            ].map((svc, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-[var(--card)] border border-[var(--line)] shadow-xs"
              >
                <div className="flex justify-between items-center text-[var(--ink)] font-semibold mb-1">
                  <span>{svc.name}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] text-[var(--mute)]">
                  <span>{svc.port}</span>
                  <span className="text-[var(--ink)] font-mono font-semibold">{svc.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-[var(--card)] border border-[var(--line)]">
            <div className="flex justify-between items-center text-[10px] text-[var(--mute)] mb-2 font-mono">
              <span className="font-semibold text-[var(--ink)]">ENDPOINT DISPATCH</span>
              <span>15+ REST APIs Exposing</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-[var(--ink-2)]">
                <span className="text-[var(--ink)] font-bold">POST /api/orders/checkout</span>
                <span className="px-1.5 py-0.5 rounded bg-[var(--paper)] text-[9px] font-bold border border-[var(--line)]">
                  201 CREATED
                </span>
              </div>
              <div className="flex items-center justify-between text-[var(--ink-2)]">
                <span className="text-[var(--ink)] font-bold">GET /api/cart/pricing</span>
                <span className="px-1.5 py-0.5 rounded bg-[var(--paper)] text-[9px] font-bold border border-[var(--line)]">
                  200 OK
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // FoodieGo Delivery SPA UI & CI/CD Pipeline
        <div className="space-y-4 font-mono text-xs">
          <div className="p-3 rounded-lg bg-[var(--card)] border border-[var(--line)]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[var(--ink)]">ORDER #FD-8942</span>
              <span className="text-[10px] text-[var(--mute)] font-semibold">ETA: 22 MINS</span>
            </div>
            {/* Tracking Progress Bar */}
            <div className="w-full bg-[var(--paper)] h-2 rounded-full overflow-hidden my-2 border border-[var(--line)]">
              <div className="bg-[var(--ink)] h-full w-3/4 rounded-full" />
            </div>
            <div className="flex justify-between text-[9px] text-[var(--mute)] pt-1">
              <span>Confirmed</span>
              <span>Kitchen</span>
              <span className="text-[var(--ink)] font-bold">On the Way</span>
              <span>Delivered</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[var(--card)] border border-[var(--line)]">
            <div className="flex justify-between items-center text-[10px] text-[var(--mute)] mb-2 font-mono">
              <span className="font-semibold text-[var(--ink)]">NETLIFY CI/CD AUTOMATION</span>
              <span>MAIN BRANCH</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[var(--ink)]">
              <span>Git push → Build & Test</span>
              <span className="px-1.5 py-0.5 rounded bg-[var(--ink)] text-white text-[10px] font-bold">
                ✓ DEPLOYED
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
