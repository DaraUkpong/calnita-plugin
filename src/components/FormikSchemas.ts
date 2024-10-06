import * as Yup from "yup";

export const AddProductValidationSchema = Yup.object({
  name: Yup.string().required("name is required"),
  desc: Yup.string().required("Product description  is required"),
  ingredients: Yup.array().required("ingredients  are required"),
  howto: Yup.string().required("Tutorial  is required"),
  category: Yup.object({
    subCategories: Yup.array().of(Yup.object({})),
    name: Yup.string().required("Product Category is required"),
  }).required("Pick  a category for your product"),
  productImage: Yup.mixed().required("Product Image  is required"),
  pricing: Yup.array()
    .of(
      Yup.object({
        weight: Yup.object({
          value: Yup.number().required("required"),
          unit: Yup.string().required("required"),
        }),
        salePrice: Yup.number().required("required"),
      })
    )
    .required("Atleast 1(one) weight/price pair is required"),
  qty: Yup.number().required("Quantity  is required"),
  status: Yup.string().required("Status  is required"),
});

export const OnboardingInitValues = {

  
    productPreferences: {
      preferredCategory: "Skincare",
      dietaryRestrictions: [],
      preferredNaturalIngredients: [],
      ingredientsToAvoid: []
    },
    fragrance: {
      allergies: "",
      perfumeUseFrequency: "",
      preferredScents: [],
      strengthPreference: ""
    },
    hairCare: {
      allergies: "",
      concerns: [],
      hairType: "",
      heatStylingTools: "",
      regularProducts: [],
      washFrequency: ""
    },
    makeup: {
      allergies: "",
      concerns: [],
      dailyProducts: [],
      preferredFinishes: []
    },
    personalInfo: {
      age: 0,
      country: "",
      gender: ""
    },
    skinCare: {
      skinType: "",
      primaryConcerns: [],
      currentProducts: [],
      routine: "",
      allergies: ""
    }
};

//    "productInput": {
//     "pricing": [
//       {
//         "weight": null,
//         "salePrice": null
//       }
//     ],
//     "category": {
//       "subCategories": [
//         {
//           "types": null,
//           "name": null
//         }
//       ],
//       "name": null
//     },
//     "coverPhoto": null,
//     "description": null,
//     "howToUse": null,
//     "ingredients": null,
//     "name": null,
//     "status": null
//   }
