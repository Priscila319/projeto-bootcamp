import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/pessoas", "/conhecimentos"];
const PUBLIC_PATHS = ["/login"];

export default function proxy(req) {
  const path = req.nextUrl.pathname;
  const token = req.cookies.get("autenticacaoToken")?.value;

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => path === p || path.startsWith(p + "/")
  );
  const isPublic = PUBLIC_PATHS.some(
    (p) => path === p || path.startsWith(p + "/")
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};