// app/types/index.ts

export interface UserProfile {
    id: string;
    email: string;
    skinType: 'dry' | 'oily' | 'combination' | 'normal';
    skinConcerns: string[];
    hairType: string;
    preferredProductTypes: string[];
    allergies: string[];
  }
  
  export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    image: string;
    suitableSkinTypes: ('dry' | 'oily' | 'combination' | 'normal')[];
    targetedConcerns: string[];
    ingredients: string[];
  }
  
  export interface PartnerWebsite {
    id: string;
    name: string;
    url: string;
    apiKey: string;
  }