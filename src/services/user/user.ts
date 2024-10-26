import { graphqlClient } from "../graphql";
import { UPDATE_ME_MUTATION } from "../graphql/mutations";
import { ME_QUERY, USER_QUERY } from "../graphql/queries";
import { VariablesOf } from "../graphql/tada";

export const getMe = async () => {
  const response = await graphqlClient.request(ME_QUERY);
  return response;
};

export const getUser = async (id: string) => {
  const response = await graphqlClient.request(USER_QUERY, {
    id,
  });
  return response;
};

export const updateMe = async (
  input: VariablesOf<typeof UPDATE_ME_MUTATION>["input"]
) => {
  const response = await graphqlClient.request(UPDATE_ME_MUTATION, { input });
  return response.updateMe;
};
