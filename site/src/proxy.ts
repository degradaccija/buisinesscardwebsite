import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname !== "/") return NextResponse.next();

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let locale = "en";
  if (cookieLocale === "en" || cookieLocale === "lv") {
    locale = cookieLocale;
  } else {
    const acceptLanguage = request.headers.get("accept-language") ?? "";
    if (acceptLanguage.toLowerCase().startsWith("lv")) locale = "lv";
  }

  return NextResponse.redirect(new URL(`/${locale}`, request.url));
}

export const config = {
  matcher: ["/"],
};
