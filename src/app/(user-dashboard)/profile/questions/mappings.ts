import { AgeRange, User } from "@/services/graphql/types";
import { Response } from "./types";

// Utility function to map User data to Response format
export const mapUserToResponse = (user: User): Response => {
  //console.log("mapUserToResponse called with:", user);

  return {
    // Personal Info
    ageGroup: mapAgeRangeToString(user.personalInfo?.age),
    gender: user.personalInfo?.gender,
    country: user.personalInfo?.country,

    // Skin Care
    skinType: user.skinCare?.skinType,
    skinConcerns: user.skinCare?.primaryConcerns,
    skinProducts: user.skinCare?.currentProducts,
    skinCareRoutine: user.skinCare?.routine,
    skinAllergyDetails: user.skinCare?.allergies,

    // Fragrance
    scentPreferences: user.fragrance?.preferredScents,
    fragranceFrequency: user.fragrance?.perfumeUseFrequency,
    fragranceStrength: user.fragrance?.strengthPreference,
    fragranceAllergyDetails: user.fragrance?.allergies,

    // Makeup
    dailyMakeupProducts: user.makeup?.dailyProducts,
    makeupConcerns: user.makeup?.concerns,
    makeupFinishes: user.makeup?.preferredFinishes,
    makeupAllergyDetails: user.makeup?.allergies,

    // Hair Care
    hairType: user.hairCare?.hairType,
    hairConcerns: user.hairCare?.concerns,
    hairProducts: user.hairCare?.regularProducts,
    hairWashFrequency: user.hairCare?.washFrequency,
    heatStylingTools: user.hairCare?.heatStylingTools,
    hairAllergyDetails: user.hairCare?.allergies,

    // Product Preferences
    ingredientsToAvoid: user.productPreferences?.ingredientsToAvoid,
    preferredNaturalIngredients:
      user.productPreferences?.preferredNaturalIngredients,
    dietaryRestrictionsOrLifestylePreferences:
      user.productPreferences?.dietaryRestrictions,
    selectedCategories: user.productPreferences?.preferredCategories || [],
  };
};

// Helper function to convert AgeRange enum to string
const mapAgeRangeToString = (ageRange?: AgeRange): string => {
  switch (ageRange) {
    case AgeRange.Under_18:
      return "Under 18";
    case AgeRange.Between_18And_24:
      return "18-24";
    case AgeRange.Between_25And_34:
      return "25-34";
    case AgeRange.Between_35And_44:
      return "35-44";
    case AgeRange.Between_45And_54:
      return "45-54";
    case AgeRange.Between_55And_64:
      return "55-64";
    case AgeRange.Above_64:
      return "65+";
    default:
      return "";
  }
};
