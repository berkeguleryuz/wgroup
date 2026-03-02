"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import { Linkedin, Instagram, Mail, Phone, ArrowRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/* ---------- onchainwin-style colored gradient social card ---------- */
function SocialCard({
  icon: Icon,
  label,
  subtitle,
  href,
  gradient,
  glowColor,
}: {
  icon: React.ElementType;
  label: string;
  subtitle: string;
  href: string;
  gradient: string;
  glowColor: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      const tiltX = (relY - 0.5) * 15;
      const tiltY = (relX - 0.5) * -15;

      gsap.to(cardRef.current, {
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: (relX - 0.5) * 100,
          y: (relY - 0.5) * 100,
          opacity: 1,
          duration: 0.3,
          overwrite: "auto",
        });
      }
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div style={{ perspective: "1000px" }}>
      <a
        ref={cardRef}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-card group relative block overflow-hidden rounded-2xl p-8 shadow-lg transition-shadow duration-500 will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: gradient,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic glow following cursor */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute -inset-4 rounded-3xl opacity-0 blur-2xl"
          style={{ background: glowColor }}
        />

        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Floating orb – scales up on hover */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:bg-white/20" />

        {/* Icon + arrow */}
        <div className="relative z-10 mb-6 flex items-center justify-between">
          <Icon className="h-10 w-10 text-white transition-transform duration-500 group-hover:scale-110" />
          <ArrowRight className="h-5 w-5 -translate-x-2 text-white/50 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>

        {/* Text */}
        <div className="relative z-10">
          <h3 className="text-lg font-bold text-white">{label}</h3>
          <p className="mt-1 text-sm text-white/60">{subtitle}</p>
        </div>

        {/* Bottom shine line */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </a>
    </div>
  );
}

/* ---------- magnetic button ---------- */
function MagneticCTAButton({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btnRef.current, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  const cls =
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-[#0891b2] text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40"
      : "border border-white/15 bg-white/[0.06] text-white backdrop-blur-sm hover:bg-white/[0.12]";

  return (
    <Link
      ref={btnRef}
      href={href}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4 text-base font-bold transition-all duration-300 will-change-transform hover:-translate-y-0.5 ${cls}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      )}
    </Link>
  );
}

/* ============================================================
   ContactCTA Section
   ============================================================ */
export default function ContactCTA() {
  const t = useTranslations("contactCta");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* parallax blobs */
      gsap.to(".contact-blob-1", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
      gsap.to(".contact-blob-2", {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* social cards stagger */
      gsap.from(".social-card", {
        y: 60,
        opacity: 0,
        rotationY: -15,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".social-cards-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* CTA block */
      gsap.from(".cta-block", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-block",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0f1e] py-32"
    >
      {/* Background blobs */}
      <div className="contact-blob-1 pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#6366f1]/8 blur-[120px]" />
      <div className="contact-blob-2 pointer-events-none absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-12">
        <AnimatedTitle
          title="L<b>e</b>t's Build<br />S<b>o</b>mething Great<br />T<b>o</b>gether"
          containerClass="mb-6 !text-white"
        />

        <p className="mx-auto mb-16 max-w-xl text-lg leading-relaxed text-white/60">
          {t("description")}
        </p>

        {/* Social cards grid */}
        <div className="social-cards-grid mx-auto mb-16 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
          <SocialCard
            icon={Linkedin}
            label="LinkedIn"
            subtitle="Follow our journey"
            href="https://www.linkedin.com/company/wgroupgmbh"
            gradient="linear-gradient(135deg, #0A66C2, #0052A3)"
            glowColor="rgba(10, 102, 194, 0.4)"
          />
          <SocialCard
            icon={Instagram}
            label="Instagram"
            subtitle="Behind the scenes"
            href="https://www.instagram.com/wgroupgmbh"
            gradient="linear-gradient(135deg, #E4405F, #C13584)"
            glowColor="rgba(228, 64, 95, 0.4)"
          />
          <SocialCard
            icon={Mail}
            label={t("emailLabel")}
            subtitle="info@wgroupgmbh.eu"
            href="mailto:info@wgroupgmbh.eu"
            gradient="linear-gradient(135deg, #1E6DB5, #185A96)"
            glowColor="rgba(30, 109, 181, 0.4)"
          />
          <SocialCard
            icon={Phone}
            label={t("phoneLabel")}
            subtitle="+49 174 177 78 79"
            href="tel:+491741777879"
            gradient="linear-gradient(135deg, #0d9488, #0891b2)"
            glowColor="rgba(13, 148, 136, 0.4)"
          />
        </div>

        {/* CTA block */}
        <div
          className="cta-block relative overflow-hidden rounded-3xl p-10 shadow-2xl md:p-14"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Corner glows */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#6366f1]/10 blur-[80px]" />
          {/* Bottom shine */}
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <p className="mb-8 text-2xl font-bold text-white md:text-3xl">
            {t("title")}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticCTAButton href="/contact">
              {t("buttonText")}
            </MagneticCTAButton>
            <MagneticCTAButton href="/career" variant="secondary">
              {t("careerButton")}
            </MagneticCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
