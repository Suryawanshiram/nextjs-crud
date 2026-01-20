import User from "@/models/userModal";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";

// 1. POST /api/users/login

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  // Explicitly include password
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 },
  );

  response.cookies.set("token", "valid-token", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}

// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "@/models/userModal";
// import connectDB from "@/lib/db";

// // 1. POST /api/users/login

// export async function POST(request: NextRequest) {
//   try {
//     await connectDB();

//     const { email, password } = await request.json();

//     // 1. Validate input
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "Email and password are required" },
//         { status: 400 },
//       );
//     }

//     // 2. Find user (explicitly include password)
//     const user = await User.findOne({ email }).select("+password");

//     if (!user) {
//       return NextResponse.json(
//         { error: "Invalid email or password" },
//         { status: 401 },
//       );
//     }

//     // 3. Compare password
//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: "Invalid email or password" },
//         { status: 401 },
//       );
//     }

//     // 4. Generate JWT
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         email: user.email,
//       },
//       process.env.JWT_SECRET!,
//       { expiresIn: "7d" },
//     );

//     // 5. Return safe response
//     return NextResponse.json(
//       {
//         message: "Login successful",
//         token,
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//         },
//       },
//       { status: 200 },
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Internal server error", message: error.message },
//       { status: 500 },
//     );
//   }
// }
