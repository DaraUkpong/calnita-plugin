// app/components/BottomNav.tsx
"use client";
import React, { FC } from "react";
import BottomNavButton from "./BottomNavButton";
import { usePathname } from "next/navigation";

export const BottomNav: FC = () => {
  const pathname = usePathname();

  //console.log("Current pathname:", pathname);

  // Function to determine active button based on current path
  // const isActive = (path: string) => pathname === path;

  const isActive = (path: string) => {
    const normalizedPathname = pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
    const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
    const isActiveRoute = normalizedPathname === normalizedPath;
    //console.log(`Checking ${path}: ${isActiveRoute}`);
    return isActiveRoute;
  };

  return (
    // Outer wrapper to position the BottomNav at the bottom of the page
    //<div className="fixed left-0 bottom-0 w-full"> // the layout placement is handled in the shared layout
    <div className="flex items-center justify-center w-full backdrop-blur-[20px] bg-[#A3A3A31A] rounded-bl-[20px] rounded-br-[20px] h-[68px] ">
      {/* The Outer Container with the reserved 50px + 10px(for the closing button icon width and positioning respectively) space on the right */}
      <div className="flex items-center justify-center h-full w-[calc(100%-60px)]">
        {/* Inner div taking up 72% of the parent container width (approx. 327/451 ratio) */}
        <div className="flex flex-row justify-between  items-center w-[72%] h-[40px] ">
          <BottomNavButton
            path="/recommendations"
            imgSrc="/assets/foryou.png"
            label="For You"
            isSelected={isActive("/recommendations")}
          />
          <BottomNavButton
            path="/routine"
            imgSrc="/assets/routine.png"
            label="Routine"
            isSelected={isActive("/routine")}
          />
          <BottomNavButton
            path="/share"
            imgSrc="/assets/share.png"
            label="Share"
            isSelected={isActive("/share")}
          />
          <BottomNavButton
            path="/aichat"
            imgSrc="/assets/aichat.png"
            label="AI Chat"
            isSelected={isActive("/aichat")}
          />
        </div>
      </div>

      {/* Reserved 50px + 10px space on the right */}
      <div className="w-[60px] h-full"></div>
    </div>
    //</div>
  );
};