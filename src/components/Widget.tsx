"use client";

import React, { useState } from "react";
import { XIcon } from "lucide-react";

const Widget: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message) {
      window.parent.postMessage({ type: "WIDGET_MESSAGE", message }, "*");
      setMessage("");
    }
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-xl flex flex-col">
      <div className="flex justify-between items-center p-4 bg-blue-500 text-white rounded-t-lg">
        <h3 className="font-bold">My Full App</h3>
        <button
          onClick={() => {
            window.parent.postMessage({ type: "WIDGET_CLOSE" }, "*");
          }}
        >
          <XIcon size={24} />
        </button>
      </div>
      <div className="p-4 flex-grow overflow-y-auto">
        {/* Main content goes here */}
        <h2>Welcome to My Full App</h2>
        <p>
          This is your main application content displayed within the iframe.
        </p>
      </div>
      <div className="p-4 border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default Widget;
