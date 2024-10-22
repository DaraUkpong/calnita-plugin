import React from "react";

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="h-[3.43px] w-full bg-[#F1F1F1] rounded-full">
      <div
        className="h-full bg-[#000000] rounded-full transition-all duration-300 ease-in-out "
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

interface ProgressBarProps {
  progress: number;
}
export default ProgressBar;
