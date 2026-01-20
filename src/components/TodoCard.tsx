"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TodoCardProps } from "@/types/todo";

const TodoCard = ({ todo, onSave, onDelete }: TodoCardProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(todo.title);
      setDescription(todo.description ?? "");
    }
  }, [open, todo]);

  const handleSave = async () => {
    const updatedTodo = {
      ...todo,
      title,
      description,
    };

    try {
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      if (!res.ok) {
        throw new Error("Failed to update todo");
      }

      const data = await res.json();
      onSave(data); // update parent state
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Update failed. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this todo?")) return;

    try {
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      onDelete(todo._id);
    } catch (err) {
      console.error("Delete error:", err);
      alert(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <>
      <Card className="w-full p-4 max-w-md">
        <CardHeader className="flex flex-row items-start justify-between py-3">
          <div>
            <CardTitle>{todo.title}</CardTitle>
            {todo.description && (
              <CardDescription className="text-sm mt-4">
                {todo.description}
              </CardDescription>
            )}
          </div>

          <div className="flex gap-3">
            <CardAction
              onClick={() => setOpen(true)}
              className="cursor-pointer text-blue-600"
            >
              <Edit size={18} />
            </CardAction>

            <CardAction
              onClick={handleDelete}
              className="cursor-pointer text-red-600"
            >
              <Trash2 size={18} />
            </CardAction>
          </div>
        </CardHeader>
      </Card>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex flex-col h-full p-0">
          <SheetHeader className="p-6 border-b">
            <SheetTitle>Edit Todo</SheetTitle>
            <SheetDescription>Modify the task details below.</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <input
                className="w-full border rounded px-3 py-2 mt-1"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full border rounded px-3 py-3 mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="border-t p-4">
            <Button className="w-full" onClick={handleSave}>
              Save
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TodoCard;

// "use client";

// import { useEffect, useState } from "react";
// import {
//   Card,
//   CardAction,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { Edit } from "lucide-react";
// import { Button } from "./ui/button";

// interface Todo {
//   _id: string;
//   title: string;
//   description?: string;
// }

// interface TodoCardProps {
//   todo: Todo;
// }

// const TodoCard = ({ todo }: TodoCardProps) => {
//   const [open, setOpen] = useState(false);

//   // ✅ always start empty
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   // ✅ hydrate when sheet opens
//   useEffect(() => {
//     if (open) {
//       setTitle(() => todo?.title ?? "");
//       setDescription(todo?.description ?? "");
//     }
//   }, [open, todo]);

//   console.log(todo);

//   const handleSave = () => {
//     console.log("Save todo:", todo._id);
//   };

//   return (
//     <>
//       {/* CARD */}
//       <Card className="w-full p-4 max-w-md">
//         <CardHeader className="flex flex-row items-start justify-between py-3">
//           <div>
//             <CardTitle>{todo?.title}</CardTitle>
//             {todo?.description && (
//               <CardDescription className="text-sm mt-4">
//                 {todo?.description}
//               </CardDescription>
//             )}
//           </div>

//           <CardAction
//             onClick={() => setOpen(true)}
//             className="cursor-pointer text-blue-600"
//           >
//             <Edit size={18} />
//           </CardAction>
//         </CardHeader>
//       </Card>

//       {/* EDIT SHEET */}
//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetContent className="flex flex-col h-full p-0">
//           {/* HEADER */}
//           <SheetHeader className="p-6 border-b">
//             <SheetTitle>Edit Todo</SheetTitle>
//             <SheetDescription>Modify the task details below.</SheetDescription>
//           </SheetHeader>

//           {/* SCROLLABLE FORM */}
//           <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
//             <div>
//               <label className="text-sm font-medium">Title</label>
//               <input
//                 className="w-full border rounded px-3 py-2 mt-1"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Description</label>
//               <textarea
//                 className="w-full border rounded px-3 py-3 mt-1"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* FIXED FOOTER */}
//           <div className="border-t p-4">
//             <Button className="w-full" onClick={handleSave}>
//               Save
//             </Button>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// };

// export default TodoCard;

// import {
//   Card,
//   CardAction,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Edit } from "lucide-react";

// interface TodoCardProps {
//   title: string;
//   description?: string;
//   onActionClick?: () => void;
// }

// const TodoCard = ({ title, description, onActionClick }: TodoCardProps) => {
//   return (
//     <Card className="w-full p-4 max-w-md">
//       <CardHeader className="flex flex-row items-start justify-between py-3">
//         <div>
//           <CardTitle>{title}</CardTitle>
//           {description && (
//             <CardDescription className="text-sm mt-4">
//               {description}
//             </CardDescription>
//           )}
//         </div>

//         {onActionClick && (
//           <CardAction
//             onClick={onActionClick}
//             className="cursor-pointer text-sm text-blue-600"
//           >
//             <Edit />
//           </CardAction>
//         )}
//       </CardHeader>
//     </Card>
//   );
// };

// export default TodoCard;
