import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/lib/auth";
import { Todo } from "@/models/items";
import { createTodoSchema } from "@/lib/validators";

export async function GET() {
  await connectDB();

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todos = await Todo.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ data: todos });
}

export async function POST(req: Request) {
  await connectDB();

  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createTodoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const todo = await Todo.create({
    ...parsed.data,
    userId: session.user.id,
  });

  return NextResponse.json(todo, { status: 201 });
}

// import connectDB from "@/lib/db";
// import { createTodoSchema } from "@/lib/validators";
// import { Todo } from "@/models/items";
// // import mongoose from "mongoose";
// import { NextResponse } from "next/server";
// import { verifyToken } from "@/lib/auth";
// // import { auth } from "@/lib/auth";
// // import { cookies } from "next/headers";

// const getBaseUrl = () => {
//   if (typeof window !== "undefined") {
//     return ""; // browser → relative works
//   }

//   return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
// };

// export async function fetchTodos(): Promise<Todo[]> {
//   const res = await fetch(`${getBaseUrl()}/api/todos`, {
//     method: "GET",
//     credentials: "include",
//     cache: "no-store",
//   });

//   const text = await res.text();
//   const json = text ? JSON.parse(text) : {};

//   if (!res.ok) {
//     throw new Error(json.error || "Unauthorized");
//   }

//   return json.data;
// }

// // export async function GET(req: Request) {
// //   try {
// //     await connectDB();

// //     // -----------------------
// //     // 1) AUTH (JWT ONLY)
// //     // -----------------------
// //     const authHeader = req.headers.get("authorization");
// //     const token = authHeader?.replace("Bearer ", "").trim();
// //     console.log(token);

// //     if (!token) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     const decoded = verifyToken(token);

// //     if (!decoded?.userId) {
// //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// //     }

// //     // -----------------------
// //     // 2) VALIDATION
// //     // -----------------------
// //     const { searchParams } = new URL(req.url);
// //     const queryObject = Object.fromEntries(searchParams.entries());

// //     const parsed = getTodosQuerySchema.safeParse(queryObject);
// //     if (!parsed.success) {
// //       return NextResponse.json(
// //         { error: parsed.error.flatten().fieldErrors },
// //         { status: 400 },
// //       );
// //     }

// //     const { page, limit, completed } = parsed.data;
// //     const skip = (page - 1) * limit;

// //     // -----------------------
// //     // 3) FILTER (USER SCOPED)
// //     // -----------------------
// //     const filter: Record<string, unknown> = {
// //       userId: new mongoose.Types.ObjectId(decoded.userId),
// //     };

// //     if (completed !== undefined) {
// //       filter.completed = completed;
// //     }

// //     // -----------------------
// //     // 4) FETCH
// //     // -----------------------
// //     const [todos, total] = await Promise.all([
// //       Todo.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
// //       Todo.countDocuments(filter),
// //     ]);

// //     return NextResponse.json({
// //       data: todos,
// //       meta: {
// //         page,
// //         limit,
// //         total,
// //         totalPages: Math.ceil(total / limit),
// //       },
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return NextResponse.json(
// //       { error: "Failed to fetch todos" },
// //       { status: 500 },
// //     );
// //   }
// // }

// // Crete a new todo
// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const authHeader = req.headers.get("authorization"); // lowercase
//     const token = authHeader?.replace("Bearer ", "").trim();

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = verifyToken(token);

//     const { title, description } = await req.json();
//     const parsed = createTodoSchema.safeParse({ title, description });

//     if (!parsed.success) {
//       return NextResponse.json(
//         { error: parsed.error.flatten().fieldErrors },
//         { status: 400 },
//       );
//     }

//     const todo = await Todo.create({
//       title: parsed.data.title,
//       description: parsed.data.description,
//       userId: user.userId,
//     });

//     return NextResponse.json(todo, { status: 201 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Failed to create todo" },
//       { status: 500 },
//     );
//   }
// }
