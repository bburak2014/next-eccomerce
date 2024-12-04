// logout route
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Cookie store (çerezleri almak için)
    const cookieStore = await cookies();

    // "token" ve "refreshToken" çerezlerini silme
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");

    // Başarılı çıkış sonrası anasayfaya yönlendirme
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred while logging out" }, { status: 500 });
  }
}
