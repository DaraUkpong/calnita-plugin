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

type ResponseKeys = "skinType" | "skinConcerns" | "otherSkinConcern";

export type Response = Partial<
  Record<ResponseKeys, string | string[] | boolean | undefined>
>;
