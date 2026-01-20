"use client";

import AddTodoPopover from "@/components/AddTodoPopover";
import TodoCard from "@/components/TodoCard";
import { useTodos } from "@/hooks/useFetch";
import { Todo } from "@/types/todo";

export default function DashboardPage() {
  const { todos, loading, error, setTodos } = useTodos();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // console.log(todos);

  const addTodo = (todo: Todo) => {
    setTodos((prev) => [todo, ...prev]);
  };

  // update todo locally
  const updateTodo = (updatedTodo: Todo) => {
    setTodos((prev) =>
      prev?.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Todos</h1>
        <AddTodoPopover onAdd={addTodo} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-7xl w-full">
        {Array.isArray(todos) &&
          todos.map((todo) => (
            <TodoCard
              key={todo._id}
              todo={todo}
              onSave={updateTodo}
              onDelete={deleteTodo}
            />
          ))}
      </div>
    </>
  );
}

// "use client";

// import TodoCard from "@/components/TodoCard";
// import { useTodos } from "@/hooks/useFetch";

// export default function DashboardPage() {
//   const { todos, loading, error } = useTodos();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-7xl w-full">
//       {todos.map((todo) => (
//         <TodoCard key={todo._id} todo={todo} />
//       ))}
//     </div>
//   );
// }

// "use client";

// import TodoCard from "@/components/TodoCard";
// import { useTodos } from "@/hooks/useFetch";

// export default function DashboardPage() {
//   const { todos, loading, error } = useTodos();

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-w-7xl w-full">
//       {todos.map((todo) => (
//         <TodoCard
//           key={todo._id}
//           title={todo.title}
//           description={todo.description}
//           onActionClick={() => {
//             console.log("Edit todo:", todo._id);
//           }}
//         />
//       ))}
//     </div>
//   );
// }

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
