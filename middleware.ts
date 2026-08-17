import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Remove port if present
  const host = hostname.split(":")[0];

  // Admin subdomain
  if (host === "admin.nexoratechnologiess.in") {
    // Prevent infinite rewrite
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = `/admin${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - _next static files
     * - favicon
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};