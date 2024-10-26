import { gql } from "graphql-request";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      personalInfo {
        age
        gender
        country
      }
      skinCare {
        skinType
        primaryConcerns
        currentProducts
        routine
        allergies
      }
      fragrance {
        preferredScents
        perfumeUseFrequency
        strengthPreference
        allergies
      }
      makeup {
        dailyProducts
        concerns
        preferredFinishes
        allergies
      }
      hairCare {
        hairType
        concerns
        regularProducts
        washFrequency
        heatStylingTools
        allergies
      }
      productPreferences {
        ingredientsToAvoid
        preferredNaturalIngredients
        dietaryRestrictions
        #preferredCategory
        preferredCategories
      }
    }
  }
`;

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      email
      personalInfo {
        age
        gender
        country
      }
      skinCare {
        skinType
        primaryConcerns
        currentProducts
        routine
        allergies
      }
      fragrance {
        preferredScents
        perfumeUseFrequency
        strengthPreference
        allergies
      }
      makeup {
        dailyProducts
        concerns
        preferredFinishes
        allergies
      }
      hairCare {
        hairType
        concerns
        regularProducts
        washFrequency
        heatStylingTools
        allergies
      }
      productPreferences {
        ingredientsToAvoid
        preferredNaturalIngredients
        dietaryRestrictions
        #preferredCategory
        preferredCategories
      }
    }
  }
`;
