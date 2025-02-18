import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(request: NextRequest) {
  const cookiesHeader = request.headers.get("cookie") || "";
  
  const cookies = parse(cookiesHeader);

  const refreshToken = cookies["refresh-token"];

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/autoryzacja/logowanie", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/konto", "/cart"],
};
