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
  about: "/images/company/about.webp",
  mission: "/images/company/our-mission.webp",
  partner: "/images/company/partners.webp",
  socialResponsibility: "/images/company/social-responsibility.webp",
  career: "/images/company/career.webp",
  weduFactory: "/images/brands/wedu-factory.webp",
  warticode: "/images/brands/warticode.webp",
  wqualitysphere: "/images/brands/wqualitysphere.webp",
  individualCourses: "/images/products/individual.webp",
  corporateCourses: "/images/products/corporate.webp",
  digitautopivot: "/images/products/digitautopivot.webp",
  eduarttransform: "/images/products/eduarttransform.webp",
  auditmastermind: "/images/products/auditmastermind.webp",
  autopathwayNavigator: "/images/products/autopathway-navigator.webp",
  supplierelevatePro: "/images/products/supplierelevate-pro.webp",
  evolvementor: "/images/products/evolvementor.webp",
};

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
        className="flex w-full items-center justify-between px-6 py-3.5 text-base font-medium text-white/80 transition-colors hover:text-white"
      >
        {t(group.key)}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div ref={contentRef} className="overflow-hidden bg-white/[0.02] py-1">
          {group.key === "brands" ? (
            <div className="flex gap-3 overflow-x-auto px-6 py-3 scrollbar-hide">
              {group.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="group w-[200px] flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04]"
                  onClick={onNavigate}
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <Image
                      src={navImages[item.key]}
                      alt={t(item.key)}
                      width={200}
                      height={125}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-sm font-semibold text-white/90">
                      {t(item.key)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <>
              {group.items.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-3 px-6 py-2.5 transition-colors hover:bg-white/[0.04]"
                  onClick={onNavigate}
                >
                  {navImages[item.key] && (
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                      <Image
                        src={navImages[item.key]}
                        alt=""
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <span className="text-sm text-white/60">{t(item.key)}</span>
                </Link>
              ))}

              {group.sections?.map((section) => (
                <div key={section.label}>
                  <div className="mx-6 my-1.5 border-t border-white/[0.06]" />
                  <span className="block px-6 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary/50">
                    {section.label}
                  </span>
                  {section.items.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="flex items-center gap-3 px-6 py-2.5 transition-colors hover:bg-white/[0.04]"
                      onClick={onNavigate}
                    >
                      {navImages[item.key] && (
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-white/[0.06]">
                          <Image
                            src={navImages[item.key]}
                            alt=""
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <span className="text-sm text-white/60">
                        {t(item.key)}
                      </span>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
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
            scrolled
              ? "bg-secondary/80 shadow-lg shadow-black/20 ring-1 ring-white/[0.08] backdrop-blur-xl"
              : "bg-secondary/40 ring-1 ring-white/[0.06] backdrop-blur-md"
          }`}
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
              src="/images/wgroup-logo.png"
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
                      ? "bg-white/[0.08] text-white"
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
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
                  className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
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
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent-teal px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-[1px] hover:shadow-xl hover:shadow-primary/30"
              onClick={closeDropdown}
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
            className="mx-3 mt-2 hidden overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/30 backdrop-blur-xl sm:mx-4 lg:mx-auto lg:block lg:max-w-6xl"
            style={{ background: "rgba(10, 15, 30, 0.96)" }}
            onMouseEnter={keepOpen}
            onMouseLeave={startClose}
          >
            {activeDropdown === "company" && <CompanyPanel />}
            {activeDropdown === "brands" && <BrandsPanel />}
            {activeDropdown === "products" && <ProductsPanel />}
          </div>
        )}

        {/* ========== MOBILE MENU ========== */}
        {mobileOpen && (
          <div
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto py-2 lg:hidden"
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

            <div className="mt-2 border-t border-white/[0.06] px-6 py-5">
              <Link
                href="/contact"
                className="mb-4 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent-teal px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/20"
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
                    ? "bg-white/[0.08]"
                    : "hover:bg-white/[0.05]"
                }`}
                onMouseEnter={() => setHoveredItem(item.key)}
                onClick={closeDropdown}
              >
                <div className="flex h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white/[0.06] ring-1 ring-white/[0.08]">
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
          <div className="col-span-2 relative min-h-[280px] overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
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

  function BrandsPanel() {
    const group = getGroup("brands");
    if (!group) return null;

    return (
      <div className="mx-auto max-w-5xl px-8 py-8">
        <div className="grid grid-cols-3 gap-5">
          {group.items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              data-menu-item
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06] hover:shadow-xl hover:shadow-primary/5"
              onClick={closeDropdown}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <Image
                  src={navImages[item.key]}
                  alt={t(item.key)}
                  width={400}
                  height={225}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-white/90 group-hover:text-white">
                  {t(item.key)}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/35 group-hover:text-white/50">
                  {t(`desc.${item.key}`)}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary/70 group-hover:text-primary">
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
            {/* WEdu Factory */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-[11px] font-bold tracking-widest text-primary/60">
                <span className="h-px flex-1 bg-primary/15" />
                WEDU FACTORY
                <span className="h-px flex-1 bg-primary/15" />
              </h4>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <ProductLink key={item.key} item={item} />
                ))}
              </div>
            </div>

            {/* WArtiCode */}
            {group.sections?.[0] && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-[11px] font-bold tracking-widest text-primary/60">
                  <span className="h-px flex-1 bg-primary/15" />
                  WARTICODE
                  <span className="h-px flex-1 bg-primary/15" />
                </h4>
                <div className="space-y-1">
                  {group.sections[0].items.map((item) => (
                    <ProductLink key={item.key} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* WQualitySphere */}
            {group.sections?.[1] && (
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-[11px] font-bold tracking-widest text-primary/60">
                  <span className="h-px flex-1 bg-primary/15" />
                  WQUALITYSPHERE
                  <span className="h-px flex-1 bg-primary/15" />
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
            <div className="relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-sm font-semibold text-white/90">
                      {hoveredItem ? t(hoveredItem) : ""}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {hoveredItem ? t(`desc.${hoveredItem}`) : ""}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white/[0.04] p-3">
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
            ? "bg-white/[0.08]"
            : "hover:bg-white/[0.05]"
        }`}
        onMouseEnter={() => setHoveredItem(item.key)}
        onClick={closeDropdown}
      >
        <div className="flex h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-white/[0.06] ring-1 ring-white/[0.06]">
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
