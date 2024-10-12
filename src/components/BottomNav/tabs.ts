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
    path: "/profile",
    imgSrc: "/assets/routine.png",
    label: "Profile",
    key: "profile",
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
