import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
// import type {  } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies(); // ✅ await
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);

    return NextResponse.json({
      user: {
        id: decoded.userId,
        email: decoded.email,
      },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
