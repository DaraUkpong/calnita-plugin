"use client";

import React, { createContext, useContext, useState } from "react";
import { AttentionState } from "./types";

interface AttentionContextType {
  attentionNeeded: AttentionState;
  setAttention: (tab: keyof AttentionState, needsAttention: boolean) => void;
}

const AttentionContext = createContext<AttentionContextType | undefined>(
  undefined
);

export const AttentionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [attentionNeeded, setAttentionNeeded] = useState<AttentionState>({
    profile: false,
    recommendations: false,
    routine: false,
    share: false,
    aichat: false,
  });

  const setAttention = (tab: keyof AttentionState, needsAttention: boolean) => {
    setAttentionNeeded((prev) => ({ ...prev, [tab]: needsAttention }));
  };

  return (
    <AttentionContext.Provider value={{ attentionNeeded, setAttention }}>
      {children}
    </AttentionContext.Provider>
  );
};

export const useAttention = () => {
  const context = useContext(AttentionContext);
  if (!context) {
    throw new Error("useAttention must be used within an AttentionProvider");
  }
  return context;
};
