"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "./PageLayout";

gsap.registerPlugin(ScrollTrigger);

interface ProductLayoutProps {
  title: string;
  brand: string;
  category: string;
  description: string | React.ReactNode;
  contactPricing: string;
  heroImage?: string;
  children?: React.ReactNode;
}

export default function ProductLayout({
  title,
  brand,
  category,
  description,
  contactPricing,
  heroImage,
  children,
}: ProductLayoutProps) {
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".product-detail", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      gsap.from(".product-module", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".product-module",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, detailsRef);

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout title={title} heroImage={heroImage}>
      <div ref={detailsRef}>
        <div className="product-detail mb-6 flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-5 py-2 text-sm font-bold text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--accent-teal))",
              boxShadow: "0 4px 15px -3px rgba(30,109,181,0.3)",
            }}
          >
            {brand}
          </span>
          {category !== brand && (
            <span
              className="rounded-full px-5 py-2 text-sm font-semibold"
              style={{
                background: "rgba(30,109,181,0.15)",
                border: "1px solid rgba(30,109,181,0.3)",
                color: "var(--primary)",
              }}
            >
              {category}
            </span>
          )}
        </div>

        <div
          className="product-detail relative mb-8 overflow-hidden rounded-2xl p-5 shadow-lg"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            boxShadow: "0 8px 30px -8px rgba(0,0,0,0.3)",
          }}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          <p className="relative z-10 text-sm italic text-muted">
            {contactPricing}
          </p>
        </div>

        <div className="product-detail mb-10 space-y-6">
          {typeof description === "string" ? (
            <p className="text-lg leading-relaxed text-muted">{description}</p>
          ) : (
            description
          )}
        </div>

        {children}
      </div>
    </PageLayout>
  );
}
