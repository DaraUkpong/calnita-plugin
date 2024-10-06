import { BottomNav } from "@/components/BottomNav";
import React from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Main content area */}
      <main className="flex-1 overflow-auto ">{children}</main>

      {/* Shared Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
