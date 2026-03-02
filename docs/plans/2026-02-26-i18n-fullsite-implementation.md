# WGroup GmbH Full Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the complete WGroup GmbH website with i18n (EN/TR/DE), GSAP animations, and all pages from content files.

**Architecture:** Next.js 16 App Router with next-intl (prefix-free mode), GSAP + @gsap/react for animations, Tailwind v4 for styling. Client-side locale switching stored in localStorage with geo-detection fallback.

**Tech Stack:** Next.js 16.1.6, React 19.2.3, next-intl, gsap + @gsap/react, Tailwind v4, TypeScript

---

## Phase 1: Project Setup & i18n Infrastructure

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install packages**

Run:
```bash
npm install next-intl gsap @gsap/react lucide-react
```

**Step 2: Verify installation**

Run: `npm ls next-intl gsap @gsap/react lucide-react`
Expected: All packages listed without errors

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install next-intl, gsap, @gsap/react, lucide-react"
```

---

### Task 2: Create i18n configuration and provider

**Files:**
- Create: `i18n/request.ts`
- Create: `i18n/config.ts`
- Create: `components/providers/I18nProvider.tsx`

**Step 1: Create i18n config**

`i18n/config.ts`:
```ts
export const locales = ["en", "tr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
```

**Step 2: Create i18n request config**

`i18n/request.ts`:
```ts
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { defaultLocale, type Locale, locales } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("locale")?.value as Locale | undefined;
  const locale = localeCookie && locales.includes(localeCookie) ? localeCookie : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**Step 3: Create I18nProvider for client components**

`components/providers/I18nProvider.tsx`:
```tsx
"use client";
import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";

export default function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: AbstractIntlMessages;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

**Step 4: Commit**

```bash
git add i18n/ components/providers/
git commit -m "feat: add i18n config, request handler, and client provider"
```

---

### Task 3: Create middleware for locale detection

**Files:**
- Create: `middleware.ts`

**Step 1: Create middleware**

`middleware.ts`:
```ts
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "./i18n/config";

export function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get("locale")?.value as Locale | undefined;

  if (localeCookie && locales.includes(localeCookie)) {
    return NextResponse.next();
  }

  // Geo-detect: Germany -> German
  const country = request.geo?.country;
  let detectedLocale: Locale = defaultLocale;

  if (country === "DE" || country === "AT" || country === "CH") {
    detectedLocale = "de";
  } else if (country === "TR") {
    detectedLocale = "tr";
  } else {
    // Fallback to Accept-Language header
    const acceptLang = request.headers.get("accept-language") || "";
    if (acceptLang.includes("de")) {
      detectedLocale = "de";
    } else if (acceptLang.includes("tr")) {
      detectedLocale = "tr";
    }
  }

  const response = NextResponse.next();
  response.cookies.set("locale", detectedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
```

**Step 2: Commit**

```bash
git add middleware.ts
git commit -m "feat: add locale detection middleware with geo-detect"
```

---

### Task 4: Update next.config.ts and root layout for i18n

**Files:**
- Modify: `next.config.ts`
- Modify: `app/layout.tsx`

**Step 1: Update next.config.ts**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
};

export default withNextIntl(nextConfig);
```

**Step 2: Update root layout**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import I18nProvider from "@/components/providers/I18nProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | WGroup GmbH",
    default: "WGroup GmbH - The Art of Transforming Knowledge into Excellence",
  },
  description: "WGroup GmbH - Innovation, Quality Management, and Digital Transformation in the Automotive Industry",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <I18nProvider locale={locale} messages={messages}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
```

**Step 3: Commit**

```bash
git add next.config.ts app/layout.tsx
git commit -m "feat: integrate next-intl plugin and update root layout"
```

---

### Task 5: Create translation JSON files (EN/TR/DE)

**Files:**
- Create: `messages/en.json`
- Create: `messages/tr.json`
- Create: `messages/de.json`

All 3 JSON files with complete translations for every page. Flat namespace organized by page/section. Keys: `navbar.*`, `footer.*`, `hero.*`, `whatWeDo.*`, `brands.*`, `products.*`, `blog.*`, `categories.*`, `contactCta.*`, `about.*`, `mission.*`, `partner.*`, `socialResponsibility.*`, `career.*`, `contact.*`, `faq.*`, `weduFactory.*`, `warticode.*`, `wqualitysphere.*`, `productDetail.*`, `blogDetail.*`, `common.*`.

Content source: `/Users/berke/Desktop/Developer/web/wgroupgmbh-content/` - all 29 files translated to TR and DE.

**Step 1: Create en.json** (all English content from content files)
**Step 2: Create tr.json** (Turkish translations)
**Step 3: Create de.json** (German translations)
**Step 4: Commit**

```bash
git add messages/
git commit -m "feat: add complete EN/TR/DE translation files"
```

---

### Task 6: Update globals.css with color palette and theme

**Files:**
- Modify: `app/globals.css`

**Step 1: Update globals.css**

Replace content with WGroup color palette:
- Background: `#F7FDFF`
- Primary: `#1E6DB5`
- Secondary: `#E8F4FD`
- Text: `#1A2332`
- Muted: `#64748B`
- Border: `#D0E5F5`
- White: `#FFFFFF`

Use Tailwind v4 `@theme inline` block and CSS variables. No dark mode. No gradients.

**Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: update theme with WGroup light blue color palette"
```

---

## Phase 2: Layout Components (Navbar, Footer, LanguageSwitcher)

### Task 7: Create LanguageSwitcher component

**Files:**
- Create: `components/layout/LanguageSwitcher.tsx`

Client component with dropdown showing EN/TR/DE. On selection:
1. Set cookie `locale` via fetch to API route or direct cookie set
2. Set `localStorage.setItem("locale", value)`
3. Call `router.refresh()` to reload with new locale

**Step 1: Create LanguageSwitcher**
**Step 2: Commit**

```bash
git add components/layout/LanguageSwitcher.tsx
git commit -m "feat: add LanguageSwitcher component with localStorage persistence"
```

---

### Task 8: Create Navbar component with GSAP scroll hide/show

**Files:**
- Create: `components/layout/Navbar.tsx`

Client component featuring:
- WGroup logo (left)
- Navigation links: Company (dropdown), Brands (dropdown), Products (dropdown), Blog, Contact
- LanguageSwitcher (right)
- Mobile hamburger menu
- GSAP scroll hide/show animation (gsap.to y: -100 on scroll down, y: 0 on scroll up)
- White background with border-bottom on scroll
- All text from translations via `useTranslations("navbar")`

**Step 1: Create Navbar**
**Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add Navbar with GSAP scroll animation and i18n"
```

---

### Task 9: Create Footer component

**Files:**
- Create: `components/layout/Footer.tsx`

Sections:
- Brands links (WEdu Factory, WArtiCode, WQualitySphere)
- Products links
- Company links (About, Mission, Partner, Social Responsibility, Career, FAQ)
- Social media (LinkedIn, Instagram)
- Contact info (phone, address)
- Copyright

All text from `useTranslations("footer")`.

**Step 1: Create Footer**
**Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer component with i18n"
```

---

## Phase 3: Homepage (GSAP Animated Sections)

### Task 10: Create Hero section

**Files:**
- Create: `components/gsap/Hero.tsx`

Full-width hero section:
- "The Art of Transforming Knowledge into Excellence" title with word-by-word GSAP reveal
- Two CTA buttons: About Us, Contact Us
- useGSAP hook with ScrollTrigger
- Background: #F7FDFF, text: #1A2332

**Step 1: Create Hero**
**Step 2: Commit**

```bash
git add components/gsap/Hero.tsx
git commit -m "feat: add Hero section with GSAP word-by-word animation"
```

---

### Task 11: Create WhatWeDo section

**Files:**
- Create: `components/gsap/WhatWeDo.tsx`

Simple fade-in section:
- "What Do We Do?" heading
- Description text
- GSAP ScrollTrigger fade-in animation

**Step 1: Create WhatWeDo**
**Step 2: Commit**

```bash
git add components/gsap/WhatWeDo.tsx
git commit -m "feat: add WhatWeDo section with fade-in animation"
```

---

### Task 12: Create Brands section

**Files:**
- Create: `components/gsap/Brands.tsx`

3 brand cards with stagger animation:
- WEdu Factory, WArtiCode, WQualitySphere
- Each card: title, brief description, "Read More" link
- GSAP stagger fade-in on scroll

**Step 1: Create Brands**
**Step 2: Commit**

```bash
git add components/gsap/Brands.tsx
git commit -m "feat: add Brands section with stagger card animation"
```

---

### Task 13: Create ProductTabs section

**Files:**
- Create: `components/gsap/ProductTabs.tsx`

4-tab interface:
- Tab 1: Automotive Professionals - Individual
- Tab 2: Automotive Professionals - Corporate
- Tab 3: WArtiCode
- Tab 4: WQualitySphere
- Tab content transitions with GSAP fade

**Step 1: Create ProductTabs**
**Step 2: Commit**

```bash
git add components/gsap/ProductTabs.tsx
git commit -m "feat: add ProductTabs section with animated tab switching"
```

---

### Task 14: Create BlogPreview section

**Files:**
- Create: `components/gsap/BlogPreview.tsx`

Blog preview section:
- "Always Stay up to Date with Wgroup" heading
- 3 latest blog post cards in grid
- GSAP ScrollTrigger stagger reveal
- "See More" link to /blog

**Step 1: Create BlogPreview**
**Step 2: Commit**

```bash
git add components/gsap/BlogPreview.tsx
git commit -m "feat: add BlogPreview section with scroll-reveal cards"
```

---

### Task 15: Create Categories section

**Files:**
- Create: `components/gsap/Categories.tsx`

3 category cards: Knowledge, Digitalization, Quality Management
- Each with "Read More" link to filtered blog
- GSAP stagger animation

**Step 1: Create Categories**
**Step 2: Commit**

```bash
git add components/gsap/Categories.tsx
git commit -m "feat: add Categories section"
```

---

### Task 16: Create ContactCTA section

**Files:**
- Create: `components/gsap/ContactCTA.tsx`

Call-to-action section for contact with GSAP fade-in.

**Step 1: Create ContactCTA**
**Step 2: Commit**

```bash
git add components/gsap/ContactCTA.tsx
git commit -m "feat: add ContactCTA section"
```

---

### Task 17: Assemble Homepage

**Files:**
- Modify: `app/page.tsx`

Import all sections and Navbar/Footer. Assemble:
```
Navbar -> Hero -> WhatWeDo -> Brands -> ProductTabs -> BlogPreview -> Categories -> ContactCTA -> Footer
```

**Step 1: Update page.tsx**
**Step 2: Verify dev server runs: `npm run dev`**
**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble homepage with all sections"
```

---

## Phase 4: Company Pages

### Task 18: Create shared PageLayout component

**Files:**
- Create: `components/layout/PageLayout.tsx`

Reusable layout for inner pages:
- Navbar
- Hero banner (title, optional subtitle)
- Content area (max-w-4xl, prose-like styling)
- Footer
- GSAP fade-in on content

**Step 1: Create PageLayout**
**Step 2: Commit**

```bash
git add components/layout/PageLayout.tsx
git commit -m "feat: add reusable PageLayout for inner pages"
```

---

### Task 19: Create About page

**Files:**
- Create: `app/about/page.tsx`

Uses PageLayout. Content from `about.*` translations.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/about/
git commit -m "feat: add About page"
```

---

### Task 20: Create Our Mission page

**Files:**
- Create: `app/our-mission/page.tsx`

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/our-mission/
git commit -m "feat: add Our Mission page"
```

---

### Task 21: Create Partner page

**Files:**
- Create: `app/partner/page.tsx`

Partner cards for: Berlin Partner, ReTraNetz-BB, IHK Berlin, Burgschaftbank.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/partner/
git commit -m "feat: add Partner page"
```

---

### Task 22: Create Social Responsibility page

**Files:**
- Create: `app/social-responsibility/page.tsx`

3 pillars: Gender Equality, Sustainability, Environmental Awareness.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/social-responsibility/
git commit -m "feat: add Social Responsibility page"
```

---

### Task 23: Create Career page

**Files:**
- Create: `app/career/page.tsx`

Career intro text + contact email link.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/career/
git commit -m "feat: add Career page"
```

---

## Phase 5: Brand Pages

### Task 24: Create WEdu Factory page

**Files:**
- Create: `app/wedu-factory/page.tsx`

Brand page with description, highlights, CTA links to individual/corporate courses.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/wedu-factory/
git commit -m "feat: add WEdu Factory brand page"
```

---

### Task 25: Create WArtiCode page

**Files:**
- Create: `app/warticode/page.tsx`

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/warticode/
git commit -m "feat: add WArtiCode brand page"
```

---

### Task 26: Create WQualitySphere page

**Files:**
- Create: `app/wqualitysphere/page.tsx`

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/wqualitysphere/
git commit -m "feat: add WQualitySphere brand page"
```

---

## Phase 6: Product Pages

### Task 27: Create shared ProductLayout component

**Files:**
- Create: `components/layout/ProductLayout.tsx`

Product detail layout: brand badge, title, "Contact us for pricing", category, description, training modules list.

**Step 1: Create ProductLayout**
**Step 2: Commit**

```bash
git add components/layout/ProductLayout.tsx
git commit -m "feat: add reusable ProductLayout component"
```

---

### Task 28: Create Automotive Professionals Individual page

**Files:**
- Create: `app/products/automotive-professionals/page.tsx`

5 courses: WAutoStart, WAutoPilot, WAutoCore, WAutoSync, WAutoAuditPRO, WAutoECODrive with expandable sections.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/products/automotive-professionals/
git commit -m "feat: add Automotive Professionals Individual page"
```

---

### Task 29: Create Automotive Professionals Corporate page

**Files:**
- Create: `app/products/automotive-professionals-corporate/page.tsx`

Lists 7 products: WSelect, WAutoStart through WAutoECODrive.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/products/automotive-professionals-corporate/
git commit -m "feat: add Automotive Professionals Corporate page"
```

---

### Task 30: Create WArtiCode product pages

**Files:**
- Create: `app/products/digitautopivot/page.tsx`
- Create: `app/products/eduarttransform/page.tsx`

**Step 1: Create both pages**
**Step 2: Commit**

```bash
git add app/products/digitautopivot/ app/products/eduarttransform/
git commit -m "feat: add WArtiCode product pages"
```

---

### Task 31: Create WQualitySphere product pages

**Files:**
- Create: `app/products/auditmastermind/page.tsx`
- Create: `app/products/autopathway-navigator/page.tsx`
- Create: `app/products/supplierelevate-pro/page.tsx`
- Create: `app/products/evolvementor/page.tsx`

**Step 1: Create all 4 pages**
**Step 2: Commit**

```bash
git add app/products/auditmastermind/ app/products/autopathway-navigator/ app/products/supplierelevate-pro/ app/products/evolvementor/
git commit -m "feat: add WQualitySphere product pages"
```

---

## Phase 7: Blog & Other Pages

### Task 32: Create Blog listing page

**Files:**
- Create: `lib/blog.ts` (blog data with slugs, categories, content keys)
- Create: `app/blog/page.tsx`

Blog grid with category filter (Knowledge, Digitalization, Quality Management, News). Cards with title, category, excerpt.

**Step 1: Create blog data and listing page**
**Step 2: Commit**

```bash
git add lib/blog.ts app/blog/
git commit -m "feat: add blog listing page with category filter"
```

---

### Task 33: Create Blog detail page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

Dynamic blog detail with full article content from translations. generateStaticParams for all 6 slugs.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/blog/
git commit -m "feat: add blog detail page with dynamic routing"
```

---

### Task 34: Create FAQ page

**Files:**
- Create: `app/faq/page.tsx`

Accordion with 9 FAQ items. Click to expand/collapse with GSAP height animation.

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/faq/
git commit -m "feat: add FAQ page with accordion"
```

---

### Task 35: Create Contact page

**Files:**
- Create: `app/contact/page.tsx`

Two columns: contact form (Name, Email, Message, Send) + contact info (address, phone, email, map placeholder).

**Step 1: Create page**
**Step 2: Commit**

```bash
git add app/contact/
git commit -m "feat: add Contact page with form"
```

---

## Phase 8: Final Polish

### Task 36: Responsive testing and fixes

**Files:**
- Modify: Various component files

Test all pages at mobile (375px), tablet (768px), desktop (1280px). Fix any layout issues.

**Step 1: Test and fix responsive issues**
**Step 2: Commit**

```bash
git add -A
git commit -m "fix: responsive layout adjustments across all pages"
```

---

### Task 37: Final build verification

**Step 1: Run build**

Run: `npm run build`
Expected: Build succeeds without errors

**Step 2: Test all 3 languages by switching**
**Step 3: Verify all pages render correctly**
**Step 4: Final commit if any fixes needed**

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-6 | Setup, i18n, translations, theme |
| 2 | 7-9 | Navbar, Footer, LanguageSwitcher |
| 3 | 10-17 | Homepage sections with GSAP |
| 4 | 18-23 | Company pages (5) |
| 5 | 24-26 | Brand pages (3) |
| 6 | 27-31 | Product pages (8) |
| 7 | 32-35 | Blog, FAQ, Contact |
| 8 | 36-37 | Polish and verification |

**Total: 37 tasks**
