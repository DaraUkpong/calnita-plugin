/*export type Category =
  | "Skin Care"
  | "Makeup"
  | "Fragrance"
  | "Hair Care"
  | "General";

export type Question = {
  id: string;
  component: React.ComponentType<unknown>; // Use React.ComponentType for dynamic components
};

type ResponseKeys = "skinType" | "skinConcerns" | "otherSkinConcern";

export type Response = Partial<
  Record<ResponseKeys, string | string[] | boolean | undefined>
>;
*/
// types.ts

export type Category =
  | "Skin Care"
  | "Makeup"
  | "Fragrance"
  | "Hair Care"
  | "General";

export type Question = {
  id: string;
  component: React.ComponentType<unknown>;
};

// All possible response keys with their specific types
export interface Response {
  // Initial Category Selection
  selectedCategories?: Category[];

  // Skin Care Related
  skinType?: string;
  skinConcerns?: string[];
  customSkinConcern?: string;
  skinProducts?: string[];
  customSkinProducts?: string;
  skinCareRoutine?: string;
  skinAllergies?: boolean;
  skinAllergyDetails?: string;

  // Fragrance Related
  fragranceFree?: "Yes" | "No" | "No Preference";
  scentPreferences?: string[];
  customScentPreference?: string;
  fragranceFrequency?: string;
  fragranceStrength?: string;
  fragranceAllergies?: boolean;
  fragranceAllergyDetails?: string;

  // Makeup Related
  dailyMakeupProducts?: string[];
  customMakeupProducts?: string;
  makeupConcerns?: string[];
  makeupFinishes?: string[];
  makeupAllergies?: boolean;
  makeupAllergyDetails?: string;

  // Hair Care Related
  hairType?: string;
  hairConcerns?: string[];
  hairProducts?: string[];
  //customHairProducts?: string;
  hairWashFrequency?: string;
  heatStylingTools?: string[];
  hairAllergies?: boolean;
  hairAllergyDetails?: string;

  // General/Profile Information
  ageGroup?: string;
  gender?: string;
  country?: string;

  // Product Preferences
  ingredientsToAvoid?: string[];
  //customAvoidIngredients?: string;
  dietaryRestrictionsOrLifestylePreferences?: string[];
  preferredNaturalIngredients?: string[];
  //customPreferredIngredients?: string;

  // Optional: Allow for dynamic string keys for future extensibility
  //[key: string]: any;
}

// Constants for the questionnaire
export const SKIN_TYPES = [
  "Oily",
  "Dry",
  "Combination",
  "Sensitive",
  "Normal",
] as const;

export const SKIN_CONCERNS = [
  "Acne",
  "Stretch Marks",
  "Teeth",
  "Hair Growth",
  "Mouth Odour",
  "Bald Hair",
  "Skin Type Problems",
  "Blackheads",
  "Redness",
  "Aging",
  "Hair Thinning",
] as const;

export const SKIN_PRODUCTS = [
  "Mist",
  "Spot Treatment",
  "Moisturizer",
  "Makeup Remover",
  "Exfoliator",
  "Toner",
  //"Spot Treatment",
  "Sunscreen",
  "Eye Cream",
  "Serum",
  "Essence",
] as const;

export const ROUTINE_TYPES = [
  "Simple (1-3 steps)",
  "Moderate (4-6 steps)",
  "Extensive (7+ steps)",
];

export const SCENT_PREFERENCES = [
  "Floral",
  "Woody",
  "Citrus",
  "Fresh",
  "Spicy",
  "Oriental",
  "Fruity",
  "Aquatic",
  "Musk",
  "Gourmand",
] as const;

export const MAKEUP_PRODUCTS = [
  "Foundation",
  "Concealer",
  "Powder",
  "Blush",
  "Highlighter",
  "Bronzer",
  "Eyeshadow",
  "Eyeliner",
  "Lip Gloss",
  "Mascara",
  "Eyebrow Pencil",
  "Lipstick",
  "Lip Balm",
  "Setting Spray",
] as const;

export const HAIR_TYPES = ["Straight", "Wavy", "Curly", "Coily"] as const;

export const HAIR_CONCERNS = [
  "Frizz",
  "Dryness",
  "Thinning",
  "Dandruff",
  "Oily Scalp",
  "Split Ends",
  "Breakage",
  "Color-treated",
  "Volume",
  "Hair Loss",
] as const;

export const AGE_GROUPS = [
  "Under 18",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55-64",
  "65+",
] as const;

export const INGREDIENTS_TO_AVOID = [
  "Parabens",
  "Sulfates",
  "Artificial Fragrances",
  "Phthalates",
  "Alcohol",
  "Silicones",
  "Mineral Oil",
  "Gluten",
  "Talc",
  "Formaldehyde",
] as const;

export const LIFESTYLE_PREFERENCES = [
  "Vegan",
  "Cruelty-free",
  "Gluten-free",
  "Organic",
  "Non-GMO",
  "Natural Ingredients",
  "None",
] as const;

export const NATURAL_INGREDIENTS = [
  "Aloe Vera",
  "Tea Tree Oil",
  "Argan Oil",
  "Shea Butter",
  "Coconut Oil",
  "Jojoba Oil",
  "Hyaluronic Acid",
  "Green Tea",
  "Chamomile",
  "Rosehip Oil",
  "Vitamin C",
  "Retinol",
] as const;

export const GENDERS = [
  "Female",
  "Male",
  "Non Binary",
  "Prefer not to say",
] as const;
