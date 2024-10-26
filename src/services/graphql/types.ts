import { GET_PARTNER_BY_ID, ME_QUERY, USER_QUERY } from "./queries";
import { graphql, ResultOf, VariablesOf } from "./tada";

export enum AgeRange {
  Above_64 = "ABOVE_64",
  Between_18And_24 = "BETWEEN_18_AND_24",
  Between_25And_34 = "BETWEEN_25_AND_34",
  Between_35And_44 = "BETWEEN_35_AND_44",
  Between_45And_54 = "BETWEEN_45_AND_54",
  Between_55And_64 = "BETWEEN_55_AND_64",
  Under_18 = "UNDER_18",
}

export type User = ResultOf<typeof ME_QUERY>["me"];
//export type MeQueryResult = ResultOf<typeof ME_QUERY>;
//export type UserQueryResult = ResultOf<typeof USER_QUERY>;
//export type UserQueryVariables = VariablesOf<typeof USER_QUERY>;
export type Partner = ResultOf<typeof GET_PARTNER_BY_ID>["partner"];
//export type PartnerQueryResult = ResultOf<typeof GET_PARTNER_BY_ID>;
//export type PartnerQueryVariables = VariablesOf<typeof GET_PARTNER_BY_ID>;
export type UpdateUserInput = ReturnType<
  typeof graphql.scalar<"UpdateUserInput">
>;
