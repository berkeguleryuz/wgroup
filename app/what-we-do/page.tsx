"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import PageLayout from "@/components/layout/PageLayout";

export default function WhatWeDoPage() {
  const t = useTranslations("mission");
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".wwd-block").forEach((block) => {
        const reveal = block.querySelectorAll<HTMLElement>(".wwd-reveal");
        gsap.set(reveal, { opacity: 0, y: 50 });
        ScrollTrigger.create({
          trigger: block,
          start: "top 82%",
          once: true,
          onEnter: () => {
            gsap.to(reveal, {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.9,
              ease: "power3.out",
            });
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".collage-tile").forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { y: 30, opacity: 0, rotate: i === 0 ? -2 : i === 1 ? 1.5 : -1 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            delay: 0.15 * i,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tile,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout
      title={t("title")}
      titleHighlight={t("titleHighlight")}
      heroImage="/w-new/w2.webp"
    >
      <div ref={sectionRef} className="space-y-28 sm:space-y-36">
        {/* ─────────── Block A: Editorial lead — large statement + paired image ─────────── */}
        <section className="wwd-block relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="wwd-reveal relative">
            {/* Decorative quote glyph */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-10 select-none text-[120px] leading-none sm:-top-14 sm:text-[160px]"
              style={{
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontStyle: "italic",
                color: "var(--primary)",
                opacity: 0.08,
              }}
            >
              &ldquo;
            </span>

            <span
              aria-hidden
              className="mb-7 block h-[3px] w-16 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--accent-teal))",
              }}
            />

            <p
              className="relative text-[26px] leading-[1.45] tracking-[-0.01em] sm:text-[32px] sm:leading-[1.35] lg:text-[36px]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                color: "#1a2535",
                fontWeight: 500,
              }}
            >
              {t("p1")}
            </p>
          </div>

          <div className="wwd-reveal relative">
            <div
              className="relative aspect-[5/4] overflow-hidden rounded-[32px]"
              style={{
                boxShadow:
                  "0 40px 80px -30px rgba(15, 23, 42, 0.25), 0 16px 32px -16px rgba(15, 23, 42, 0.12)",
              }}
            >
              <Image
                src="/w-new/wn8.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(30,109,181,0.18) 0%, transparent 45%, transparent 55%, rgba(10,15,30,0.35) 100%)",
                }}
              />
            </div>

            {/* Floating accent dot */}
            <span
              aria-hidden
              className="absolute -bottom-3 -right-3 h-7 w-7 rounded-full sm:-bottom-4 sm:-right-4 sm:h-9 sm:w-9"
              style={{
                background: "var(--primary)",
                boxShadow: "0 8px 20px -6px rgba(30,109,181,0.5)",
              }}
            />
          </div>
        </section>

        {/* ─────────── Flow connector ─────────── */}
        <div className="wwd-block flex items-center justify-center">
          <div className="wwd-reveal flex items-center gap-3">
            <span className="h-px w-16 bg-border" />
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--primary)" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent-teal)" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent-purple)" }}
            />
            <span className="h-px w-16 bg-border" />
          </div>
        </div>

        {/* ─────────── Block B: Image collage + body ─────────── */}
        <section className="wwd-block relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          {/* Collage of three brand images */}
          <div className="relative h-[420px] sm:h-[500px] lg:h-[540px]">
            {/* Quality — top left */}
            <div
              className="collage-tile absolute left-0 top-0 h-[48%] w-[48%] overflow-hidden rounded-2xl"
              style={{
                boxShadow: "0 24px 48px -20px rgba(15,23,42,0.25)",
              }}
            >
              <Image
                src="/w-new/W-Quality.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 60vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,15,30,0.45) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Digilab — top right */}
            <div
              className="collage-tile absolute right-0 top-[10%] h-[48%] w-[48%] overflow-hidden rounded-2xl"
              style={{
                boxShadow: "0 24px 48px -20px rgba(15,23,42,0.25)",
              }}
            >
              <Image
                src="/w-new/W-Digilab.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, 55vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,15,30,0.45) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Studio — bottom center, largest */}
            <div
              className="collage-tile absolute bottom-0 left-[26%] h-[48%] w-[48%] overflow-hidden rounded-2xl"
              style={{
                boxShadow: "0 32px 64px -24px rgba(15,23,42,0.3)",
              }}
            >
              <Image
                src="/w-new/W-Studio.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 65vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(0deg, rgba(10,15,30,0.5) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Background accent blob */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[60px] blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(30,109,181,0.08), transparent 60%), radial-gradient(circle at 70% 70%, rgba(99,102,241,0.06), transparent 60%)",
              }}
            />
          </div>

          {/* Body text */}
          <div className="wwd-reveal flex items-center">
            <div className="relative">
              <span
                aria-hidden
                className="absolute -left-5 top-2 h-[calc(100%-1rem)] w-[2px] rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--accent-teal), transparent)",
                  opacity: 0.5,
                }}
              />
              <p
                className="text-base leading-[1.95] sm:text-[17px]"
                style={{
                  fontFamily: "var(--font-barlow), system-ui, sans-serif",
                  color: "#3a4a5c",
                }}
              >
                {t("p2")}
              </p>
            </div>
          </div>
        </section>

        {/* ─────────── Block C: Closing — square image paired with editorial text ─────────── */}
        <section className="wwd-block relative grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Square image — full content visible at native 1:1 */}
          <div className="wwd-reveal relative">
            <div
              className="relative aspect-square overflow-hidden rounded-[32px]"
              style={{
                background: "#0a0f1e",
                boxShadow:
                  "0 40px 80px -30px rgba(15, 23, 42, 0.3), 0 16px 32px -16px rgba(15, 23, 42, 0.12)",
              }}
            >
              <Image
                src="/w-new/wn5.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, rgba(30,109,181,0.18) 0%, transparent 45%, transparent 55%, rgba(10,15,30,0.35) 100%)",
                }}
              />
            </div>

            {/* Floating accent dot */}
            <span
              aria-hidden
              className="absolute -bottom-3 -left-3 h-7 w-7 rounded-full sm:-bottom-4 sm:-left-4 sm:h-9 sm:w-9"
              style={{
                background: "var(--accent-teal)",
                boxShadow: "0 8px 20px -6px rgba(8,145,178,0.55)",
              }}
            />
          </div>

          {/* Closing editorial column */}
          <div className="wwd-reveal relative">
            <span
              aria-hidden
              className="mb-7 block h-[3px] w-16 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--accent-teal), var(--accent-purple))",
              }}
            />

            <p
              className="text-lg leading-[1.85] sm:text-[22px] sm:leading-[1.7]"
              style={{
                fontFamily: "var(--font-barlow), system-ui, sans-serif",
                color: "#1a2535",
                fontWeight: 500,
              }}
            >
              {t("p3")}
            </p>

            <div className="mt-10 flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--primary)" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-teal)" }}
              />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-purple)" }}
              />
              <span className="ml-1 h-px flex-1 bg-border" />
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
