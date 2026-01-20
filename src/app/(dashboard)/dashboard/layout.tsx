import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}

// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const cookieStore = await cookies(); // ✅ MUST await
//   const token = cookieStore.get("token")?.value;

//   if (!token) {
//     redirect("/login");
//   }

//   return <>{children}</>;
// }
