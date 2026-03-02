"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const brands = [
  {
    name: "WEdu Factory",
    slug: "/wedu-factory",
    description:
      "Professional training and education programs for the automotive industry workforce.",
    image: "/images/brands/wedu-factory.webp",
    color: "#1E6DB5",
  },
  {
    name: "WArtiCode",
    slug: "/warticode",
    description:
      "Digital transformation tools and solutions for modern automotive enterprises.",
    image: "/images/brands/warticode.webp",
    color: "#6366f1",
  },
  {
    name: "WQualitySphere",
    slug: "/wqualitysphere",
    description:
      "Quality management systems and consulting services for operational excellence.",
    image: "/images/brands/wqualitysphere.webp",
    color: "#0891b2",
  },
];

export default function Brands() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brands-heading", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".brands-heading",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".brand-card", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".brand-card",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f9fb] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="brands-heading mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            Our Brands
          </p>
          <h2
            className="brands-heading text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
          >
            Three Pillars of{" "}
            <span
              className="text-primary"
              style={{
                fontFamily: "var(--font-instrument), Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Innovation
            </span>
          </h2>
        </div>

        {/* Brand cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.slug}
              className="brand-card group relative overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-7">
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="h-1 w-8 rounded-full"
                    style={{ backgroundColor: brand.color }}
                  />
                  <h3
                    className="text-xl font-bold text-gray-900"
                    style={{
                      fontFamily: "var(--font-barlow), system-ui, sans-serif",
                    }}
                  >
                    {brand.name}
                  </h3>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-gray-500">
                  {brand.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary transition-all duration-300 group-hover:gap-3">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
