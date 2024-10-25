import { graphqlClient } from "../graphql";
import { UPDATE_ME_MUTATION } from "../graphql/mutations";
import { ME_QUERY, USER_QUERY } from "../graphql/queries";
import {
  UpdateUserInput,
  UserQueryResponse,
  UserMutationResponse,
  MeQueryResponse,
} from "../graphql/types";

export const getMe = async () => {
  const response = await graphqlClient.request<MeQueryResponse>(ME_QUERY);
  return response;
};

export const getUser = async (id: string) => {
  const response = await graphqlClient.request<UserQueryResponse>(USER_QUERY, {
    id,
  });
  return response;
};

export const updateMe = async (input: UpdateUserInput) => {
  const response = await graphqlClient.request<{
    updateMe: UserMutationResponse;
  }>(UPDATE_ME_MUTATION, { input });
  return response.updateMe;
};
