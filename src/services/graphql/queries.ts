import { graphql } from "./tada";

export const ME_QUERY = graphql(`
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
`);

export const USER_QUERY = graphql(`
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
`);

export const GET_PARTNER_BY_ID = graphql(`
  query Partner($id: ID!) {
    partner(id: $id) {
      id
      email
      name
      siteUrl
      products {
        id
        name
        category
        price
        imageUrl
        suitableSkinTypes
        targetedConcerns
        ingredients
        creator {
          id
          name
          email
          siteUrl
        }
      }
    }
  }
`);
