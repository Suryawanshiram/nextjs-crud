import { Schema, model, models, Types } from "mongoose";

export interface TodoDocument {
  title: string;
  description?: string;
  completed: boolean;
  userId: Types.ObjectId;
}

const TodoSchema = new Schema<TodoDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Todo = models.Todo || model<TodoDocument>("Todo", TodoSchema);
