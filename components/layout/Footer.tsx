"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

/* ---------- Link data ---------- */

const brandLinks = [
  { key: "weduFactory", href: "/wedu-factory" },
  { key: "warticode", href: "/warticode" },
  { key: "wqualitysphere", href: "/wqualitysphere" },
] as const;

const productLinks = [
  { key: "individualProducts", href: "/products/automotive-professionals" },
  {
    key: "corporateProducts",
    href: "/products/automotive-professionals-corporate",
  },
  { key: "digitautopivot", href: "/products/digitautopivot" },
  { key: "eduarttransform", href: "/products/eduarttransform" },
  { key: "auditmastermind", href: "/products/auditmastermind" },
  { key: "autopathwayNavigator", href: "/products/autopathway-navigator" },
  { key: "supplierelevatePro", href: "/products/supplierelevate-pro" },
  { key: "evolvementor", href: "/products/evolvementor" },
] as const;

const companyLinks = [
  { key: "about", href: "/about" },
  { key: "mission", href: "/our-mission" },
  { key: "partner", href: "/partner" },
  { key: "socialResponsibility", href: "/social-responsibility" },
  { key: "career", href: "/career" },
  { key: "faq", href: "/faq" },
] as const;

/* ---------- Social Icons ---------- */

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

/* ========== Footer ========== */

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#0a0f1e]">
      {/* ---------- Main columns ---------- */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/images/wgroup-logo.png"
            alt="WGroup"
            width={160}
            height={74}
            className="h-10 w-auto opacity-80"
          />
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brands */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("brands")}
            </h3>
            <ul className="space-y-2.5">
              {brandLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("products")}
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("company")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
              {t("followUs")}
            </h3>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/wgroupgmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/wgroupgmbh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-6 text-center text-xs text-white/40 sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <span>{t("phone")}</span>
            <span className="hidden sm:inline">|</span>
            <span>
              {t("hqLab")}: {t("address")}
            </span>
          </div>
          <span>{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
