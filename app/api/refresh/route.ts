//refresh route
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const refreshToken = (await cookies()).get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const response = await fetch(process.env.BASE_URL + "/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const { accessToken } = await response.json();

      // Yeni accessToken'i güncelle
      (await cookies()).set("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 15, // 15 dakika
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || "Refresh failed" }, { status: 401 });
    }
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "An error occurred" },
      {
        status: 500,
      }
    );
  }
}