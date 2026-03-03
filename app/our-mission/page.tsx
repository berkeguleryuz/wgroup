"use client";

import { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const stepColors = [
  "var(--primary)",
  "var(--accent-teal)",
  "var(--primary)",
  "var(--accent-teal)",
  "var(--primary)",
];

function TimelineStep({
  number,
  text,
  color,
  isLast,
}: {
  number: number;
  text: string;
  color: string;
  isLast: boolean;
}) {
  return (
    <div className="mission-block relative flex gap-5 sm:gap-8">
      {/* Left: timeline column */}
      <div className="flex flex-col items-center">
        {/* Numbered badge with shimmer */}
        <div
          className="mission-number relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-bold sm:h-12 sm:w-12"
          style={{
            background: `color-mix(in srgb, ${color} 12%, transparent)`,
            color,
          }}
        >
          <span className="relative z-10">
            {String(number).padStart(2, "0")}
          </span>
          {/* Shimmer sweep */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `linear-gradient(105deg, transparent 30%, color-mix(in srgb, ${color} 30%, transparent) 50%, transparent 70%)`,
              backgroundSize: "200% 100%",
              animation: "numberShimmer 3s ease-in-out infinite",
            }}
          />
        </div>

        {/* Vertical dashed line */}
        {!isLast && (
          <div
            className="mt-2 w-px flex-1 border-l border-dashed"
            style={{ borderColor: `color-mix(in srgb, ${color} 25%, transparent)` }}
          />
        )}
      </div>

      {/* Right: text content */}
      <div className={`flex-1 ${isLast ? "pb-0" : "pb-10"}`}>
        <p className="text-base leading-relaxed text-white/55 sm:text-[17px] sm:leading-[1.8]">
          {text}
        </p>
      </div>

      {/* Keyframes (injected once) */}
      {number === 1 && (
        <style jsx global>{`
          @keyframes numberShimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      )}
    </div>
  );
}

export default function OurMissionPage() {
  const t = useTranslations("mission");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Stagger entrance */
      const blocks = gsap.utils.toArray<HTMLElement>(".mission-block");
      if (blocks.length) {
        gsap.set(blocks, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: blocks[0],
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(blocks, {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.8,
              ease: "power3.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const paragraphs = [t("p1"), t("p2"), t("p3"), t("p4"), t("p5")];

  return (
    <PageLayout
      title={t("title")}
      eyebrow={t("eyebrow")}
      titleHighlight={t("titleHighlight")}
      heroImage="/images/company/our-mission.webp"
    >
      <div ref={sectionRef}>
        {paragraphs.map((text, i) => (
          <TimelineStep
            key={i}
            number={i + 1}
            text={text}
            color={stepColors[i]}
            isLast={i === paragraphs.length - 1}
          />
        ))}
      </div>
    </PageLayout>
  );
}
