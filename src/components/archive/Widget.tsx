"use client";

import React, { useState } from "react";

// Example of a mini web app
const MiniApp = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Mini Web App</h2>
      <p>This is a full-fledged mini application inside the widget!</p>
      {/* Add more functionality here */}
    </div>
  );
};

export const Widget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Image that acts as a trigger */}
      <img
        src="/path/to/your/image.png" // Provide the path to your image
        alt="Open Widget"
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="mt-2">
          <MiniApp />
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
