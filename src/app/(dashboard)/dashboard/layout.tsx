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

  return (
    <div className="min-h-screen border p-4 max-w-7xl w-full mx-auto">
      {children}
    </div>
  );
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
