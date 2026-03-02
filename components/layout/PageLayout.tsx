"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  heroImage?: string;
  children: React.ReactNode;
}

export default function PageLayout({
  title,
  subtitle,
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

      /* --- parallax on hero section --- */
      gsap.to(".page-hero-bg-text", {
        y: 60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [subtitle]);

  return (
    <>
      {/* Hero Banner */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-secondary py-24 px-6 sm:py-32"
      >
        {/* Hero background image */}
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

        {/* animated blobs */}
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

        {/* background text */}
        <div className="page-hero-bg-text pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <span className="text-[10vw] font-black tracking-tight text-white/[0.03]">
            WGroup
          </span>
        </div>

        {/* gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/20 to-transparent" />

        {/* content */}
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
            style={{ perspective: "800px" }}
          >
            {words.map((word, i) => (
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
            ))}
          </h1>
          {subtitle && (
            <p className="page-hero-subtitle mx-auto max-w-2xl text-lg text-white/60">
              {subtitle}
            </p>
          )}
          {/* decorative line */}
          <div className="page-hero-line mx-auto mt-8 h-[2px] w-24 origin-center bg-primary" />
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="relative bg-background py-20 px-6">
        {/* subtle dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl">{children}</div>
      </section>
    </>
  );
}
