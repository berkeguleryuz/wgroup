"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "@/components/icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger);

const faqIds = [
  "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9",
] as const;

const tintColors = [
  "#1E6DB5", "#0891b2", "#6366f1", "#0d9488", "#f59e0b",
  "#1E6DB5", "#0891b2", "#6366f1", "#0d9488",
];

function FAQItem({
  id,
  index,
  question,
  answer,
  isOpen,
  onToggle,
  color,
}: {
  id: string;
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  color: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
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
        rotateX: ((y - centerY) / centerY) * -4,
        rotateY: ((x - centerX) / centerX) * 4,
        transformPerspective: 800,
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
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
    }
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
    }
  }, []);

  const handleToggle = useCallback(() => {
    const el = contentRef.current;
    if (el) {
      if (isOpen) {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      } else {
        gsap.set(el, { height: "auto" });
        const h = el.offsetHeight;
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.3, ease: "power2.inOut" });
      }
    }
    onToggle(id);
  }, [id, isOpen, onToggle]);

  return (
    <div
      className="faq-item"
      style={{ perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="group relative overflow-hidden rounded-2xl shadow-xl transition-shadow duration-500 will-change-transform hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
          background: `linear-gradient(135deg, rgba(255,255,255,0.04), ${color}10, rgba(255,255,255,0.03))`,
          backdropFilter: "blur(12px)",
          border: `1px solid rgba(255,255,255,0.07)`,
          boxShadow: `0 10px 40px -10px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Corner glow */}
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
          style={{ background: `${color}15` }}
        />

        {/* Mouse-follow glow */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0 blur-3xl"
          style={{ background: `${color}20` }}
        />

        {/* Hover shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <button
          onClick={handleToggle}
          className="relative z-10 flex w-full cursor-pointer items-center justify-between p-7 text-left"
          style={{ transform: "translateZ(10px)" }}
        >
          <div className="flex items-center gap-4 pr-4">
            <span
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
              style={{ background: color }}
            >
              {index + 1}
            </span>
            <span className="font-semibold text-foreground">{question}</span>
          </div>
          <ChevronDown
            className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            style={{ color }}
          />
        </button>
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="relative z-10 px-7 pb-7" style={{ transform: "translateZ(10px)" }}>
            <div
              className="mb-4 h-px w-full"
              style={{ background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }}
            />
            <p className="pl-14 leading-relaxed text-muted">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const t = useTranslations("faq");
  const [openItems, setOpenItems] = useState<string[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-item", {
        y: 60,
        opacity: 0,
        rotationX: -10,
        stagger: 0.08,
        duration: 0.8,
        ease: "back.out(1.2)",
        force3D: true,
        scrollTrigger: {
          trigger: ".faq-item",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = useCallback((id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  return (
    <PageLayout title={t("title")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/images/home/knowledge.webp">
      <div ref={sectionRef} className="space-y-5">
        {faqIds.map((id, index) => (
          <FAQItem
            key={id}
            id={id}
            index={index}
            question={t(`${id}.question`)}
            answer={t(`${id}.answer`)}
            isOpen={openItems.includes(id)}
            onToggle={toggleItem}
            color={tintColors[index]}
          />
        ))}
      </div>
    </PageLayout>
  );
}
