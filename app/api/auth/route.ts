import { NextResponse } from "next/server";

const AUTH_COOKIE = "portfolio-auth";
const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "nala123";

export async function POST(request: Request) {
  let password = "";

  try {
    const body = (await request.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (password !== SITE_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
