import { gql } from "graphql-request";

export const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe($input: UpdateUserInput!) {
    updateMe(input: $input) {
      code
      success
      message
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
          #preferredCategory
          preferredCategories
        }
      }
    }
  }
`;

export const EMAIL_AUTH_MUTATION = gql`
  mutation UserEmailAuth($email: String!, $otp: String!) {
    userEmailAuth(email: $email, otp: $otp) {
      code
      success
      message
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
          #preferredCategory
          preferredCategories
        }
      }
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
      success
      message
    }
  }
`;

export const GOOGLE_AUTH_MUTATION = gql`
  mutation UserGoogleAuth($googleIdToken: String, $googleAuthCode: String) {
    userGoogleAuth(
      googleIdToken: $googleIdToken
      googleAuthCode: $googleAuthCode
    ) {
      code
      success
      message
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
          #preferredCategory
          preferredCategories
        }
      }
      authData {
        accessToken
        refreshToken
      }
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation UserRefreshToken($refreshToken: String!) {
    userRefreshToken(refreshToken: $refreshToken) {
      code
      success
      message
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
          #preferredCategory
          preferredCategories
        }
      }
      authData {
        accessToken
        refreshToken
      }
    }
  }
`;
