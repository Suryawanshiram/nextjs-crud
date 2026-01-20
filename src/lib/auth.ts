import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface Session {
  user: {
    id: string;
    email?: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET missing");
}

/**
 * Generate JWT (used in login API)
 */
export function generateToken(payload: {
  userId: string;
  email?: string;
}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/**
 * Verify JWT (used in API routes)
 */
export function verifyToken(token: string): {
  userId: string;
  email?: string;
} {
  return jwt.verify(token, JWT_SECRET) as {
    userId: string;
    email?: string;
  };
}

/**
 * Read session from HTTP-only cookie
 */
export async function auth(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload = verifyToken(token);

    return {
      user: {
        id: payload.userId,
        email: payload.email,
      },
    };
  } catch {
    return null;
  }
}

// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export interface Session {
//   user: {
//     id: string;
//     email?: string;
//   };
// }

// const JWT_SECRET = process.env.JWT_SECRET!;
// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET missing");
// }

// /**
//  * Generate JWT (used in login API)
//  */
// export function generateToken(payload: {
//   userId: string;
//   email?: string;
// }): string {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
// }

// /**
//  * Verify JWT (used in API routes)
//  */
// export function verifyToken(token: string): {
//   userId: string;
//   email?: string;
// } {
//   return jwt.verify(token, JWT_SECRET) as {
//     userId: string;
//     email?: string;
//   };
// }

// /**
//  * Read session from HTTP-only cookie
//  */
// export async function auth(): Promise<Session | null> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) return null;

//   try {
//     const payload = verifyToken(token);

//     return {
//       user: {
//         id: payload.userId,
//         email: payload.email,
//       },
//     };
//   } catch {
//     return null;
//   }
// }

// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";

// export interface Session {
//   user: {
//     id: string;
//     email?: string;
//   };
// }

// const JWT_SECRET = process.env.JWT_SECRET!;
// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET missing");
// }

// /**
//  * Generate JWT (used in login API)
//  */
// export function generateToken(payload: {
//   userId: string;
//   email?: string;
// }): string {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
// }

// /**
//  * Verify JWT (used in API routes)
//  */
// export function verifyToken(token: string): {
//   userId: string;
//   email?: string;
// } {
//   return jwt.verify(token, JWT_SECRET) as {
//     userId: string;
//     email?: string;
//   };
// }

// /**
//  * Read session from HTTP-only cookie
//  */
// export async function auth(): Promise<Session | null> {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("token")?.value;

//   if (!token) return null;

//   try {
//     const payload = verifyToken(token);

//     return {
//       user: {
//         id: payload.userId,
//         email: payload.email,
//       },
//     };
//   } catch {
//     return null;
//   }
// }
