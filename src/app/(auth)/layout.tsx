import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen max-w-7xl w-full flex items-center justify-center bg-gray-100 mx-auto rounded-2xl shadow-lg">
      {children}
    </div>
  );
}
