import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import { Todo } from "@/models/items";
import { auth, verifyToken } from "@/lib/auth";
import { updateTodoSchema } from "@/lib/validators";

type Params = {
  params: { id: string };
};

function getUserId(req: Request) {
  const auth = req.headers.get("authorization");
  const token = auth?.replace("Bearer ", "").trim();
  if (!token) throw new Error("Unauthorized");
  return verifyToken(token).userId;
}

export async function PATCH(req: Request, { params }: { params: any }) {
  try {
    await connectDB();

    // IMPORTANT: unwrap params
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid todo id" }, { status: 400 });
    }

    const body = await req.json();
    const updatedTodo = await Todo.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔥 IMPORTANT: unwrap params
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid todo id" }, { status: 400 });
    }

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deletedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 },
    );
  }
}
// import { NextResponse, NextRequest } from "next/server";
// import mongoose from "mongoose";
// import connectDB from "@/lib/db";
// import { Todo } from "@/models/items";
// import { verifyToken } from "@/lib/auth";
// import { updateTodoSchema } from "@/lib/validators";

// type Params = {
//   params: Promise<{ id: string }>; // <-- important
// };

// export default async function handler(req: NextRequest, res: NextResponse) {
//   const { id } = req?.query;

//   if (req.method === "PATCH") {
//     const { title, description } = req.body;

//     // update in DB
//     const updated = await Todo.findByIdAndUpdate(
//       id,
//       {
//         title,
//         description,
//       },
//       { new: true },
//     );

//     return res.status(200).json(updated);
//   }

//   res.status(405).end();
// }

// export async function PATCH(req: Request, { params }: Params) {
//   try {
//     await connectDB();

//     // ✅ Unwrap params
//     const { id } = await params;

//     // Validate MongoDB ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid todo id" }, { status: 400 });
//     }

//     // Authorization header
//     const authHeader = req.headers.get("authorization");
//     const token = authHeader?.replace("Bearer ", "").trim();

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = verifyToken(token);

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Validate body
//     const body = await req.json();
//     const parsed = updateTodoSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         { error: parsed.error.flatten().fieldErrors },
//         { status: 400 },
//       );
//     }

//     // Update
//     const updatedTodo = await Todo.findOneAndUpdate(
//       { _id: id, userId: user.userId },
//       { $set: parsed.data },
//       { new: true },
//     );

//     if (!updatedTodo) {
//       return NextResponse.json(
//         { error: "Todo not found or access denied" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(updatedTodo, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json(
//       { error: "Failed to update todo" },
//       { status: 500 },
//     );
//   }
// }

// export async function DELETE(req: Request, { params }: Params) {
//   try {
//     await connectDB();

//     // Unwrap params
//     const { id } = await params;

//     // 1) Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid todo id" }, { status: 400 });
//     }

//     // 2) Auth header
//     const authHeader = req.headers.get("authorization");
//     const token = authHeader?.replace("Bearer ", "").trim();

//     if (!token) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const user = await verifyToken(token);

//     if (!user) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 3) Delete only if user owns the todo
//     const deleted = await Todo.findOneAndDelete({
//       _id: id,
//       userId: user.userId,
//     });

//     if (!deleted) {
//       return NextResponse.json(
//         { error: "Todo not found or access denied" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(
//       { message: "Todo deleted successfully" },
//       { status: 200 },
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 },
//     );
//   }
// }
