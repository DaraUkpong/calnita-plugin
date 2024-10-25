import Pill from "@/components/Pill";
import PillInput from "@/components/PillInput";
import React from "react";
import { useQuestionnaire } from "./context";
import {
  AGE_GROUPS,
  INGREDIENTS_TO_AVOID,
  Category,
  GENDERS,
  HAIR_CONCERNS,
  HAIR_TYPES,
  LIFESTYLE_PREFERENCES,
  MAKEUP_PRODUCTS,
  NATURAL_INGREDIENTS,
  ROUTINE_TYPES,
  SCENT_PREFERENCES,
  SKIN_CONCERNS,
  SKIN_PRODUCTS,
  SKIN_TYPES,
} from "./types";

interface QuestionLayoutProps {
  title: string; // Title of the question
  children: React.ReactNode; // Content passed inside the component
}

function QuestionLayout({ title, children }: QuestionLayoutProps) {
  return (
    <>
      <p className="text-[20px] text-[#222222] font-semibold ">{title}</p>

      {/**question-content is unused */}
      <div className="question-content mt-[60px]">{children}</div>
    </>
  );
}

export function Question0() {
  const { selectedCategories, setSelectedCategories } = useQuestionnaire();
  const categories: Category[] = [
    "Skin Care",
    "Fragrance",
    "Makeup",
    "Hair Care",
  ];

  //const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (category: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  return (
    <>
      <h1 className="md:text-4xl text-[35px] font-[600] mt-[84px] ">
        💖 Tell Us About Your Beauty Needs
      </h1>
      <p className="text-[20px] font-semibold mt-[25px] ">
        Select Your Preferred Category
      </p>
      <div className="mt-[31px] flex flex-col gap-[10px] flex-1 overflow-auto ">
        {categories.map((category) => (
          <Pill
            key={category}
            label={category}
            selected={selectedCategories.includes(category)}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>
    </>
  );
}

export function Question1A() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues = responses.skinType as string;

  const handleSelect = (value: string) => {
    updateResponse("skinType", value);
  };

  return (
    <QuestionLayout title="Select Your Skin Type">
      <div className="mt-[31px] flex flex-col gap-[10px] ">
        {SKIN_TYPES.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question1() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues = (responses.skinConcerns as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("skinConcerns", value, true);
  };

  const customInputValue = responses.customSkinConcern as string;

  const handleCustomInput = (value: string) => {
    if (value.trim()) {
      updateResponse("customSkinConcern", value);
    }
  };

  return (
    <QuestionLayout title="What is your primary skin concern?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {SKIN_CONCERNS.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
      <PillInput
        pillLabel="Others"
        placeholder="Type Concerns"
        value={customInputValue}
        onChange={handleCustomInput}
      />
    </QuestionLayout>
  );
}

export function Question2() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues = (responses.skinProducts as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("skinProducts", value, true);
  };

  const customInputValue = responses.customSkinProducts as string;

  const handleCustomInput = (value: string) => {
    if (value.trim()) {
      updateResponse("customSkinProducts", value);
    }
  };

  return (
    <QuestionLayout title="What skin care products do you currently use?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {SKIN_PRODUCTS.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
      <PillInput
        pillLabel="Makeup"
        placeholder="Type Product"
        value={customInputValue}
        onChange={handleCustomInput}
      />
    </QuestionLayout>
  );
}

export function Question3() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValue = responses.skinCareRoutine as string;

  const handleSelect = (value: string) => {
    updateResponse("skinCareRoutine", value);
  };

  return (
    <QuestionLayout title="How would you describe your skin care routine?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {ROUTINE_TYPES.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValue === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question4() {
  const { responses, updateResponse } = useQuestionnaire();

  const isNoSelected = responses.skinAllergies === false;

  const handleSelect = (value: boolean) => {
    updateResponse("skinAllergies", value);
    if (!value) {
      updateResponse("skinAllergyDetails", "");
    }
  };

  const inputValue = responses.skinAllergyDetails as string;

  const handleInput = (value: string) => {
    if (value.trim()) {
      updateResponse("skinAllergies", true);
      updateResponse("skinAllergyDetails", value);
    } else {
      updateResponse("skinAllergies", false); // Mark it as "No" when input is empty
      updateResponse("skinAllergyDetails", ""); // Clear allergy details
    }
  };

  return (
    <QuestionLayout title="Do you have any known allergies to skin care ingredients?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        <PillInput
          pillLabel="Yes"
          placeholder="Please Specify"
          value={inputValue}
          onChange={handleInput}
        />
        <Pill
          label="No"
          selected={isNoSelected}
          onClick={() => handleSelect(false)}
        />
      </div>
    </QuestionLayout>
  );
}

export function Question5() {
  const { responses, updateResponse } = useQuestionnaire();
  const options = ["Yes", "No", "No Preference"];

  const selectedValue = responses.fragranceFree as string;

  const handleSelect = (value: string) => {
    updateResponse("fragranceFree", value);
  };

  return (
    <QuestionLayout title="Do you prefer fragrance-free skincare products">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {options.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValue === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question6() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues = (responses.scentPreferences as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("scentPreferences", value, true);
  };

  const customInputValue = responses.customScentPreference as string;

  const handleCustomInput = (value: string) => {
    if (value.trim()) {
      updateResponse("customScentPreference", value);
    }
  };

  return (
    <QuestionLayout title="What type of scents do you prefer?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {SCENT_PREFERENCES.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
      <PillInput
        pillLabel="Others"
        placeholder="Type Scents"
        value={customInputValue}
        onChange={handleCustomInput}
      />
    </QuestionLayout>
  );
}

export function Question7() {
  const { responses, updateResponse } = useQuestionnaire();
  const frequencies = [
    "Daily",
    "Occasionally",
    "Special Events Only",
    "Rarely",
    "Never",
  ];

  const selectedValue = responses.fragranceFrequency as string;

  const handleSelect = (value: string) => {
    updateResponse("fragranceFrequency", value);
  };

  return (
    <QuestionLayout title=" How often do you wear perfume?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {frequencies.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValue === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question8() {
  const { responses, updateResponse } = useQuestionnaire();
  const preferences = ["Strong", "Moderate", "Subtle", "Sensitive"];

  const selectedValue = responses.fragranceStrength as string;

  const handleSelect = (value: string) => {
    updateResponse("fragranceStrength", value);
  };

  return (
    <QuestionLayout title="Do you prefer stronger or more subtle fragrances?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {preferences.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValue === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question9() {
  const { responses, updateResponse } = useQuestionnaire();

  const isNoSelected = responses.fragranceAllergies === false;

  const handleSelect = (value: boolean) => {
    updateResponse("fragranceAllergies", value);
    if (!value) {
      updateResponse("fragranceAllergyDetails", "");
    }
  };

  const inputValue = responses.fragranceAllergyDetails as string;

  const handleInput = (value: string) => {
    if (value.trim()) {
      updateResponse("fragranceAllergies", true);
      updateResponse("fragranceAllergyDetails", value);
    } else {
      updateResponse("fragranceAllergies", false);
      updateResponse("fragranceAllergyDetails", "");
    }
  };

  return (
    <QuestionLayout title="Are you sensitive or allergic to any specific fragrance ingredients?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        <PillInput
          pillLabel="Yes"
          placeholder="Please Specify"
          value={inputValue}
          onChange={handleInput}
        />
        <Pill
          label="No"
          selected={isNoSelected}
          onClick={() => handleSelect(false)}
        />
      </div>
    </QuestionLayout>
  );
}

export function Question10() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues = (responses.dailyMakeupProducts as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("dailyMakeupProducts", value, true);
  };

  return (
    <QuestionLayout title="Which makeup products do you use daily?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {MAKEUP_PRODUCTS.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question11() {
  const { responses, updateResponse } = useQuestionnaire();
  const concerns = [
    "Long-lasting",
    "Non-comedogenic",
    "Waterproof",
    "Full Coverage",
    "Lightweight",
    "Hydrating",
    "Mattifying",
  ];

  const selectedValues = (responses.makeupConcerns as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("makeupConcerns", value, true);
  };

  return (
    <QuestionLayout title="Do you have any particular makeup concerns?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {concerns.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question12() {
  const { responses, updateResponse } = useQuestionnaire();
  const finishes = ["Matte", "Dewy", "Natural", "Satin", "Luminous"];

  const selectedValues = (responses.makeupFinishes as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("makeupFinishes", value, true);
  };

  return (
    <QuestionLayout title="What are your preferred makeup finishes?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {finishes.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question13() {
  const { responses, updateResponse } = useQuestionnaire();

  const isNoSelected = responses.makeupAllergies === false;

  const handleSelect = (value: boolean) => {
    updateResponse("makeupAllergies", value);
    if (!value) {
      updateResponse("makeupAllergyDetails", "");
    }
  };

  const inputValue = responses.makeupAllergyDetails as string;

  const handleInput = (value: string) => {
    if (value.trim()) {
      updateResponse("makeupAllergies", true);
      updateResponse("makeupAllergyDetails", value);
    } else {
      updateResponse("makeupAllergies", false);
      updateResponse("makeupAllergyDetails", "");
    }
  };

  return (
    <QuestionLayout title="Are there any makeup ingredients you are allergic to or prefer to avoid?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        <PillInput
          pillLabel="Yes"
          placeholder="Please Specify"
          value={inputValue}
          onChange={handleInput}
        />
        <Pill
          label="No"
          selected={isNoSelected}
          onClick={() => handleSelect(false)}
        />
      </div>
    </QuestionLayout>
  );
}

export function Question14() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValue = responses.hairType as string;

  const handleSelect = (value: string) => {
    updateResponse("hairType", value);
  };

  return (
    <QuestionLayout title="What is your hair type?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {HAIR_TYPES.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValue === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question15() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues = (responses.hairConcerns as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("hairConcerns", value, true);
  };

  return (
    <QuestionLayout title="What are your main hair concerns?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {HAIR_CONCERNS.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question16() {
  const { responses, updateResponse } = useQuestionnaire();
  const products = [
    "Shampoo",
    "Conditioner",
    "Hair Mask",
    "Leave-in Conditioner",
    "Hair Oil",
    "Mousse",
    "Heat Protectant",
    "Hair Spray",
    "Serum",
  ];

  const selectedValues = (responses.hairProducts as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("hairProducts", value, true);
  };

  return (
    <QuestionLayout title="What hair care products do you use regularly?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {products.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question17() {
  const { responses, updateResponse } = useQuestionnaire();
  const frequencies = ["Daily", "Every Other Day", "Twice a Week", "Weekly"];

  const selectedValue = responses.hairWashFrequency as string;

  const handleSelect = (value: string) => {
    updateResponse("hairWashFrequency", value);
  };

  return (
    <QuestionLayout title="How often do you wash your hair?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {frequencies.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValue === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question18() {
  const { responses, updateResponse } = useQuestionnaire();
  const tools = ["Hair Dryer", "Straightener", "Curling Iron", "None"];

  const selectedValues = (responses.heatStylingTools as string[]) || [];

  /*const handleSelect = (value: string) => {
    updateResponse("heatStylingTools", value, true);
  };*/
  const handleSelect = (value: string) => {
    if (value === "None") {
      // If "None" is selected, clear other selections and only keep "None"
      updateResponse("heatStylingTools", ["None"]);
    } else {
      // If any tool is selected, remove "None" from the selection if present
      const newSelection = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value) // Deselect if already selected
        : [...selectedValues.filter((v) => v !== "None"), value]; // Deselect "None" and add the new selection

      updateResponse("heatStylingTools", newSelection);
    }
  };

  return (
    <QuestionLayout title="Do you use any heat styling tools?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {tools.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question19() {
  const { responses, updateResponse } = useQuestionnaire();

  const isNoSelected = responses.hairAllergies === false;

  const handleSelect = (value: boolean) => {
    updateResponse("hairAllergies", value);
    if (!value) {
      updateResponse("hairAllergyDetails", "");
    }
  };

  const inputValue = responses.hairAllergyDetails as string;

  const handleInput = (value: string) => {
    if (value.trim()) {
      updateResponse("hairAllergies", true);
      updateResponse("hairAllergyDetails", value);
    } else {
      updateResponse("hairAllergies", false);
      updateResponse("hairAllergyDetails", "");
    }
  };

  return (
    <QuestionLayout title="Are you allergic to any hair care ingredients?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        <PillInput
          pillLabel="Yes"
          placeholder="Please Specify"
          value={inputValue}
          onChange={handleInput}
        />
        <Pill
          label="No"
          selected={isNoSelected}
          onClick={() => handleSelect(false)}
        />
      </div>
    </QuestionLayout>
  );
}

export function Question20() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValue = responses.ageGroup as string;

  const handleSelect = (value: string) => {
    updateResponse("ageGroup", value);
  };

  return (
    <QuestionLayout title=" What is your age?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {AGE_GROUPS.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValue === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question21() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValue = responses.gender as string;

  const handleSelect = (value: string) => {
    updateResponse("gender", value);
  };

  return (
    <QuestionLayout title="What is your gender?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {GENDERS.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValue === option}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question22() {
  return (
    <QuestionLayout title="Which country are you located in?">
      <>{/* Dropdown for Country Selection */}</>
    </QuestionLayout>
  );
}

export function Question23() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues = (responses.ingredientsToAvoid as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("ingredientsToAvoid", value, true);
  };

  return (
    <QuestionLayout title="Are there any ingredients you prefer to avoid in your beauty products?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {INGREDIENTS_TO_AVOID.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question24() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues =
    (responses.dietaryRestrictionsOrLifestylePreferences as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("dietaryRestrictionsOrLifestylePreferences", value, true);
  };

  return (
    <QuestionLayout title="Do you have any dietary restrictions or lifestyle preferences that affect your beauty product choices?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {LIFESTYLE_PREFERENCES.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question25() {
  const { responses, updateResponse } = useQuestionnaire();

  const selectedValues =
    (responses.preferredNaturalIngredients as string[]) || [];

  const handleSelect = (value: string) => {
    updateResponse("preferredNaturalIngredients", value, true);
  };

  return (
    <QuestionLayout title="Are there any specific natural ingredients you prefer in your beauty products?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {NATURAL_INGREDIENTS.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={selectedValues.includes(option)}
            onClick={() => handleSelect(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}
