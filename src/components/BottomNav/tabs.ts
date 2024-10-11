import { AttentionState } from "./types";

export const tabs: {
  path: string;
  imgSrc: string;
  label: string;
  key: keyof AttentionState;
}[] = [
  {
    path: "/recommendations",
    imgSrc: "/assets/foryou.png",
    label: "For You",
    key: "recommendations",
  },
  {
    path: "/routine",
    imgSrc: "/assets/routine.png",
    label: "Routine",
    key: "routine",
  },
  {
    path: "/aichat",
    imgSrc: "/assets/aichat.png",
    label: "AI Chat",
    key: "aichat",
  },
  {
    path: "/share",
    imgSrc: "/assets/share.png",
    label: "Share",
    key: "share",
  },
];
