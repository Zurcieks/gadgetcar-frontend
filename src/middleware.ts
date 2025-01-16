import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(request: NextRequest) {
  const cookiesHeader = request.headers.get("cookie") || "";  

  console.log("cookiesHeader:", cookiesHeader);  

  if (!cookiesHeader) {
    console.log("Brak ciasteczek");
  }

  const cookies = cookiesHeader ? parse(cookiesHeader) : {}; // Parsowanie ciasteczek tylko, gdy są dostępne

  console.log("Cookies:", cookies); // Logowanie ciasteczek

  const isLoggedIn = cookies.auth;
  console.log("Is Logged In:", isLoggedIn); // Logowanie statusu logowania

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url)); // Przekierowanie, jeśli użytkownik nie jest zalogowany
  }

  return NextResponse.next(); // Kontynuowanie, jeśli użytkownik jest zalogowany
}

export const config = {
  matcher: ["/account"],
};
