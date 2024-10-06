import { gql } from "graphql-request";

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateMe($input: UpdateUserInput!) {
    updateMe(input: $input) {
      code
      user {
        email
        id
        productPreferences {
          preferredCategory
        }
      }
      success
    }
  }
`;
