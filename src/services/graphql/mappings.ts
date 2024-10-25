import { Response } from "@/app/(user-dashboard)/profile/questions/types";
import { UpdateUserInput } from "./types";

export const mapResponsesToUserInput = (
  responses: Response
): UpdateUserInput => {
  return {
    // Map personal information
    personalInfo: {
      age: responses.ageGroup,
      gender: responses.gender,
      country: responses.country,
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
      //preferredCategories: responses.selectedCategories,//TODO add the support to the backend
      preferredCategory: responses.selectedCategories?.[0],
    },
  };
};
