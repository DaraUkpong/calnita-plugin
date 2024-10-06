// app/components/ActionButton.tsx
"use client";
import React from "react";
import Image from "next/image";
//import Link from "next/link";
import { useRouter } from "next/navigation";

interface BottomNavButtonProps {
  imgSrc: string;
  label: string;
  path: string;
  isSelected?: boolean;
}

const BottomNavButton: React.FC<BottomNavButtonProps> = ({
  imgSrc,
  label,
  path,
  isSelected,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.replace(path); // Use replace to prevent history addition
  };
  return (
    //<Link href={path}>
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 rounded-full px-[15px] h-[40px] transition-colors duration-300 ease-in-out active:scale-95 whitespace-nowrap 
                ${
                  isSelected
                    ? "bg-[#222222] text-white"
                    : "bg-transparent text-black hover:bg-gray-200"
                }`}
    >
      <Image src={imgSrc} alt={label} width={30} height={34} />
      {isSelected && (
        <span className="font-semibold text-[14px] ">{label}</span>
      )}
    </button>
    //</Link>
  );
};

export default BottomNavButton;
