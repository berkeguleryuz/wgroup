"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown, Menu, X, ArrowRight } from "@/components/icons";
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

/* ---------- Image map ---------- */

const navImages: Record<string, string> = {
  aboutWgroup: "/w/company/about.webp",
  whatWeDo: "/w/company/our-mission.webp",
  ourDivisions: "/w/company/partners.webp",
  ourStory: "/w/company/social-responsibility.webp",
  ourVision: "/w/company/career.webp",
  wquality: "/wgroup/01_Ana_Sayfa/20_WQuality%20Sphere.webp",
  wdigilab: "/w/brands/wdigilab.webp",
  wstudio: "/w/brands/wstudio.webp",
  studioItem1: "/w/products/digitautopivot.webp",
  studioItem2: "/w/products/digitautopivot.webp",
  digilabItem1: "/w/products/digitautopivot.webp",
  digilabItem2: "/w/products/digitautopivot.webp",
  qualityItem1: "/w/products/digitautopivot.webp",
  qualityItem2: "/w/products/digitautopivot.webp",
};

/* ---------- Navigation structure ---------- */

const navItems: NavItem[] = [
  {
    key: "company",
    items: [
      { key: "aboutWgroup", href: "/about" },
      { key: "whatWeDo", href: "/what-we-do" },
      { key: "ourDivisions", href: "/our-divisions" },
      { key: "ourStory", href: "/our-story" },
      { key: "ourVision", href: "/our-vision" },
    ],
  },
  {
    key: "divisions",
    items: [
      { key: "wquality", href: "/w-quality" },
      { key: "wdigilab", href: "/w-digilab" },
      { key: "wstudio", href: "/w-studio" },
    ],
  },
  {
    key: "products",
    items: [
      { key: "studioItem1", href: "/products/digitautopivot" },
      { key: "studioItem2", href: "/products/digitautopivot" },
    ],
    sections: [
      {
        label: "W-DigiLab",
        items: [
          { key: "digilabItem1", href: "/products/digitautopivot" },
          { key: "digilabItem2", href: "/products/digitautopivot" },
        ],
      },
      {
        label: "W-Quality",
        items: [
          { key: "qualityItem1", href: "/products/digitautopivot" },
          { key: "qualityItem2", href: "/products/digitautopivot" },
        ],
      },
    ],
  },
  { key: "blog", href: "/blog" },
  { key: "faq", href: "/faq" },
];

