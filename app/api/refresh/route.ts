//refresh route
import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST() {
  const refreshToken = (await cookies()).get("refreshToken");

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  try {
    const response = await axios.post(process.env.BASE_URL + "/auth/refresh", {
      refreshToken,
    });

    if (response.status === 200) {
      const { accessToken } = response.data;

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
      return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
    }
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data?.message || "An error occurred"
        : "An error occurred";

    const statusCode = axios.isAxiosError(error) && error.response ? error.response.status : 500;
    return NextResponse.json({ error: errorMessage }, {
      status: statusCode,
    });
  }
}
