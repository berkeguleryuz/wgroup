"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import { ArrowRight } from "@/components/icons";

gsap.registerPlugin(ScrollTrigger);

/* ---------- tab data ---------- */
const tabs = [
  { key: "tab1" as const, id: "individual" },
  { key: "tab2" as const, id: "corporate" },
  { key: "tab3" as const, id: "warticode" },
  { key: "tab4" as const, id: "wqualitysphere" },
];

const warticodeProducts = [
  { nameKey: "digitautopivot", name: "DigitAutoPivot", href: "/products/digitautopivot", descKey: "digitautopivotDesc", color: "#0891b2", image: "/images/products/digitautopivot.webp" },
  { nameKey: "eduarttransform", name: "EduArtTransform", href: "/products/eduarttransform", descKey: "eduarttransformDesc", color: "#6366f1", image: "/images/products/eduarttransform.webp" },
];

const wqsProducts = [
  { nameKey: "auditmastermind", name: "AuditMastermind", href: "/products/auditmastermind", descKey: "auditmastermindDesc", color: "#0d9488", image: "/images/products/auditmastermind.webp" },
  { nameKey: "autopathwayNavigator", name: "AutoPathWay Navigator", href: "/products/autopathway-navigator", descKey: "autopathwayNavigatorDesc", color: "#1E6DB5", image: "/images/products/autopathway-navigator.webp" },
  { nameKey: "supplierelevatePro", name: "SupplierElevate Pro", href: "/products/supplierelevate-pro", descKey: "supplierelevateProDesc", color: "#f59e0b", image: "/images/products/supplierelevate-pro.webp" },
  { nameKey: "evolvementor", name: "EVolveMentor", href: "/products/evolvementor", descKey: "evolvementorDesc", color: "#e11d48", image: "/images/products/evolvementor.webp" },
];

/* ---------- product card – dark glass ---------- */
function ProductCard({
  name,
  description,
  href,
  readMore,
  color,
  image,
}: {
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
          opacity: 0.5,
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
      className="product-card"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl p-7 shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Product image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-[0.08] transition-opacity duration-700 group-hover:opacity-[0.14]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
          style={{ background: `${color}12` }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
          style={{ background: `${color}15` }}
        />

        {/* Bottom shine */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10" style={{ transform: "translateZ(15px)" }}>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ background: color }} />
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color }}>
              {name}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-white/50">{description}</p>

          <Link
            href={href}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
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

/* ============================================================
   ProductTabs Section – dark navy
   ============================================================ */
export default function ProductTabs() {
  const t = useTranslations("productTabs");
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateIndicator = useCallback(() => {
    const activeBtn = tabRefs.current[activeTab];
    if (!activeBtn || !indicatorRef.current) return;
    const rect = activeBtn.getBoundingClientRect();
    const parentRect = activeBtn.parentElement!.getBoundingClientRect();

    gsap.to(indicatorRef.current, {
      width: rect.width,
      x: rect.left - parentRect.left,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".product-tabs-wrapper", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTabChange = useCallback(
    (index: number) => {
      if (index === activeTab) return;
      setActiveTab(index);
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      }
    },
    [activeTab]
  );

  const renderCTACard = (title: string, subtitle: string, href: string, gradient: string, image: string) => (
    <div
      className="relative overflow-hidden rounded-2xl p-10 shadow-xl"
      style={{ background: gradient, border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-white/50">{subtitle}</p>
      <Link
        href={href}
        className="group mt-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {t("readMore")}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return renderCTACard(t("individual"), t("individualSubtitle"), "/products/automotive-professionals", "linear-gradient(135deg, #1E6DB5, #6366f1)", "/images/products/individual.webp");
      case 1:
        return renderCTACard(t("corporate"), t("corporateSubtitle"), "/products/automotive-professionals-corporate", "linear-gradient(135deg, #0d9488, #0891b2)", "/images/products/corporate.webp");
      case 2:
        return (
          <div>
            <h3 className="mb-6 text-2xl font-bold text-white">{t("tab3")}</h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {warticodeProducts.map((p) => (
                <ProductCard key={p.nameKey} name={p.name} description={t(p.descKey)} href={p.href} readMore={t("readMore")} color={p.color} image={p.image} />
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="mb-6 text-2xl font-bold text-white">{t("tab4")}</h3>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {wqsProducts.map((p) => (
                <ProductCard key={p.nameKey} name={p.name} description={t(p.descKey)} href={p.href} readMore={t("readMore")} color={p.color} image={p.image} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0a0f1e] py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-[#6366f1]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[400px] w-[400px] rounded-full bg-primary/8 blur-[100px]" />
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
          title="Our Pr<b>o</b>ducts &<br />S<b>o</b>lutions"
          containerClass="mb-16 text-center !text-white"
        />

        <div className="product-tabs-wrapper">
          {/* tab bar */}
          <div className="relative mb-10 flex overflow-x-auto" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[index] = el; }}
                onClick={() => handleTabChange(index)}
                className={`relative cursor-pointer whitespace-nowrap px-7 py-4 text-sm font-semibold transition-colors duration-300 ${
                  activeTab === index ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {t(tab.key)}
              </button>
            ))}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-[#6366f1]"
              style={{ width: 0 }}
            />
          </div>

          <div ref={contentRef} className="min-h-[260px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  );
}
