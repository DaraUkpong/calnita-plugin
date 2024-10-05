"use client";

import React, { useState } from "react";

export const ClientWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-64">
          <button
            onClick={() => setIsOpen(false)}
            className="float-right text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
          <h2 className="text-lg font-bold mb-2">Widget Content</h2>
          <p>This is your widget content. Add your functionality here.</p>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Open Widget
        </button>
      )}
    </div>
  );
};
