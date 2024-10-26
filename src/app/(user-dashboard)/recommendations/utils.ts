import { Response } from "../profile/questions/types";

export const isProfileComplete = (responses: Response) => {
  // Define which fields are essential for profile completion
  const essentialFields = [
    responses.ageGroup,
    responses.gender,
    responses.skinType,
    responses.skinConcerns?.length > 0,
    responses.selectedCategories?.length > 0,
  ];

  // Check if all essential fields have been filled out
  return essentialFields.every((field) => field && field !== "");
};
