export type Category =
  | "Skin Care"
  | "Makeup"
  | "Fragrance"
  | "Hair Care"
  | "General";

export type Question = {
  id: string;
  component: React.ComponentType<any>; // Use React.ComponentType for dynamic components
};
