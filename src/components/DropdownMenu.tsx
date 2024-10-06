// app/components/DropdownMenu.tsx
"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DropdownMenuProps {
  showMenu: boolean;
  onToggleMenu: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  showMenu,
  onToggleMenu,
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      /*callbackUrl: "/auth"*/
    });
    router.replace("/auth");
  };

  return (
    <>
      {showMenu && (
        <div className="absolute top-50 right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
          <ul className="py-2">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
              onClick={handleLogout}
            >
              Log Out
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default DropdownMenu;
