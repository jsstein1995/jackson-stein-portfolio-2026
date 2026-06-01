import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_COOKIE = "portfolio-auth";

function isPublicPath(pathname: string) {
  if (pathname.startsWith("/password")) return true;
  if (pathname.startsWith("/api/auth")) return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/assets")) return true;
  if (pathname === "/favicon.ico") return true;
  if (pathname === "/icon" || pathname.startsWith("/icon?")) return true;
  if (pathname === "/apple-icon" || pathname.startsWith("/apple-icon?")) {
    return true;
  }

  return /\.(?:ico|png|jpg|jpeg|gif|svg|webp|mov|mp4|glb|css|js|txt|xml|json|pdf)$/i.test(
    pathname
  );
}

function withPathnameHeader(response: NextResponse, pathname: string) {
  response.headers.set("x-pathname", pathname);
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return withPathnameHeader(NextResponse.next(), pathname);
  }

  const isAuthed = request.cookies.get(AUTH_COOKIE)?.value === "1";
  if (isAuthed) {
    return withPathnameHeader(NextResponse.next(), pathname);
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/password";
  loginUrl.searchParams.set(
    "from",
    `${pathname}${request.nextUrl.search}`
  );

  return withPathnameHeader(NextResponse.redirect(loginUrl), "/password");
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
