"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import { GraduationCap, Code2, ShieldCheck, ArrowRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Brand Card – dark glass style inspired by Apres ---------- */
function BrandCard({
  icon: Icon,
  name,
  description,
  href,
  readMore,
  color,
  image,
}: {
  icon: React.ElementType;
  name: string;
  description: string;
  href: string;
  readMore: string;
  color: string;
  image: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      gsap.to(cardRef.current, {
        rotateX: ((y - centerY) / centerY) * -6,
        rotateY: ((x - centerX) / centerX) * 6,
        transformPerspective: 800,
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - 100,
          y: y - 100,
          opacity: 0.6,
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
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  return (
    <div
      className="brand-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative h-full overflow-hidden rounded-2xl p-8 shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: `rgba(255,255,255,0.03)`,
          border: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
          style={{ background: `${color}15` }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
          style={{ background: `${color}15` }}
        />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Bottom shine line */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Brand image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-[0.07] transition-opacity duration-700 group-hover:opacity-[0.12]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          {/* Icon */}
          <div
            className="brand-icon mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl"
            style={{ background: `${color}15` }}
          >
            <Icon className="h-7 w-7" style={{ color }} />
          </div>

          <h3 className="mb-3 text-xl font-bold text-white">{name}</h3>
          <p className="mb-6 text-sm leading-relaxed text-white/50">{description}</p>

          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
            style={{ color }}
          >
            {readMore}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const brands = [
  { icon: GraduationCap, color: "#6366f1", image: "/images/brands/wedu-factory.webp" },
  { icon: Code2, color: "#0891b2", image: "/images/brands/warticode.webp" },
  { icon: ShieldCheck, color: "#0d9488", image: "/images/brands/wqualitysphere.webp" },
];

/* ============================================================
   About Section – dark navy (Apres style)
   ============================================================ */
export default function About() {
  const t = useTranslations("whatWeDo");
  const tBrands = useTranslations("brands");
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brand-card", {
        y: 60,
        rotationX: -12,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".brand-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".brand-icon").forEach((icon) => {
        gsap.to(icon, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      if (imageRef.current) {
        gsap.set(imageRef.current, {
          clipPath: "polygon(38% 30%, 62% 30%, 62% 70%, 38% 70%)",
        });
        gsap.to(imageRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0a0f1e] py-28">
      {/* bg effects */}
      <div className="pointer-events-none absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-[#6366f1]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <AnimatedTitle
          title="Disc<b>o</b>ver the P<b>o</b>wer<br />of Kn<b>o</b>wledge and<br />Innov<b>a</b>tion"
          containerClass="mb-6 text-center !text-white"
        />

        <p className="mx-auto mb-16 max-w-2xl text-center text-lg leading-relaxed text-white/50">
          {t("description")}
        </p>

        {/* brand cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["weduFactory", "warticode", "wqualitysphere"].map((key, i) => (
            <BrandCard
              key={key}
              icon={brands[i].icon}
              name={tBrands(key)}
              description={t(`${key}Desc`)}
              href={`/${key === "weduFactory" ? "wedu-factory" : key}`}
              readMore={tBrands("readMore")}
              color={brands[i].color}
              image={brands[i].image}
            />
          ))}
        </div>

        {/* expanding image */}
        <div className="mt-28">
          <div
            ref={imageRef}
            className="about-image relative mx-auto h-[50vh] w-full overflow-hidden rounded-3xl will-change-[clip-path]"
          >
            <Image
              src="/images/company/about.webp"
              alt="WGroup Berlin Office"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 z-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-white/60">
                Berlin, Germany
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
