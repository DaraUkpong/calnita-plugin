import { Response } from "@/app/(user-dashboard)/profile/questions/types";
import { AgeRange, UpdateUserInput } from "./types";

export const mapResponsesToUserInput = (
  responses: Response
): UpdateUserInput => {
  //console.log("mapResponsesToUserInput called with:", responses);
  return {
    // Map personal information
    personalInfo: {
      age: mapAgeGroupToEnum(responses.ageGroup || ""),
      gender: responses.gender,
      //country: responses.country,
    },

    // Map skin care-related information
    skinCare: {
      skinType: responses.skinType,
      primaryConcerns: responses.skinConcerns || [],
      currentProducts: responses.skinProducts || [],
      routine: responses.skinCareRoutine,
      allergies: responses.skinAllergyDetails,
    },

    // Map fragrance preferences
    fragrance: {
      preferredScents: responses.scentPreferences || [],
      perfumeUseFrequency: responses.fragranceFrequency,
      strengthPreference: responses.fragranceStrength,
      allergies: responses.fragranceAllergyDetails,
    },

    // Map makeup preferences
    makeup: {
      dailyProducts: responses.dailyMakeupProducts || [],
      concerns: responses.makeupConcerns || [],
      preferredFinishes: responses.makeupFinishes || [],
      allergies: responses.makeupAllergyDetails,
    },

    // Map hair care information
    hairCare: {
      hairType: responses.hairType,
      concerns: responses.hairConcerns || [],
      regularProducts: responses.hairProducts || [],
      washFrequency: responses.hairWashFrequency,
      heatStylingTools: responses.heatStylingTools,
      allergies: responses.hairAllergyDetails,
    },

    // Map general product preferences
    productPreferences: {
      ingredientsToAvoid: responses.ingredientsToAvoid || [],
      preferredNaturalIngredients: responses.preferredNaturalIngredients || [],
      dietaryRestrictions:
        responses.dietaryRestrictionsOrLifestylePreferences || [],
      preferredCategories: responses.selectedCategories,
      //preferredCategory: responses.selectedCategories?.[0],
    },
  };
};

const mapAgeGroupToEnum = (ageGroup: string): AgeRange | undefined => {
  switch (ageGroup) {
    case "Under 18":
      return AgeRange.Under_18;
    case "18-24":
      return AgeRange.Between_18And_24;
    case "25-34":
      return AgeRange.Between_25And_34;
    case "35-44":
      return AgeRange.Between_35And_44;
    case "45-54":
      return AgeRange.Between_45And_54;
    case "55-64":
      return AgeRange.Between_55And_64;
    case "65+":
      return AgeRange.Above_64;
    default:
      return undefined; // Handle any edge cases, like if the age group is not valid
  }
};
