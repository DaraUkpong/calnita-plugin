import { BottomNav } from "@/components/BottomNav";
import { AttentionProvider } from "@/components/BottomNav/AttentionContext";
import React from "react";

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <AttentionProvider>
        {/* Main content area */}
        <main className="flex-1 overflow-auto ">{children}</main>

        {/* Shared Bottom Navigation */}
        <BottomNav />
      </AttentionProvider>
    </div>
  );
}
