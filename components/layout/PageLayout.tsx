"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  titleHighlight?: string;
  heroImage?: string;
  children: React.ReactNode;
}

export default function PageLayout({
  title,
  subtitle,
  eyebrow,
  titleHighlight,
  heroImage,
  children,
}: PageLayoutProps) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const words = title.split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* --- floating blobs --- */
      gsap.utils.toArray<HTMLElement>(".page-blob").forEach((blob, i) => {
        gsap.to(blob, {
          y: `random(-20, 20)`,
          x: `random(-15, 15)`,
          duration: gsap.utils.random(4, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      /* --- word-by-word 3D title reveal --- */
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".page-title-word", {
        y: 80,
        opacity: 0,
        rotationX: -60,
        stagger: 0.06,
        duration: 0.8,
        ease: "back.out(1.7)",
        force3D: true,
      });

      if (subtitle) {
        tl.from(
          ".page-hero-subtitle",
          { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
      }

      /* --- decorative line expand --- */
      tl.from(
        ".page-hero-line",
        { scaleX: 0, duration: 0.8, ease: "power3.inOut" },
        "-=0.4"
      );

      /* --- sparkle twinkle --- */
      gsap.utils.toArray<HTMLElement>(".page-sparkle").forEach((dot, i) => {
        gsap.to(dot, {
          opacity: gsap.utils.random(0.2, 1),
          scale: gsap.utils.random(0.8, 2),
          duration: gsap.utils.random(1.5, 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      /* --- content stagger reveal on scroll --- */
      gsap.utils
        .toArray<HTMLElement>(".page-content-block")
        .forEach((block) => {
          gsap.from(block, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });

    }, heroRef);

    return () => ctx.revert();
  }, [subtitle]);

  return (
    <>
      {/* Hero + Curve wrapper — image spans both */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-secondary"
      >
        {/* Hero background image — covers hero + curve */}
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover opacity-[0.15]"
              sizes="100vw"
              priority
            />
          </div>
        )}

        {/* animated blobs — covers entire section */}
        <div className="pointer-events-none absolute inset-0">
          <div className="page-blob absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-accent-purple/8 blur-[120px]" />
          <div
            className="page-blob absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[100px]"
          />
          <div className="page-blob absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-accent-teal/8 blur-[80px]" />
          {/* mesh grid */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* gradient overlay — covers entire section */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/20 to-transparent" />

        {/* Hero content */}
        <div className="relative py-24 px-6 sm:py-32">

          {/* content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {eyebrow && (
              <p
                className="page-title-word mb-3 text-sm font-semibold tracking-[0.2em] text-primary"
                style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
              >
                {eyebrow}
              </p>
            )}
            <h1
              className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
              style={{ perspective: "800px" }}
            >
              {titleHighlight ? (
                <>
                  <span
                    className="page-title-word mr-[0.25em] inline-block will-change-transform"
                    style={{ transformStyle: "preserve-3d", display: "inline-block" }}
                  >
                    {title}
                  </span>
                  <span
                    className="page-title-word inline-block text-primary will-change-transform"
                    style={{
                      fontFamily: "var(--font-instrument), Georgia, serif",
                      fontStyle: "italic",
                      transformStyle: "preserve-3d",
                      display: "inline-block",
                    }}
                  >
                    {titleHighlight}
                  </span>
                </>
              ) : (
                words.map((word, i) => (
                  <span
                    key={i}
                    className="page-title-word mr-[0.25em] inline-block will-change-transform"
                    style={{
                      transformStyle: "preserve-3d",
                      display: "inline-block",
                    }}
                  >
                    {word}
                  </span>
                ))
              )}
            </h1>
            {subtitle && (
              <p className="page-hero-subtitle mx-auto max-w-2xl text-lg text-white/60">
                {subtitle}
              </p>
            )}
            {/* decorative line */}
            <div className="page-hero-line mx-auto mt-8 h-[2px] w-24 origin-center bg-primary" />
          </div>
        </div>

        {/* Curved transition with sparkles */}
        <div className="relative">
          {/* Sparkle dots in dark zone */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="page-sparkle absolute h-[2px] w-[2px] rounded-full bg-primary/60"
                style={{
                  left: `${8 + (i * 5.2) % 84}%`,
                  top: `${15 + (i * 17) % 70}%`,
                }}
              />
            ))}
          </div>
          <svg
            className="relative z-10 block w-full h-[80px]"
            viewBox="0 0 1440 80"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 0 Q720 80 1440 0 V80 H0 Z"
              fill="#f7f9fc"
            />
          </svg>
        </div>
      </section>

      {/* Content — light theme */}
      <section ref={contentRef} className="light-content relative py-20 px-6" style={{ background: "#f7f9fc" }}>
        {/* subtle dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--primary) 0.5px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* top glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[200px]"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(30,109,181,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl">{children}</div>
      </section>
    </>
  );
}
