import { graphqlClient, PARTNER_QUERY } from "../graphql";
import { PartnerQueryResponse } from "../graphql/types";

export const getPartner = async (id: string) => {
    const response = await graphqlClient.request<PartnerQueryResponse>(PARTNER_QUERY, {
      id,
    });
    return response;
  };