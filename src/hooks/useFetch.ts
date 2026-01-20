"use client";
import { useEffect, useState } from "react";
import { fetchTodos, Todo } from "@/lib/api/todos";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(todos);

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(() => {
        setTodos([]);
        setError("Please login");
      })
      .finally(() => setLoading(false));
  }, []);

  return { todos, loading, error };
}
