import React, { useEffect, useState } from "react";

interface DynamicTypewriterProps {
  text: string;
  typingSpeed?: number;
}

const DynamicTypewriter: React.FC<DynamicTypewriterProps> = ({
  text,
  typingSpeed = 100,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(() => text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [text, typingSpeed]);

  return (
    <div
      className="max-w-full"
      style={{ /*maxWidth: "81.6%",*/ overflowWrap: "break-word" }}
    >
      {displayedText}
    </div>
  );
};

export default DynamicTypewriter;
