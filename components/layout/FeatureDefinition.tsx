"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

export interface MetaEntry {
  label: string;
  value: string;
  italic?: boolean;
}

interface Props {
  /** vertical meta rows in the left rail */
  meta?: MetaEntry[];
  /** top-right chip shown on the right column, above the pull quote */
  eyebrow?: string;
  rightChip?: string;
  /** large italic pull-quote text */
  lead: string;
  /** cite under the pull-quote (optional) */
  leadCite?: string;
  /** body paragraph under the pull-quote (optional) */
  body?: string;
  /** vertical padding */
  spacing?: "default" | "tight";
}

export default function FeatureDefinition({
  meta = [],
  eyebrow,
  rightChip,
  lead,
  leadCite,
  body,
  spacing = "default",
}: Props) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".fd-fade").forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`light-content relative overflow-hidden ${
        spacing === "tight" ? "py-20 sm:py-24" : "py-28 sm:py-36"
      }`}
      style={{ background: "#f7f9fc" }}
    >
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--primary) 0.5px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Soft primary glow at top */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(30,109,181,0.12), transparent 70%)",
        }}
      />
      {/* Soft teal glow at bottom-right */}
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full blur-[120px]"
        style={{ background: "rgba(8,145,178,0.08)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left rail */}
          <aside className="lg:col-span-4">
            <div className="fd-fade lg:sticky lg:top-32">
              {/* Vertical meta list */}
              {meta.length > 0 && (
                <div className="space-y-5 border-l border-[#1E6DB5]/15 pl-5">
                  {meta.map((m, i) => (
                    <MetaRow
                      key={i}
                      label={m.label}
                      value={m.value}
                      italic={m.italic}
                    />
                  ))}
                </div>
              )}

              {/* Decorative divider */}
              <div
                className="mt-10 h-px w-24"
                style={{
                  background:
                    "linear-gradient(to right, var(--primary), transparent)",
                }}
              />
            </div>
          </aside>

          {/* Right content */}
          <div className="lg:col-span-8">
            {(eyebrow || rightChip) && (
              <div
                className="fd-fade mb-10 flex items-center gap-3"
                style={{ fontFamily: "var(--font-jetbrains), monospace" }}
              >
                {eyebrow && (
                  <span className="text-[11px] font-medium tracking-wider text-[#94a3b8]">
                    ◆ {eyebrow.toLowerCase()}
                  </span>
                )}
                <div className="h-px flex-1 bg-gradient-to-r from-[#1E6DB5]/25 via-[#1E6DB5]/10 to-transparent" />
                {rightChip && (
                  <span
                    className="text-[11px] font-semibold tracking-[0.1em]"
                    style={{ color: "var(--primary)" }}
                  >
                    {rightChip}
                  </span>
                )}
              </div>
            )}

            {/* Lead pull-quote */}
            <blockquote
              className="fd-fade relative mb-12 block"
              style={{ quotes: "none" }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 -top-16 select-none leading-none sm:-left-4 sm:-top-24"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "clamp(9rem, 18vw, 14rem)",
                  background:
                    "linear-gradient(135deg, rgba(30,109,181,0.32), rgba(8,145,178,0.24))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                “
              </span>

              <p
                className="relative pt-4 text-[1.75rem] leading-[1.22] tracking-[-0.01em] text-[#0b1220] sm:text-[2.25rem] lg:text-[2.75rem]"
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontWeight: 400,
                  fontVariationSettings: "'SOFT' 30, 'opsz' 144, 'WONK' 0",
                }}
              >
                {lead}
              </p>

              {leadCite && (
                <footer
                  className="mt-6 flex items-center gap-3"
                  style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                >
                  <span
                    className="h-px w-10"
                    style={{
                      background:
                        "linear-gradient(to right, var(--primary), var(--accent-teal))",
                    }}
                  />
                  <cite
                    className="text-[11px] font-medium uppercase tracking-[0.24em] not-italic"
                    style={{ color: "#475569" }}
                  >
                    — {leadCite}
                  </cite>
                </footer>
              )}
            </blockquote>

            {/* Body paragraph */}
            {body && (
              <div className="fd-fade relative">
                <p
                  className="text-[1.0625rem] leading-[1.85] sm:text-lg"
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 400,
                    color: "#1f2937",
                    fontVariationSettings: "'SOFT' 50, 'opsz' 14",
                  }}
                >
                  <span
                    className="float-left mr-3 pt-1 text-[3.5rem] leading-[0.82]"
                    style={{
                      fontFamily: "var(--font-fraunces), Georgia, serif",
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, var(--primary), var(--accent-teal))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      fontVariationSettings:
                        "'SOFT' 0, 'opsz' 144, 'WONK' 1",
                    }}
                  >
                    {body.charAt(0)}
                  </span>
                  {body.slice(1)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaRow({
  label,
  value,
  italic,
}: {
  label: string;
  value: string;
  italic?: boolean;
}) {
  return (
    <div>
      <div
        className="mb-1 text-[10px] font-medium uppercase tracking-[0.22em] text-[#94a3b8]"
        style={{ fontFamily: "var(--font-jetbrains), monospace" }}
      >
        → {label}
      </div>
      <div
        className="text-[1.0625rem] leading-[1.35] text-[#0f172a]"
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontWeight: italic ? 400 : 500,
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        {value}
      </div>
    </div>
  );
}
