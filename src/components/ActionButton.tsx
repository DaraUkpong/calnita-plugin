import React from "react";

interface ActionButtonProps {
  variant: "variant1" | "variant2";
  label: string;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  label,
  className,
  ...props
}) => {
  // Define base and variant-specific styles
  const baseStyles = `flex items-center justify-center text-white font-semibold text-[16px]`;
  const variantStyles =
    variant === "variant1"
      ? "w-[337px] h-[69px] rounded-tl-[20px] bg-[#000000] shadow-md gap-[12px] opacity-0"
      : "w-[204px] h-[69px] rounded-tl-[20px] bg-[#000000] shadow-md gap-[12px] opacity-0";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className ?? ""}`} // Concatenate styles conditionally
      {...props}
    >
      {label}
    </button>
  );
};
