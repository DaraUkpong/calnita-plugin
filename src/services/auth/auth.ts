import { graphqlClient } from "../graphql/client";
import {
  EMAIL_AUTH_MUTATION,
  GOOGLE_AUTH_MUTATION,
  REFRESH_TOKEN_MUTATION,
  REQUEST_OTP_MUTATION,
} from "../graphql/mutations";

export const authenticateWithEmail = async (email: string, otp: string) => {
  const response = await graphqlClient.request(EMAIL_AUTH_MUTATION, {
    email,
    otp,
  });
  return response.userEmailAuth;
};

export const requestOTP = async (email: string) => {
  const response = await graphqlClient.request(REQUEST_OTP_MUTATION, { email });
  return response.requestOTP;
};

export const authenticateWithGoogle = async (
  googleIdToken?: string,
  googleAuthCode?: string
) => {
  const response = await graphqlClient.request(GOOGLE_AUTH_MUTATION, {
    googleIdToken,
    googleAuthCode,
  });
  return response.userGoogleAuth;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await graphqlClient.request(REFRESH_TOKEN_MUTATION, {
    refreshToken,
  });
  return response.userRefreshToken;
};
