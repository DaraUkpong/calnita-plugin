import {
  Question1A,
  Question1,
  Question2,
  Question3,
  Question4,
  Question5,
  Question6,
  Question7,
  Question8,
  Question9,
  Question10,
  Question11,
  Question12,
  Question13,
  Question14,
  Question15,
  Question16,
  Question17,
  Question18,
  Question19,
  Question20,
  Question21,
  Question22,
  Question23,
  Question24,
  Question25,
} from "./components";
import { Category, Question } from "./types";

// Define placeholder question components (replace these with your actual imports)
/*const Question1 = () => <div>Question 1 Component</div>;
const Question2 = () => <div>Question 2 Component</div>;
const Question3 = () => <div>Question 3 Component</div>;
const Question4 = () => <div>Question 4 Component</div>;
const Question5 = () => <div>Question 5 Component</div>;
const Question6 = () => <div>Question 6 Component</div>;
const Question7 = () => <div>Question 7 Component</div>;
const Question8 = () => <div>Question 8 Component</div>;
const Question9 = () => <div>Question 9 Component</div>;
const Question10 = () => <div>Question 10 Component</div>;
const Question11 = () => <div>Question 11 Component</div>;
const Question12 = () => <div>Question 12 Component</div>;
const Question13 = () => <div>Question 13 Component</div>;
const Question14 = () => <div>Question 14 Component</div>;
const Question15 = () => <div>Question 15 Component</div>;
const Question16 = () => <div>Question 16 Component</div>;
const Question17 = () => <div>Question 17 Component</div>;
const Question18 = () => <div>Question 18 Component</div>;
const Question19 = () => <div>Question 19 Component</div>;
const Question20 = () => <div>Question 20 Component</div>;
const Question21 = () => <div>Question 21 Component</div>;
const Question22 = () => <div>Question 22 Component</div>;
const Question23 = () => <div>Question 23 Component</div>;
const Question24 = () => <div>Question 24 Component</div>;
const Question25 = () => <div>Question 25 Component</div>;
const Question1A = () => <div>Shared Question 1A Component</div>;*/

/**
 * Beauty Needs Questionnaire Structure
 *
 * Skin Care:
 * - Select Your Skin Type (Question1A)
 * - What is your primary skin concern? (Question1)
 * - What skin care products do you currently use? (Question2)
 * - How would you describe your skin care routine? (Question3) - Also in General
 * - Do you have any known allergies to skin care ingredients? (Question4)
 * - Do you prefer fragrance-free skincare products? (Question5)
 *
 * Fragrance:
 * - What type of scents do you prefer? (Question6)
 * - How often do you wear perfume? (Question7)
 * - Do you prefer stronger or more subtle fragrances? (Question8)
 * - Are you sensitive or allergic to any specific fragrance ingredients? (Question9)
 *
 * Makeup:
 * - Which makeup products do you use daily? (Question10)
 * - Select Your Skin Type (Question1A) - Duplicate from Skin Care
 * - Do you have any particular makeup concerns? (Question11)
 * - What are your preferred makeup finishes? (Question12)
 * - Are there any makeup ingredients you are allergic to or prefer to avoid? (Question13)
 *
 * Hair Care:
 * - What is your hair type? (Question14)
 * - What are your main hair concerns? (Question15)
 * - What hair care products do you use regularly? (Question16)
 * - How often do you wash your hair? (Question17)
 * - Do you use any heat styling tools? (Question18)
 * - Are you allergic to any hair care ingredients? (Question19)
 *
 * General Questions (asked regardless of selection):
 * - What is your age? (Question20)
 * - What is your gender? (Question21)
 * - Which country are you located in? (Question22)
 * - How would you describe your skin care routine? (Question3) - Duplicate, also in Skin Care
 * - Are there any ingredients you prefer to avoid in your beauty products? (Question23)
 * - Do you have any dietary restrictions or lifestyle preferences that affect your beauty product choices? (Question24)
 * - Are there any specific natural ingredients you prefer in your beauty products? (Question25)
 *
 * Note: Questions that appear in multiple categories (e.g., skin type, skin care routine)
 * will only be asked once if multiple categories are selected.
 */
export const questionsByCategory: Record<Category, Question[]> = {
  "Skin Care": [
    { id: "Question1A", component: Question1A },
    { id: "Question1", component: Question1 },
    { id: "Question2", component: Question2 },
    { id: "Question3", component: Question3 },
    { id: "Question4", component: Question4 },
    { id: "Question5", component: Question5 },
  ],
  Fragrance: [
    { id: "Question6", component: Question6 },
    { id: "Question7", component: Question7 },
    { id: "Question8", component: Question8 },
    { id: "Question9", component: Question9 },
  ],
  Makeup: [
    { id: "Question1A", component: Question1A },
    { id: "Question10", component: Question10 },
    { id: "Question11", component: Question11 },
    { id: "Question12", component: Question12 },
    { id: "Question13", component: Question13 },
  ],
  "Hair Care": [
    { id: "Question14", component: Question14 },
    { id: "Question15", component: Question15 },
    { id: "Question16", component: Question16 },
    { id: "Question17", component: Question17 },
    { id: "Question18", component: Question18 },
    { id: "Question19", component: Question19 },
  ],
  General: [
    { id: "Question20", component: Question20 },
    { id: "Question21", component: Question21 },
    { id: "Question22", component: Question22 },
    { id: "Question23", component: Question23 },
    { id: "Question24", component: Question24 },
    { id: "Question25", component: Question25 },
  ],
};
