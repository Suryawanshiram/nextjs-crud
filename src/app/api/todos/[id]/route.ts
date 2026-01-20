import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import { Todo } from "@/models/items";
import { verifyToken } from "@/lib/auth";
import { updateTodoSchema } from "@/lib/validators";

type Params = {
  params: Promise<{ id: string }>; // <-- important
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    await connectDB();

    // ✅ Unwrap params
    const { id } = await params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid todo id" }, { status: 400 });
    }

    // Authorization header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate body
    const body = await req.json();
    const parsed = updateTodoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    // Update
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, userId: user.userId },
      { $set: parsed.data },
      { new: true },
    );

    if (!updatedTodo) {
      return NextResponse.json(
        { error: "Todo not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    await connectDB();

    // Unwrap params
    const { id } = await params;

    // 1) Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid todo id" }, { status: 400 });
    }

    // 2) Auth header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3) Delete only if user owns the todo
    const deleted = await Todo.findOneAndDelete({
      _id: id,
      userId: user.userId,
    });

    if (!deleted) {
      return NextResponse.json(
        { error: "Todo not found or access denied" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
