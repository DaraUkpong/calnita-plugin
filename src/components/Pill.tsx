import React from "react";

interface PillProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const Pill: React.FC<PillProps> = ({ label, selected = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center h-[42px] px-4 rounded-full w-fit text-[16px] cursor-pointer transition-all
        ${selected ? "bg-[#222222] text-white" : "bg-[#F1F1F1] text-[#6A6868]"}
      `}
    >
      {label}
    </button>
  );
};

export default Pill;
