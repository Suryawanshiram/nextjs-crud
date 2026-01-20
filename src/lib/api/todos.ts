export type Todo = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("http://localhost:3000/api/todos", {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error || "Unauthorized");
  }

  return json.data as Todo[];
}

// export type Todo = {
//   _id: string;
//   title: string;
//   description?: string;
//   completed: boolean;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export async function fetchTodos(): Promise<Todo[]> {
//   const res = await fetch("http://localhost:3000/api/todos", {
//     method: "GET",
//     credentials: "include",
//     cache: "no-store",
//   });

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json.error || "Unauthorized");
//   }

//   return json.data as Todo[];
// }

// export type Todo = {
//   _id: string;
//   title: string;
//   description?: string;
//   completed: boolean;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// /**
//  * Resolve API URL safely for client & server
//  */
// async function getApiUrl() {
//   // Browser
//   if (typeof window !== "undefined") {
//     return "/api/todos";
//   }

//   // Server (SSR / Server Components)
//   const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
//   if (!baseUrl) {
//     throw new Error("NEXT_PUBLIC_APP_URL is not defined");
//   }

//   return `${baseUrl}/api/todos`;
// }

// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";

// export async function GET() {
//   const session = await auth();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   return NextResponse.json({ data: [] });
// }

// /**
//  * Fetch todos for the authenticated user
//  * Auth handled via HTTP-only cookies
//  */
// export async function fetchTodos(): Promise<Todo[]> {
//   const res = await fetch(getApiUrl(), {
//     method: "GET",
//     credentials: "include", // ✅ cookie auth
//     cache: "no-store",
//   });

//   const contentType = res.headers.get("content-type");

//   if (!contentType?.includes("application/json")) {
//     throw new Error("API returned non-JSON response");
//   }

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json.error || "Unauthorized");
//   }

//   return json.data as Todo[];
// }

// export async function fetchTodos() {
//   const res = await fetch("/api/todos", {
//     credentials: "include",
//     cache: "no-store",
//   });

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json.error || "Unauthorized");
//   }

//   return json.data;
// }

// export async function fetchTodos(): Promise<Todo[]> {
//   const res = await fetch(getApiUrl(), {
//     method: "GET",
//     credentials: "include",
//     cache: "no-store",
//   });

//   const json = await res.json();

//   if (!res.ok) {
//     throw new Error(json.error || "Failed to fetch todos");
//   }

//   return json.data;
// }
