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

function FAQItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    const el = contentRef.current;
    if (el) {
      if (isOpen) {
        gsap.to(el, { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
      } else {
        gsap.set(el, { height: "auto" });
        const h = el.offsetHeight;
        gsap.fromTo(el, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.35, ease: "power2.inOut" });
      }
    }
    onToggle();
  }, [isOpen, onToggle]);

  return (
    <div className="faq-item">
      <div
        className="relative overflow-hidden rounded-2xl transition-all duration-300"
        style={{
          background: isOpen ? "rgba(30,109,181,0.04)" : "var(--card-bg)",
          border: isOpen ? "1px solid rgba(30,109,181,0.2)" : "1px solid var(--card-border)",
        }}
      >
        <button
          onClick={handleToggle}
          className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-primary/3"
        >
          <div className="flex items-center gap-4 pr-4">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-300"
              style={{
                background: isOpen ? "#1e6db5" : "rgba(30,109,181,0.1)",
                color: isOpen ? "#ffffff" : "#1e6db5",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className="font-semibold transition-colors duration-200"
              style={{ color: isOpen ? "#1e6db5" : "var(--foreground)" }}
            >
              {question}
            </span>
          </div>
          <ChevronDown
            className="h-4 w-4 shrink-0 text-muted transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="px-6 pb-5">
            <div
              className="mb-4 h-px w-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(30,109,181,0.15), transparent)" }}
            />
            <p className="pl-12 text-sm leading-relaxed text-muted">{answer}</p>
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
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
        ease: "power2.out",
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
    <PageLayout title={t("title")} eyebrow={t("eyebrow")} titleHighlight={t("titleHighlight")} heroImage="/w/home/knowledge.webp">
      <div ref={sectionRef} className="space-y-3">
        {faqIds.map((id, index) => (
          <FAQItem
            key={id}
            index={index}
            question={t(`${id}.question`)}
            answer={t(`${id}.answer`)}
            isOpen={openItems.includes(id)}
            onToggle={() => toggleItem(id)}
          />
        ))}
      </div>
    </PageLayout>
  );
}
