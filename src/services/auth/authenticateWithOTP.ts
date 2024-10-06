//import { formatGraphQLError } from "@/utils/formatGraphQLError";
import { AUTHENTICATE_OTP_MUTATION, graphqlClient } from "../graphql";

/**
 * Authenticate the user using the OTP and email via a GraphQL request.
 * @param email The user's email.
 * @param otp The OTP provided by the user.
 * @returns A user object if authentication is successful, otherwise null.
 */
export async function authenticateWithOTP(email?: string, otp?: string) {
  try {
    if (!email || !otp) {
      console.error("Missing email or OTP");
      return null;
    }

    const response: any = await graphqlClient.request(
      AUTHENTICATE_OTP_MUTATION,
      {
        email,
        otp,
      }
    );

    if (response.userEmailAuth && response.userEmailAuth.success) {
      const { user, authData } = response.userEmailAuth;

      graphqlClient.setHeader(
        "Authorization",
        `Bearer ${authData.accessToken}`
      );

      return {
        id: user.id,
        email: user.email,
        personalInfo: user.personalInfo,
        skinCare: user.skinCare,
        fragrance: user.fragrance,
        makeup: user.makeup,
        hairCare: user.hairCare,
        productPreferences: user.productPreferences,
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
      };
    } else {
      //console.error("Invalid OTP or unsuccessful authentication");
      return null;
    }
  } catch (error) {
    //const errorMessage = formatGraphQLError(error);
    //console.error("Error during GraphQL authentication:", errorMessage);
    return null;
  }
}
