import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
// import type { AuthTokenPayload } from "@/lib/auth";

export async function GET() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token) as AuthTokenPayload;

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

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const cookieStore = await cookies(); // ✅ MUST await
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ user: null }, { status: 401 });
//   }

//   return NextResponse.json({
//     user: JSON.parse(token),
//   });
// }
