import { graphqlClient } from "../graphql/client";
import {
  EMAIL_AUTH_MUTATION,
  GOOGLE_AUTH_MUTATION,
  REFRESH_TOKEN_MUTATION,
  REQUEST_OTP_MUTATION,
} from "../graphql/mutations";
import { UserMutationResponse } from "../graphql/types";

export const authenticateWithEmail = async (email: string, otp: string) => {
  const response = await graphqlClient.request<{
    userEmailAuth: UserMutationResponse;
  }>(EMAIL_AUTH_MUTATION, { email, otp });
  return response.userEmailAuth;
};

export const requestOTP = async (email: string) => {
  const response = await graphqlClient.request<{
    requestOTP: UserMutationResponse;
  }>(REQUEST_OTP_MUTATION, { email });
  return response.requestOTP;
};

export const authenticateWithGoogle = async (
  googleIdToken?: string,
  googleAuthCode?: string
) => {
  const response = await graphqlClient.request<{
    userGoogleAuth: UserMutationResponse;
  }>(GOOGLE_AUTH_MUTATION, { googleIdToken, googleAuthCode });
  return response.userGoogleAuth;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await graphqlClient.request<{
    userRefreshToken: UserMutationResponse;
  }>(REFRESH_TOKEN_MUTATION, { refreshToken });
  return response.userRefreshToken;
};
