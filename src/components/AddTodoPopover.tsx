"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AddTodoPopoverProps } from "@/types/todo";

export default function AddTodoPopover({ onAdd }: AddTodoPopoverProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await res.json();
      onAdd(newTodo);

      setTitle("");
      setDescription("");
      setOpen(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Add failed");
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Todo</Button>
      </SheetTrigger>

      <SheetContent className="max-w-lg mx-auto px-4">
        <SheetHeader>
          <SheetTitle>Add Todo</SheetTitle>
          <SheetDescription>Enter title & description</SheetDescription>
        </SheetHeader>

        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="mt-1"
            />
          </div>
        </div>

        <Button className="w-full mt-4" onClick={handleAdd}>
          Save Todo
        </Button>
      </SheetContent>
    </Sheet>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { AddTodoPopoverProps } from "@/types/todo";

// export default function AddTodoPopover({ onAdd }: AddTodoPopoverProps) {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleAdd = async () => {
//     if (!title.trim()) {
//       alert("Title is required");
//       return;
//     }

//     try {
//       const res = await fetch("/api/todos", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ title, description }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to add todo");
//       }

//       const newTodo = await res.json();
//       onAdd(newTodo);

//       setTitle("");
//       setDescription("");
//       setOpen(false);
//     } catch (err) {
//       alert(err instanceof Error ? err.message : "Add failed");
//     }
//   };

//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button>Add Todo</Button>
//       </SheetTrigger>

//       <SheetContent className="max-w-lg mx-auto">
//         <SheetHeader>
//           <SheetTitle>Add Todo</SheetTitle>
//           <SheetDescription>Enter title & description</SheetDescription>
//         </SheetHeader>

//         {/* Your Form */}
//         <div className="mt-4 space-y-4">
//           <input className="w-full border rounded p-2" placeholder="Title" />
//           <textarea
//             className="w-full border rounded p-2"
//             placeholder="Description"
//           />
//         </div>

//         <Button className="w-full mt-4">Save</Button>
//       </SheetContent>
//     </Sheet>
//     // <Popover open={open} onOpenChange={setOpen}>
//     //   <PopoverTrigger asChild>
//     //     <Button>Add Todo</Button>
//     //   </PopoverTrigger>

//     //   <PopoverContent className="w-[320px]">
//     //     <div className="space-y-3">
//     //       <div>
//     //         <label className="text-sm font-medium">Title</label>
//     //         <Input
//     //           value={title}
//     //           onChange={(e) => setTitle(e.target.value)}
//     //           placeholder="Enter todo title"
//     //           className="mt-1"
//     //         />
//     //       </div>

//     //       <div>
//     //         <label className="text-sm font-medium">Description</label>
//     //         <Textarea
//     //           value={description}
//     //           onChange={(e) => setDescription(e.target.value)}
//     //           placeholder="Enter description"
//     //           className="mt-1"
//     //         />
//     //       </div>

//     //       <Button className="w-full" onClick={handleAdd}>
//     //         Save Todo
//     //       </Button>
//     //     </div>
//     //   </PopoverContent>
//     // </Popover>
//   );
// }
