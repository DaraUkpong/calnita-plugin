import { Product } from "@/types";
import {
  SkinCare,
  HairCare,
  Cosmetics,
  Fragrances,
  ProductPreferences,
} from "@/lib/ProductUtils";

// Function to generate mock product recommendations based on user preferences
export function generateMockRecommendations(userPreferences: any): Product[] {
  // Provide a default structure for user preferences
  const defaultPreferences = {
    productPreferences: {
      preferredCategory: "",
      ingredientsToAvoid: [],
      dietaryRestrictions: [],
    },
  };

  // Merge userPreferences with defaultPreferences
  const preferences = { ...defaultPreferences, ...userPreferences };

  // Extract user preferences safely
  const preferredCategory = preferences.productPreferences.preferredCategory;
  const ingredientsToAvoid = preferences.productPreferences.ingredientsToAvoid;
  const dietaryRestrictions =
    preferences.productPreferences.dietaryRestrictions;

  // Predefined list of mock products
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Radiant Glow Serum",
      brand: "LuminousBeauty",
      category: "Skincare",
      price: 49.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["oily", "dry", "combination"],
      targetedConcerns: ["Dullness", "Uneven texture"],
      ingredients: ["Vitamin C", "Hyaluronic Acid", "Niacinamide"],
    },
    {
      id: "2",
      name: "Volumizing Mascara",
      brand: "LashMaster",
      category: "Makeup",
      price: 24.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["dry"],
      targetedConcerns: ["Thin lashes", "Lack of volume"],
      ingredients: ["Nylon fibers", "Vitamin E", "Keratin"],
    },
    {
      id: "3",
      name: "Hydrating Face Cream",
      brand: "AquaDerm",
      category: "Skincare",
      price: 39.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["dry", "normal", "combination"],
      targetedConcerns: ["Dryness", "Fine lines"],
      ingredients: ["Hyaluronic Acid", "Ceramides", "Glycerin"],
    },
    {
      id: "4",
      name: "Matte Lipstick",
      brand: "ColorPop",
      category: "Makeup",
      price: 19.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["oily"],
      targetedConcerns: ["Long-lasting color", "Dry lips"],
      ingredients: ["Shea Butter", "Vitamin E", "Silica"],
    },
    {
      id: "5",
      name: "Exfoliating Body Scrub",
      brand: "SmoothSkin",
      category: "Body Care",
      price: 34.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["combination"],
      targetedConcerns: ["Rough skin", "Uneven texture"],
      ingredients: ["Sea salt", "Coconut oil", "Vitamin E"],
    },
    {
      id: "6",
      name: "Curl Defining Cream",
      brand: "CurlMaster",
      category: "Haircare",
      price: 29.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["dry"],
      targetedConcerns: ["Frizz", "Undefined curls"],
      ingredients: ["Shea butter", "Argan oil", "Aloe vera"],
    },
    {
      id: "7",
      name: "Floral Eau de Parfum",
      brand: "BloomScent",
      category: "Fragrance",
      price: 79.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["oily"],
      targetedConcerns: ["Long-lasting scent", "Feminine fragrance"],
      ingredients: ["Rose extract", "Jasmine", "Bergamot"],
    },
    {
      id: "8",
      name: "Anti-Aging Night Serum",
      brand: "TimelessBeauty",
      category: "Skincare",
      price: 59.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["normal", "dry"],
      targetedConcerns: ["Fine lines", "Wrinkles", "Loss of firmness"],
      ingredients: ["Retinol", "Peptides", "Hyaluronic Acid"],
    },
    {
      id: "9",
      name: "Color-Protecting Shampoo",
      brand: "VibrantLocks",
      category: "Haircare",
      price: 22.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["normal"],
      targetedConcerns: ["Color fading", "Dry hair"],
      ingredients: ["Sunflower seed extract", "Vitamin B5", "Jojoba oil"],
    },
    {
      id: "10",
      name: "Mineral Sunscreen SPF 50",
      brand: "SunShield",
      category: "Skincare",
      price: 32.99,
      image:
        "https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg",
      suitableSkinTypes: ["oily", "combination"],
      targetedConcerns: ["Sun protection", "Non-greasy"],
      ingredients: ["Zinc oxide", "Titanium dioxide", "Green tea extract"],
    },
  ];

  // Extract user preferences
  /*const preferredCategory =
    userPreferences.productPreferences.preferredCategory;
  const ingredientsToAvoid =
    userPreferences.productPreferences.ingredientsToAvoid;

  const dietaryRestrictions =
    userPreferences.productPreferences.dietaryRestrictions;*/

  // Function to generate a single product based on category and subcategory
  const generateProduct = (category: string, subcategory: string): Product => {
    const id = Math.random().toString(36).substr(2, 9);
    const name = `${subcategory} ${category} Product`;
    const brand = `Brand${Math.floor(Math.random() * 10)}`;
    const price = Math.floor(Math.random() * 100) + 10;
    const image = `https://example.com/${category.toLowerCase()}-${id}.jpg`;
    const suitableSkinTypes = SkinCare.SkinType.filter(
      () => Math.random() > 0.5
    );
    const targetedConcerns =
      category === "Skincare"
        ? SkinCare.primaryConcern.filter(() => Math.random() > 0.5)
        : category === "Haircare"
        ? HairCare.concerns.filter(() => Math.random() > 0.5)
        : category === "Cosmetics"
        ? Cosmetics.concerns.filter(() => Math.random() > 0.5)
        : Fragrances.preferredScents.filter(() => Math.random() > 0.5);
    const ingredients = ProductPreferences.preferredNaturalIngredients.filter(
      () => Math.random() > 0.5
    );

    return {
      id,
      name,
      brand,
      category,
      price,
      image,
      suitableSkinTypes: suitableSkinTypes as (
        | "dry"
        | "oily"
        | "combination"
        | "normal"
      )[],
      targetedConcerns,
      ingredients,
    };
  };

  // Function to generate products for a specific category and subcategories
  const generateProductsForCategory = (
    category: string,
    subcategories: string[]
  ) => {
    console.log(subcategories);
    subcategories.forEach((subcategory) => {
      if (Math.random() > 0.5) {
        const product = generateProduct(category, subcategory);
        if (
          !product.ingredients.some((ingredient) =>
            ingredientsToAvoid.includes(ingredient)
          )
        ) {
          mockProducts.push(product);
          console.log(product);
        }
      }
    });
  };

  // Generate products based on the user's preferred category
  switch (preferredCategory) {
    case "Skincare":
      generateProductsForCategory("Skincare", SkinCare.currentProducts);
      mockProducts.push(
        ...mockProducts.filter((p) => p.category === "Skincare")
      );
      break;
    case "Haircare":
      generateProductsForCategory("Haircare", HairCare.regularProducts);
      mockProducts.push(
        ...mockProducts.filter((p) => p.category === "Haircare")
      );
      break;
    case "Cosmetics":
      generateProductsForCategory("Cosmetics", Cosmetics.dailyProducts);
      mockProducts.push(...mockProducts.filter((p) => p.category === "Makeup"));
      break;
    case "Fragrance":
      generateProductsForCategory("Fragrance", Fragrances.preferredScents);
      mockProducts.push(
        ...mockProducts.filter((p) => p.category === "Fragrance")
      );
      break;
    default:
      // Generate products for all categories if no specific preference
      generateProductsForCategory("Skincare", SkinCare.currentProducts);
      generateProductsForCategory("Haircare", HairCare.regularProducts);
      generateProductsForCategory("Cosmetics", Cosmetics.dailyProducts);
      generateProductsForCategory("Fragrance", Fragrances.preferredScents);
      // Include all predefined mock products
      break;
  }

  // Filter products based on dietary restrictions
  return mockProducts.filter((product) => {
    if (dietaryRestrictions.length === 0) return true; // If no restrictions, include all products

    return dietaryRestrictions.some((restriction: string) => {
      switch (restriction) {
        case "Vegan":
          return product.ingredients.includes("Animal-derived");
        case "Cruelty-free":
          return false; // Assume all mock products are cruelty-free, so we don't filter based on this
        case "Gluten-free":
          return product.ingredients.includes("Gluten");
        case "Organic":
          return !product.ingredients.some((i) =>
            i.toLowerCase().includes("organic")
          );
        case "Non-GMO":
          return product.ingredients.includes("GMO");
        case "Natural Ingredients":
          return !product.ingredients.some((i) =>
            ProductPreferences.preferredNaturalIngredients.includes(i)
          );
        default:
          return false;
      }
    });
  });
}

// Function to get unique filters from filtered products
export function getUniqueFilters(filteredProducts: Product[]) {
  const categories = Array.from(
    new Set(filteredProducts.map((p) => p.category))
  );
  const brands = Array.from(new Set(filteredProducts.map((p) => p.brand)));
  const ingredients = Array.from(
    new Set(filteredProducts.flatMap((p) => p.ingredients))
  );

  return { categories, brands, ingredients };
}

// Function to filter products based on selected filters
export function filterProductsByCriteria(
  products: Product[],
  selectedFilters: {
    category?: string[];
    brand?: string[];
    ingredient?: string[];
  }
) {
  return products.filter((product) => {
    const categoryMatch =
      !selectedFilters.category ||
      selectedFilters.category.includes(product.category);
    const brandMatch =
      !selectedFilters.brand || selectedFilters.brand.includes(product.brand);
    const ingredientMatch =
      !selectedFilters.ingredient ||
      product.ingredients.some((ingredient) =>
        selectedFilters.ingredient!.includes(ingredient)
      );

    return categoryMatch && brandMatch && ingredientMatch;
  });
}
