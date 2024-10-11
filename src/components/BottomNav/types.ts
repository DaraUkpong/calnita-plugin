export type TabKey =
  | "profile"
  | "recommendations"
  | "routine"
  | "share"
  | "aichat";

export type AttentionState = Record<TabKey, boolean>;
