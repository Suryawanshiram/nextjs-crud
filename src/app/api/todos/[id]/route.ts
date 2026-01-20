import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import { Todo } from "@/models/items";
import { auth, verifyToken } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params; // ✅ REQUIRED in Next 16

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid todo id" }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const userId = verifyToken(token).userId;

    const body = await req.json();

    const updatedTodo = await Todo.findOneAndUpdate({ _id: id, userId }, body, {
      new: true,
    });

    if (!updatedTodo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params; // ✅ REQUIRED

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
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 },
    );
  }
}

// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import connectDB from "@/lib/db";
// import { Todo } from "@/models/items";
// import { verifyToken } from "@/lib/auth";
// // import { updateTodoSchema } from "@/lib/validators";

// type Params = {
//   params: { id: string };
// };

// function getUserId(req: Request) {
//   const auth = req.headers.get("authorization");
//   const token = auth?.replace("Bearer ", "").trim();
//   if (!token) throw new Error("Unauthorized");
//   return verifyToken(token).userId;
// }

// export async function PATCH(req: Request, { params }: { params: any }) {
//   try {
//     await connectDB();

//     // IMPORTANT: unwrap params
//     const { id } = await params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return NextResponse.json({ error: "Invalid todo id" }, { status: 400 });
//     }

//     const body = await req.json();
//     const updatedTodo = await Todo.findByIdAndUpdate(id, body, {
//       new: true,
//     });

//     if (!updatedTodo) {
//       return NextResponse.json({ error: "Todo not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedTodo, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 },
//     );
//   }
// }
