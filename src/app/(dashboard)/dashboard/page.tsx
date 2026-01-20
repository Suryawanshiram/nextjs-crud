"use client";

import { useTodos } from "@/hooks/useFetch";

export default function DashboardPage() {
  const { todos, loading, error } = useTodos();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {todos.map((todo) => (
        <div key={todo._id} className="border p-4 rounded">
          {todo.title}
        </div>
      ))}
    </div>
  );
}

// "use client";

// import { useTodos } from "@/hooks/useFetch";

// export default function DashboardPage() {
//   const { todos, loading, error } = useTodos();
//   console.log(todos);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {todos?.map((todo) => (
//         <div key={todo._id}>{todo?.title}</div>
//       ))}
//     </div>
//   );
// }
