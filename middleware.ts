import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const refreshToken = req.cookies.get("refreshToken")?.value || "";
  // Eğer accessToken yoksa ve refreshToken varsa, yeni token almak için dene

  if (!token && refreshToken) {
    try {
      // BASE_URL kontrolü
      if (!process.env.BASE_URL) {
        console.error("BASE_URL is not defined in environment variables.");
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Yeni token almak için refresh API'sine istek at
      const refreshResponse = await fetch(
        `${process.env.BASE_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      // Başarılı bir yanıt alındığında
      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
 
        const response = NextResponse.next();

        // Yeni accessToken'ı çereze kaydet
        response.cookies.set("token", data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 15, // 15 dakika
        });

        return response;
      } else {
        console.error("Failed to refresh token:", await refreshResponse.text());
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Hem token hem refreshToken yoksa login sayfasına yönlendir
  if (!token && !refreshToken && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Sadece korumalı sayfalar için middleware çalıştır
export const config = {
  matcher: ["/products/:path*", "/products"],
};
