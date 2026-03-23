import type { Metadata } from "next";
import { Inter, Outfit, Barlow, Instrument_Serif } from "next/font/google";
import { Geist } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import I18nProvider from "@/components/providers/I18nProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
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
      <body className={`${inter.variable} ${outfit.variable} ${barlow.variable} ${instrumentSerif.variable} ${geist.variable} font-sans antialiased`} suppressHydrationWarning>
        <I18nProvider locale={locale} messages={messages} timeZone="Europe/Berlin">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
