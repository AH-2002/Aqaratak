import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Ignore API, _next, and static files
  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || /\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Check if the URL already includes a valid locale
  const locales = ["en", "ar"];
  const hasLocale = locales.some(locale => pathname.startsWith(`/${locale}/`));

  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};
