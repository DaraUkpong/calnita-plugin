import { gql } from "graphql-request";

export const AUTHENTICATE_OTP_MUTATION = gql`
  mutation AuthenticateOTP($email: String!, $otp: String!) {
    userEmailAuth(email: $email, otp: $otp) {
      user {
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
          preferredCategory
        }
      }
      code
      success
      authData {
        accessToken
        refreshToken
      }
    }
  }
`;
export const REQUEST_OTP_MUTATION = gql`
  mutation RequestOTP($email: String!) {
    requestOTP(email: $email) {
      code
    }
  }
`;
