//login route
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL + "/auth/login";
  const { username, password } = await request.json();

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();

      const cookieStore = await cookies();

      // Access token çerezi
      cookieStore.set("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 15, // 15 dakika
        path: "/",
      });

      // Refresh token çerezi
      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60, // 1 saat
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || "Login failed" }, { status: 401 });
    }
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred" },
      {
        status: 500,
      }
    );
  }
}