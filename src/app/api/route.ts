import { NextResponse } from "next/server";
import { parse } from "cookie";

export async function GET(request: Request) {
  const cookiesHeader = request.headers.get("cookie") || "";
  const cookies = parse(cookiesHeader);

  const refreshToken = cookies["refresh-token"];

  return NextResponse.json({ isLoggedIn: !!refreshToken });
}
