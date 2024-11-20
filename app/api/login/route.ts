import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const baseUrl = process.env.BASE_URL + "/auth/login";
console.log("baseUrl",baseUrl)
  const { username, password } = await request.json();

  try {
    const response = await axios.post(baseUrl, { username, password });

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;

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
        maxAge: 60 * 60 * 24, // 1 gün
        path: "/",
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Login failed" }, { status: 401 });
    }
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data?.message || "An error occurred"
        : "An error occurred";

    const statusCode =
      axios.isAxiosError(error) && error.response ? error.response.status : 500;
    return NextResponse.json(
      { error: errorMessage },
      {
        status: statusCode,
      }
    );
  }
}
