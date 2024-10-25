export enum AgeRange {
  UNDER_18 = "UNDER_18",
  BETWEEN_18_AND_24 = "BETWEEN_18_AND_24",
  BETWEEN_25_AND_34 = "BETWEEN_25_AND_34",
  BETWEEN_35_AND_44 = "BETWEEN_35_AND_44",
  BETWEEN_45_AND_54 = "BETWEEN_45_AND_54",
  BETWEEN_55_AND_64 = "BETWEEN_55_AND_64",
  ABOVE_64 = "ABOVE_64",
}

interface IMutationResponse {
  code: number;
  success: boolean;
  message: string;
}

interface AuthData {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  personalInfo?: {
    age?: AgeRange;
    gender?: string;
    country?: string;
  };
  skinCare?: {
    skinType?: string;
    primaryConcerns?: string[];
    currentProducts?: string[];
    routine?: string;
    allergies?: string;
  };
  fragrance?: {
    preferredScents?: string[];
    perfumeUseFrequency?: string;
    strengthPreference?: string;
    allergies?: string;
  };
  makeup?: {
    dailyProducts?: string[];
    concerns?: string[];
    preferredFinishes?: string[];
    allergies?: string;
  };
  hairCare?: {
    hairType?: string;
    concerns?: string[];
    regularProducts?: string[];
    washFrequency?: string;
    heatStylingTools?: string;
    allergies?: string;
  };
  productPreferences?: {
    ingredientsToAvoid?: string[];
    preferredNaturalIngredients?: string[];
    dietaryRestrictions?: string[];
    preferredCategory?: string;
  };
}

export interface UpdateUserInput {
  personalInfo?: {
    age?: AgeRange;
    gender?: string;
    country?: string;
  };
  skinCare?: {
    skinType?: string;
    primaryConcerns?: string[];
    currentProducts?: string[];
    routine?: string;
    allergies?: string;
  };
  fragrance?: {
    preferredScents?: string[];
    perfumeUseFrequency?: string;
    strengthPreference?: string;
    allergies?: string;
  };
  makeup?: {
    dailyProducts?: string[];
    concerns?: string[];
    preferredFinishes?: string[];
    allergies?: string;
  };
  hairCare?: {
    hairType?: string;
    concerns?: string[];
    regularProducts?: string[];
    washFrequency?: string;
    heatStylingTools?: string[];
    allergies?: string;
  };
  productPreferences?: {
    ingredientsToAvoid?: string[];
    preferredNaturalIngredients?: string[];
    dietaryRestrictions?: string[];
    preferredCategory?: string;
  };
}

//When using graphql-request, the client automatically unwraps the data layer
//but this is only used when making  request without the client
export interface GraphqlResponse<T> {
  data: T;
}

export interface MeQueryResponse {
  me: User;
}

export interface UserQueryResponse {
  user: User;
}

export interface UserMutationResponse extends IMutationResponse {
  user?: User;
  authData?: AuthData;
}
