import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "./i18n/config";

export function proxy(request: NextRequest) {
  const localeCookie = request.cookies.get("locale")?.value as Locale | undefined;

  if (localeCookie && locales.includes(localeCookie)) {
    return NextResponse.next();
  }

  // x-vercel-ip-country is set by Vercel at the edge; falls back to accept-language
  const country = request.headers.get("x-vercel-ip-country");
  let detectedLocale: Locale = defaultLocale;

  if (country === "DE" || country === "AT" || country === "CH") {
    detectedLocale = "de";
  } else if (country === "TR") {
    detectedLocale = "tr";
  } else {
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
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
