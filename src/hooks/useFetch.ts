"use client";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const res = await fetch("/api/todos", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch todos");

        const json = await res.json();

        // normalize ONCE, here
        const todosArray = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
            ? json.data
            : [];

        setTodos(todosArray);
      } catch (err) {
        setError(err.message);
        setTodos([]); // ensure array invariant
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  return { todos, loading, error, setTodos };
}

// "use client";
// import { useEffect, useState } from "react";
// import { fetchTodos, Todo } from "@/lib/api/todos";

// export function useTodos() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   console.log(todos);

//   useEffect(() => {
//     fetchTodos()
//       .then(setTodos)
//       .catch(() => {
//         setTodos([]);
//         setError("Please login");
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   return { todos, loading, error };
// }
