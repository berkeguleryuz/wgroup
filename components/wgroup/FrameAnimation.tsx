"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useTranslations } from "next-intl";

const cardKeys = ["card1", "card2", "card3", "card4"] as const;

export default function FrameAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("frameAnimation");

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const isLeft = i % 2 === 0;

        gsap.fromTo(
          card,
          {
            x: isLeft ? -100 : 100,
            opacity: 0,
            rotateY: isLeft ? 8 : -8,
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );

        // Slight parallax float while visible
        gsap.to(card, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative" style={{ background: "#0a0f1e" }}>
      {/* Sticky video background */}
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden">
        <video
          src="/w/worldmap.mp4"
          autoPlay
          muted
          playsInline
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(6, 11, 24, 0.3)" }}
        />
      </div>

      {/* Cards scroll over video */}
      <div className="relative z-10" style={{ marginTop: "-100vh" }}>
        {/* Top spacer */}
        <div className="h-[60vh]" />

        {cardKeys.map((key, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={key}
              className={`flex ${isLeft ? "justify-start" : "justify-end"} px-6 sm:px-12 lg:px-20`}
              style={{ marginBottom: i < 3 ? "45vh" : 0 }}
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="w-full max-w-lg"
                style={{ opacity: 0, perspective: "800px" }}
              >
                <div
                  className="rounded-2xl p-8 sm:p-10"
                  style={{
                    background: "rgba(6, 11, 24, 0.93)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(30,109,181,0.15)",
                    borderLeft: isLeft ? "3px solid rgba(30, 109, 181, 0.4)" : "none",
                    borderRight: !isLeft ? "3px solid rgba(30, 109, 181, 0.4)" : "none",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Card number accent */}
                  <span
                    className="mb-4 inline-block text-[64px] font-black leading-none"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      color: "rgba(30, 109, 181, 0.12)",
                    }}
                  >
                    0{i + 1}
                  </span>

                  <p
                    className="mb-2 text-[11px] font-medium uppercase tracking-[3px]"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                      color: "rgba(30, 109, 181, 0.7)",
                    }}
                  >
                    {t(`${key}Label`)}
                  </p>
                  <h3
                    className="mb-4 text-[28px] font-normal leading-tight text-white sm:text-[32px]"
                    style={{
                      fontFamily: "var(--font-instrument), Georgia, serif",
                    }}
                  >
                    {t(`${key}Title`)}
                  </h3>
                  <p
                    className="text-[15px] font-light leading-relaxed text-white/55"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    }}
                  >
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom spacer */}
        <div className="h-[30vh]" />
      </div>
    </section>
  );
}