/* ---------- Mobile Accordion ---------- */

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
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [open]);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
        style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
      >
        {t(group.key)}
        <ChevronDown
          className={`h-5 w-5 text-white/30 transition-transform duration-300 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {open && (
        <div ref={contentRef} className="overflow-hidden pb-2">
          {/* Main items */}
          <div className="space-y-0.5 px-2">
            {group.items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                onClick={onNavigate}
              >
                {navImages[item.key] && (
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/6 ring-1 ring-white/8">
                    <Image
                      src={navImages[item.key]}
                      alt=""
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[15px] font-medium text-white/75"
                    style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                    {t(item.key)}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/15" />
              </Link>
            ))}
          </div>

          {/* Sections (products sub-groups) */}
          {group.sections?.map((section) => (
            <div key={section.label} className="mt-2 px-2">
              <div className="mx-2 mb-2 mt-1 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/6" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50"
                  style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                  {section.label}
                </span>
                <div className="h-px flex-1 bg-white/6" />
              </div>
              {section.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-3.5 rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  onClick={onNavigate}
                >
                  {navImages[item.key] && (
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/6 ring-1 ring-white/8">
                      <Image
                        src={navImages[item.key]}
                        alt=""
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="text-[15px] font-medium text-white/75"
                      style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}>
                      {t(item.key)}
                    </span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/15" />
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
  const panelRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeDropdownRef = useRef<string | null>(null);

  useEffect(() => {
    activeDropdownRef.current = activeDropdown;
  }, [activeDropdown]);

  /* --- Dropdown handlers --- */

  const openDropdown = useCallback((key: string) => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setActiveDropdown(key);
    setHoveredItem(null);
  }, []);

  const startClose = useCallback(() => {
    leaveTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredItem(null);
    }, 200);
  }, []);

  const keepOpen = useCallback(() => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
  }, []);

  const closeDropdown = useCallback(() => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setActiveDropdown(null);
    setHoveredItem(null);
  }, []);

  /* --- Scroll handler --- */

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;

    if (activeDropdownRef.current) {
      setActiveDropdown(null);
      setHoveredItem(null);
    }

    setScrolled(currentY > 50);
  }, []);

  useGSAP(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* --- Escape key --- */

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDropdown();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeDropdown]);

  /* --- Mobile body lock --- */

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* --- Panel entrance animation --- */

  useEffect(() => {
    if (activeDropdown && panelRef.current) {
      const panel = panelRef.current;
      gsap.fromTo(
        panel,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }
      );
      const items = panel.querySelectorAll("[data-menu-item]");
      if (items.length) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: "power2.out",
            delay: 0.08,
          }
        );
      }
    }
  }, [activeDropdown]);

  function closeMobile() {
    setMobileOpen(false);
  }

  function getGroup(key: string): NavGroup | undefined {
    return navItems.find((i) => isGroup(i) && i.key === key) as
      | NavGroup
      | undefined;
  }

  /* ========== Render ========== */

  return (
    <>
      {/* Backdrop overlay */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300"
          onClick={closeDropdown}
        />
      )}

      <nav
        ref={navRef}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Pill container - always tube shaped */}
        <div
          className={`mx-3 mt-3 rounded-full transition-all duration-500 sm:mx-4 lg:mx-auto lg:max-w-5xl ${
            activeDropdown
              ? "shadow-lg shadow-black/20 ring-1 ring-white/8 backdrop-blur-xl"
              : scrolled
                ? "bg-secondary/80 shadow-lg shadow-black/20 ring-1 ring-white/8 backdrop-blur-xl"
                : "bg-secondary/40 ring-1 ring-white/6 backdrop-blur-md"
          }`}
          style={activeDropdown ? { background: "rgba(10, 15, 30, 0.96)" } : undefined}
        >
        {/* Main bar */}
        <div className="flex h-14 items-center justify-between px-3 lg:px-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            onClick={closeDropdown}
          >
            <Image
              src="/wgroup/logo.png"
              alt="WGroup"
              width={140}
              height={65}
              className="h-9 w-auto transition-opacity duration-300 group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) =>
              isGroup(item) ? (
                <button
                  key={item.key}
                  onMouseEnter={() => openDropdown(item.key)}
                  onMouseLeave={startClose}
                  onClick={() =>
                    activeDropdown === item.key
                      ? closeDropdown()
                      : openDropdown(item.key)
                  }
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    activeDropdown === item.key
                      ? "bg-white/8 text-white"
                      : "text-white/70 hover:bg-white/6 hover:text-white"
                  }`}
                  aria-expanded={activeDropdown === item.key}
                >
                  {t(item.key)}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      activeDropdown === item.key ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:bg-white/6 hover:text-white"
                  onClick={closeDropdown}
                >
                  {t(item.key)}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher dark />
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-primary to-accent-teal px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-px hover:shadow-xl hover:shadow-primary/30"
              onClick={closeDropdown}
            >
              <span className="relative z-10">{t("contact")}</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="relative z-10 rounded-lg p-2 text-white transition-all duration-200 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        </div>{/* end pill container */}

        {/* ========== MEGA MENU PANELS (outside pill) ========== */}
        {activeDropdown && (
          <div
            ref={panelRef}
            className="mx-3 mt-2 hidden overflow-hidden rounded-2xl border border-white/8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:mx-4 lg:mx-auto lg:block lg:max-w-6xl"
            style={{ background: "rgba(10, 15, 30, 0.96)" }}
            onMouseEnter={keepOpen}
            onMouseLeave={startClose}
          >
            {activeDropdown === "company" && <CompanyPanel />}
            {activeDropdown === "divisions" && <DivisionsPanel />}
            {activeDropdown === "products" && <ProductsPanel />}
          </div>
        )}

      </nav>

      {/* ========== FULL-SCREEN MOBILE MENU ========== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto lg:hidden"
          style={{ background: "rgba(6, 11, 24, 0.99)" }}
        >
          {/* Top bar with logo + close */}
          <div className="flex h-20 shrink-0 items-center justify-between px-6">
            <Link href="/" onClick={closeMobile}>
              <Image
                src="/wgroup/logo.png"
                alt="WGroup"
                width={120}
                height={55}
                className="h-8 w-auto opacity-80"
              />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-full p-2.5 text-white/70 transition-colors hover:bg-white/8 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Divider */}
          <div className="mx-6 h-px bg-white/6" />

          {/* Nav items */}
          <div className="flex-1 px-6 py-6">
            <nav className="space-y-1">
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
                    className="flex items-center justify-between rounded-xl px-4 py-4 text-lg font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                    style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
                    onClick={closeMobile}
                  >
                    {t(item.key)}
                    <ArrowRight className="h-4 w-4 text-white/20" />
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* Bottom area */}
          <div className="shrink-0 border-t border-white/6 px-6 py-6">
            <Link
              href="/contact"
              className="mb-5 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent-teal px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20"
              style={{ fontFamily: "var(--font-barlow), system-ui, sans-serif" }}
              onClick={closeMobile}
            >
              {t("contact")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex items-center justify-center">
              <LanguageSwitcher dark />
            </div>
          </div>
        </div>
      )}
    </>
  );

  /* ==================== COMPANY PANEL ==================== */

  function CompanyPanel() {
    const group = getGroup("company");
    if (!group) return null;
    const defaultKey = group.items[0].key;
    const activeKey =
      hoveredItem && navImages[hoveredItem] ? hoveredItem : defaultKey;

    return (
      <div className="mx-auto max-w-5xl px-8 py-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Links */}
          <div className="col-span-3 space-y-1">
            {group.items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                data-menu-item
                className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 ${
                  hoveredItem === item.key
                    ? "bg-white/8"
                    : "hover:bg-white/5"
                }`}
                onMouseEnter={() => setHoveredItem(item.key)}
                onClick={closeDropdown}
              >
                <div className="flex h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white/6 ring-1 ring-white/8">
                  <Image
                    src={navImages[item.key]}
                    alt=""
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-white/90 group-hover:text-white">
                    {t(item.key)}
                  </div>
                  <div className="mt-0.5 text-xs text-white/35 group-hover:text-white/50">
                    {t(`desc.${item.key}`)}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 -translate-x-1 text-white/15 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          {/* Featured image with crossfade */}
          <div className="col-span-2 relative min-h-70 overflow-hidden rounded-2xl bg-white/3 ring-1 ring-white/6">
            {group.items.map((item) => (
              <div
                key={item.key}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeKey === item.key ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={navImages[item.key]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 400px"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-sm font-semibold text-white/90">
                {t(activeKey)}
              </p>
              <p className="mt-1 text-xs text-white/50">
                {t(`desc.${activeKey}`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== BRANDS PANEL ==================== */

  function DivisionsPanel() {
    const group = getGroup("divisions");
    if (!group) return null;

    return (
      <div className="mx-auto max-w-5xl px-8 py-8">
        <div className="grid grid-cols-3 gap-5">
          {group.items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              data-menu-item
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/7 transition-all duration-300 hover:border-white/18 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10"
              onClick={closeDropdown}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={navImages[item.key]}
                  alt={t(item.key)}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-white group-hover:text-white">
                  {t(item.key)}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-white/65 group-hover:text-white/85">
                  {t(`desc.${item.key}`)}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#60b0f0] group-hover:text-white">
                  {t("explore")}
                  <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  /* ==================== PRODUCTS PANEL ==================== */

  function ProductsPanel() {
    const group = getGroup("products");
    if (!group) return null;
    const activeImage =
      hoveredItem && navImages[hoveredItem] ? navImages[hoveredItem] : null;

    return (
      <div className="mx-auto max-w-6xl px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Product columns */}
          <div className="col-span-8 grid grid-cols-3 gap-6">
            {/* W-Studio */}
            <div>
              <h4 className="mb-3 flex items-center justify-center gap-2 text-[11px] font-bold tracking-widest">
                <span className="h-px flex-1 bg-white/8" />
                <span className="rounded-full bg-white px-4 py-1.5 text-[#0a0f1e]">W-STUDIO</span>
                <span className="h-px flex-1 bg-white/8" />
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <ProductLink key={item.key} item={item} />
                ))}
              </div>
            </div>

            {/* W-DigiLab */}
            {group.sections?.[0] && (
              <div>
                <h4 className="mb-3 flex items-center justify-center gap-2 text-[11px] font-bold tracking-widest">
                  <span className="h-px flex-1 bg-white/8" />
                  <span className="rounded-full bg-white px-4 py-1.5 text-[#0a0f1e]">W-DIGILAB</span>
                  <span className="h-px flex-1 bg-white/8" />
                </h4>
                <div className="space-y-1">
                  {group.sections[0].items.map((item) => (
                    <ProductLink key={item.key} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* W-Quality */}
            {group.sections?.[1] && (
              <div>
                <h4 className="mb-3 flex items-center justify-center gap-2 text-[11px] font-bold tracking-widest">
                  <span className="h-px flex-1 bg-white/8" />
                  <span className="rounded-full bg-white px-4 py-1.5 text-[#0a0f1e]">W-QUALITY</span>
                  <span className="h-px flex-1 bg-white/8" />
                </h4>
                <div className="space-y-1">
                  {group.sections[1].items.map((item) => (
                    <ProductLink key={item.key} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Preview image */}
          <div className="col-span-4">
            <div className="relative h-full min-h-65 overflow-hidden rounded-2xl border border-white/6 bg-white/3 shadow-2xl shadow-black/40">
              {activeImage ? (
                <>
                  <Image
                    key={activeImage}
                    src={activeImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 0px, 360px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-xl font-bold text-white">
                      {hoveredItem ? t(hoveredItem) : ""}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-white/65">
                      {hoveredItem ? t(`desc.${hoveredItem}`) : ""}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white/4 p-3">
                    <ArrowRight className="h-full w-full text-white/15" />
                  </div>
                  <p className="text-xs text-white/20">
                    {t("hoverToPreview")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Product link item ---------- */

  function ProductLink({ item }: { item: NavLink }) {
    return (
      <Link
        href={item.href}
        data-menu-item
        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
          hoveredItem === item.key
            ? "bg-white/8"
            : "hover:bg-white/5"
        }`}
        onMouseEnter={() => setHoveredItem(item.key)}
        onClick={closeDropdown}
      >
        <div className="flex h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/6 ring-1 ring-white/6">
          <Image
            src={navImages[item.key]}
            alt=""
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium leading-snug text-white/80 group-hover:text-white">
            {t(item.key)}
          </div>
        </div>
      </Link>
    );
  }
}
