"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

/* ---------- Types ---------- */

interface NavLink {
  key: string;
  href: string;
}

interface NavGroup {
  key: string;
  items: NavLink[];
  sections?: { label: string; items: NavLink[] }[];
}

type NavItem = NavLink | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return "items" in item;
}

/* ---------- Navigation structure ---------- */

const navItems: NavItem[] = [
  {
    key: "company",
    items: [
      { key: "about", href: "/about" },
      { key: "mission", href: "/our-mission" },
      { key: "partner", href: "/partner" },
      { key: "socialResponsibility", href: "/social-responsibility" },
      { key: "career", href: "/career" },
    ],
  },
  {
    key: "brands",
    items: [
      { key: "weduFactory", href: "/wedu-factory" },
      { key: "warticode", href: "/warticode" },
      { key: "wqualitysphere", href: "/wqualitysphere" },
    ],
  },
  {
    key: "products",
    items: [
      { key: "individualCourses", href: "/products/automotive-professionals" },
      {
        key: "corporateCourses",
        href: "/products/automotive-professionals-corporate",
      },
    ],
    sections: [
      {
        label: "WArtiCode",
        items: [
          { key: "digitautopivot", href: "/products/digitautopivot" },
          { key: "eduarttransform", href: "/products/eduarttransform" },
        ],
      },
      {
        label: "WQualitySphere",
        items: [
          { key: "auditmastermind", href: "/products/auditmastermind" },
          {
            key: "autopathwayNavigator",
            href: "/products/autopathway-navigator",
          },
          { key: "supplierelevatePro", href: "/products/supplierelevate-pro" },
          { key: "evolvementor", href: "/products/evolvementor" },
        ],
      },
    ],
  },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/faq" },
];

/* ---------- Desktop Dropdown ---------- */

function DesktopDropdown({
  group,
  t,
}: {
  group: NavGroup;
  t: ReturnType<typeof useTranslations>;
}) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function enter() {
    if (timeout.current) clearTimeout(timeout.current);
    setOpen(true);
  }

  function leave() {
    timeout.current = setTimeout(() => setOpen(false), 150);
  }

  useEffect(() => {
    if (open && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -8, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    }
  }, [open]);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {t(group.key)}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-full z-50 mt-2 min-w-[240px] overflow-hidden rounded-xl py-2 shadow-2xl"
          style={{
            background: "rgba(15, 20, 35, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {group.items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="group flex items-center justify-between px-4 py-2.5 text-sm text-white/60 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
              onClick={() => setOpen(false)}
            >
              {t(item.key)}
              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}

          {group.sections?.map((section) => (
            <div key={section.label}>
              <div className="mx-4 my-2 border-t border-white/[0.06]" />
              <span className="block px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                {section.label}
              </span>
              {section.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="group flex items-center justify-between px-4 py-2.5 text-sm text-white/60 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Mobile Accordion Section ---------- */

function MobileAccordion({
  group,
  t,
  onNavigate,
}: {
  group: NavGroup;
  t: ReturnType<typeof useTranslations>;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-3.5 text-base font-medium text-white/80 transition-colors hover:text-white"
      >
        {t(group.key)}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="bg-white/[0.03] py-1">
          {group.items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="block px-10 py-2.5 text-sm text-white/50 transition-colors hover:text-white"
              onClick={onNavigate}
            >
              {t(item.key)}
            </Link>
          ))}

          {group.sections?.map((section) => (
            <div key={section.label}>
              <div className="mx-10 my-1.5 border-t border-white/[0.06]" />
              <span className="block px-10 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                {section.label}
              </span>
              {section.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="block px-10 py-2.5 text-sm text-white/50 transition-colors hover:text-white"
                  onClick={onNavigate}
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ========== Navbar ========== */

export default function Navbar() {
  const t = useTranslations("navbar");
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    const nav = navRef.current;
    if (!nav) return;

    setScrolled(currentY > 50);

    if (currentY > lastScrollY.current && currentY > 80) {
      gsap.to(nav, { y: -100, duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(nav, { y: 0, duration: 0.3, ease: "power2.out" });
    }

    lastScrollY.current = currentY;
  }, []);

  useGSAP(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0f1e]/90 shadow-lg shadow-black/10 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex h-[72px] items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <Image
            src="/images/wgroup-logo.png"
            alt="WGroup"
            width={140}
            height={65}
            className="h-9 w-auto transition-opacity duration-300 group-hover:opacity-80"
            priority
          />
        </Link>

        {/* Desktop nav links – centered */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            isGroup(item) ? (
              <DesktopDropdown key={item.key} group={item} t={t} />
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
              >
                {t(item.key)}
              </Link>
            )
          )}
        </div>

        {/* Right side: Language + CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher dark />

          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-[#0891b2] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-[1px]"
          >
            <span className="relative z-10">{t("contact")}</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative z-10 rounded-lg p-2 text-white transition-all duration-200 hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ---------- Mobile menu ---------- */}
      {mobileOpen && (
        <div
          className="lg:hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto py-2"
          style={{
            background: "rgba(10, 15, 30, 0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {navItems.map((item) =>
            isGroup(item) ? (
              <MobileAccordion
                key={item.key}
                group={item}
                t={t}
                onNavigate={closeMobile}
              />
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className="block px-6 py-3.5 text-base font-medium text-white/80 transition-colors hover:text-white"
                onClick={closeMobile}
              >
                {t(item.key)}
              </Link>
            )
          )}

          {/* Mobile CTA + Language */}
          <div className="mt-2 border-t border-white/[0.06] px-6 py-5">
            <Link
              href="/contact"
              className="mb-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#0891b2] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/20"
              onClick={closeMobile}
            >
              {t("contact")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex justify-center">
              <LanguageSwitcher dark />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
