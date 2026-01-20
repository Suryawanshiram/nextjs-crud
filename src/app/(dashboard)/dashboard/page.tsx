"use client";

import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    router.push("/");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
