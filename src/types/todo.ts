// src/types/todo.ts
export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoCardProps {
  todo: Todo;
  onSave: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
}

export interface AddTodoPopoverProps {
  onAdd: (todo: Todo) => void;
}
