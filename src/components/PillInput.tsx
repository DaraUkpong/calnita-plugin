import React, { useState, useRef } from "react";
import Pill from "./Pill";

interface PillInputProps {
  pillLabel: string; // The label for the pill button (e.g., "Others", "Yes")
  placeholder?: string; // Optional placeholder for the input field
  value?: string; // Controlled value for the input field
  onChange?: (newValue: string) => void; // Change handler for updating input value
}

const PillInput: React.FC<PillInputProps> = ({
  pillLabel,
  placeholder = "Enter text here...",
  value,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState("");

  const inputValue = value !== undefined ? value : internalValue; // Use controlled value if provided
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // If an `onChange` prop is provided, use it; otherwise, update local state
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  // Function to focus on the input when the pill button is clicked
  const handlePillClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="flex items-center border border-[#E3E3E3] rounded-full w-fit">
      {/* Render the Pill component on the left side */}
      <Pill
        label={pillLabel}
        selected={Boolean(inputValue)} // Enable pill button if input has value
        onClick={handlePillClick}
      />

      {/* Input field beside the pill button */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="h-[42px] px-4 outline-none w-[250px] text-[16px] text-[#222222] placeholder-[#999999] placeholder:italic placeholder:font-light placeholder:text-[12px] rounded-full bg-transparent "
      />
    </div>
  );
};

export default PillInput;
