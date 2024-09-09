import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    
    personalInfo?: {
      age?: number;
      country?: string;
      gender?: string;
    } ;
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
      preferredCategory?: string;
      dietaryRestrictions?: string[];
      preferredNaturalIngredients?: string[];
      ingredientsToAvoid?: string[];
    };
  }

  interface Session {
    user: {
      id: string;
      email: string;
      personalInfo?: {
        age?: number;
        country?: string;
        gender?: string;
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
        preferredCategory?: string;
        dietaryRestrictions?: string[];
        preferredNaturalIngredients?: string[];
        ingredientsToAvoid?: string[];
      };
    };
    
    accessToken: string;
    refreshToken: string;
    idToken:string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      email: string;
      personalInfo?: {
        age?: number;
        country?: string;
        gender?: string;
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
        preferredCategory?: string;
        dietaryRestrictions?: string[];
        preferredNaturalIngredients?: string[];
        ingredientsToAvoid?: string[];
      };
    };
    name: string;
    picture: string;
    sub: string;
    accessToken: string;
    refreshToken: string;
    idToken:string
  }
}

