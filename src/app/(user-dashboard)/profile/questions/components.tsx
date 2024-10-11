import Pill from "@/components/Pill";
import PillInput from "@/components/PillInput";
import React, { useState } from "react";
import { useQuestionnaire } from "./context";
import { Category } from "./types";

interface QuestionLayoutProps {
  title: string; // Title of the question
  children: React.ReactNode; // Content passed inside the component
}

function QuestionLayout({ title, children }: QuestionLayoutProps) {
  return (
    <>
      <p className="text-[20px] text-[#222222] font-semibold mt-[30px]">
        {title}
      </p>

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
  const skinTypes = ["Oily", "Dry", "Combination", "Sensitive", "Normal"];
  // const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const { responses, updateResponse } = useQuestionnaire();

  const selectedSkinType = responses.skinType as string | undefined;

  const handleSkinTypeClick = (label: string) => {
    // setSelectedSkinType(label);
    updateResponse("skinType", label);
  };

  return (
    <QuestionLayout title="Select Your Skin Type">
      <div className="mt-[31px] flex flex-col gap-[10px] ">
        {skinTypes.map((type) => (
          <Pill
            key={type}
            label={type}
            selected={selectedSkinType === type}
            onClick={() => handleSkinTypeClick(type)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question1() {
  const concerns = [
    "Acne",
    "Stretch Marks",
    "Teeth",
    "Hair Growth",
    "Mouth Odour",
    "Bald Hair",
    "Skin Type Problems",
    "Blackheads",
    "Redness",
    "Aging",
    "Hair Thinning",
  ];

  /*const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const handleConcernClick = (label: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };*/
  const { responses, updateResponse } = useQuestionnaire();

  const selectedConcerns = (responses.skinConcerns as string[]) || [];

  const handleConcernClick = (label: string) => {
    updateResponse("skinConcerns", label, true);
  };

  return (
    <QuestionLayout title="What is your primary skin concern?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {concerns.map((concern) => (
          <Pill
            key={concern}
            label={concern}
            selected={selectedConcerns.includes(concern)}
            onClick={() => handleConcernClick(concern)}
          />
        ))}
      </div>
      <PillInput pillLabel="Others" placeholder="Type Concerns" />
    </QuestionLayout>
  );
}

export function Question2() {
  const products = [
    "Mist",
    "Spot Treatment",
    "Moisturizer",
    "Makeup Remover",
    "Exfoliator",
    "Toner",
    //"Spot Treatment",
    "Sunscreen",
    "Eye Cream",
    "Serum",
    "Essence",
  ];

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductClick = (label: string) => {
    setSelectedProducts((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="What skin care products do you currently use?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {products.map((product) => (
          <Pill
            key={product}
            label={product}
            selected={selectedProducts.includes(product)}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
      <PillInput pillLabel="Makeup" placeholder="Type Product" />
    </QuestionLayout>
  );
}

export function Question3() {
  const routines = [
    "Simple (1-3 steps)",
    "Moderate (4-6 steps)",
    "Extensive (7+ steps)",
  ];

  const [selectedRoutine, setSelectedRoutine] = useState<string | null>(null);

  const handleRoutineClick = (label: string) => {
    setSelectedRoutine(label);
  };

  return (
    <QuestionLayout title="How would you describe your skin care routine?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {routines.map((routine) => (
          <Pill
            key={routine}
            label={routine}
            selected={selectedRoutine === routine}
            onClick={() => handleRoutineClick(routine)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question4() {
  const [hasAllergy, setHasAllergy] = useState<boolean>(false);
  const [allergyText, setAllergyText] = useState<string | undefined>("");

  const handleAllergyClick = (value: boolean) => {
    setHasAllergy(value);
    if (!value) {
      setAllergyText("");
    }
  };

  const handleInputChange = (newValue: string) => {
    setAllergyText(newValue);
    if (newValue !== "") {
      setHasAllergy(true);
    }
  };

  return (
    <QuestionLayout title="Do you have any known allergies to skin care ingredients?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        <PillInput
          pillLabel="Yes"
          placeholder="Please Specify"
          value={allergyText}
          onChange={handleInputChange}
        />
        <Pill
          label="No"
          selected={hasAllergy === false}
          onClick={() => handleAllergyClick(false)}
        />
      </div>
    </QuestionLayout>
  );
}

export function Question5() {
  const options = ["Yes", "No", "No Preference"];
  const [preference, setPreference] = useState<string | null>(null);

  return (
    <QuestionLayout title="Do you prefer fragrance-free skincare products">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {options.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={preference === option}
            onClick={() => setPreference(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question6() {
  const scentPreferences = [
    "Floral",
    "Woody",
    "Citrus",
    "Fresh",
    "Spicy",
    "Oriental",
    "Fruity",
    "Aquatic",
    "Musk",
    "Gourmand",
  ];

  const [selectedScents, setSelectedScents] = useState<string[]>([]);
  const [customScent, setCustomScent] = useState<string>("");

  const handleScentClick = (label: string) => {
    setSelectedScents((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="What type of scents do you prefer?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {scentPreferences.map((scent) => (
          <Pill
            key={scent}
            label={scent}
            selected={selectedScents.includes(scent)}
            onClick={() => handleScentClick(scent)}
          />
        ))}
      </div>
      <PillInput
        pillLabel="Others"
        placeholder="Type Scents"
        value={customScent}
        onChange={(e) => setCustomScent(e)}
      />
    </QuestionLayout>
  );
}

export function Question7() {
  const frequencies = [
    "Daily",
    "Occasionally",
    "Special Events Only",
    "Rarely",
    "Never",
  ];
  const [frequency, setFrequency] = useState<string | null>(null);

  return (
    <QuestionLayout title=" How often do you wear perfume?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {frequencies.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={frequency === option}
            onClick={() => setFrequency(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question8() {
  const preferences = ["Strong", "Moderate", "Subtle", "Sensitive"];

  const [preference, setPreference] = useState<string | null>(null);

  return (
    <QuestionLayout title="Do you prefer stronger or more subtle fragrances?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {preferences.map((option) => (
          <Pill
            key={option}
            label={option}
            selected={preference === option}
            onClick={() => setPreference(option)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question9() {
  const [hasAllergy, setHasAllergy] = useState<boolean>(false);
  const [allergyText, setAllergyText] = useState<string | undefined>("");

  const handleAllergyClick = (value: boolean) => {
    setHasAllergy(value);
    if (!value) {
      setAllergyText("");
    }
  };

  const handleInputChange = (newValue: string) => {
    setAllergyText(newValue);
    if (newValue !== "") {
      setHasAllergy(true);
    }
  };

  return (
    <QuestionLayout title="Are you sensitive or allergic to any specific fragrance ingredients?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        <PillInput
          pillLabel="Yes"
          placeholder="Please Specify"
          value={allergyText}
          onChange={handleInputChange}
        />
        <Pill
          label="No"
          selected={hasAllergy === false}
          onClick={() => handleAllergyClick(false)}
        />
      </div>
    </QuestionLayout>
  );
}

export function Question10() {
  const makeupProducts = [
    "Foundation",
    "Concealer",
    "Powder",
    "Blush",
    "Highlighter",
    "Bronzer",
    "Eyeshadow",
    "Eyeliner",
    "Lip Gloss",
    "Mascara",
    "Eyebrow Pencil",
    "Lipstick",
    "Lip Balm",
    "Setting Spray",
  ];

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductClick = (label: string) => {
    setSelectedProducts((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="Which makeup products do you use daily?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {makeupProducts.map((product) => (
          <Pill
            key={product}
            label={product}
            selected={selectedProducts.includes(product)}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question11() {
  const concerns = [
    "Long-lasting",
    "Non-comedogenic",
    "Waterproof",
    "Full Coverage",
    "Lightweight",
    "Hydrating",
    "Mattifying",
  ];

  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const handleConcernClick = (label: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="Do you have any particular makeup concerns?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {concerns.map((concern) => (
          <Pill
            key={concern}
            label={concern}
            selected={selectedConcerns.includes(concern)}
            onClick={() => handleConcernClick(concern)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question12() {
  const finishes = ["Matte", "Dewy", "Natural", "Satin", "Luminous"];

  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);

  const handleFinishClick = (label: string) => {
    setSelectedFinish(label);
  };

  return (
    <QuestionLayout title="What are your preferred makeup finishes?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {finishes.map((finish) => (
          <Pill
            key={finish}
            label={finish}
            selected={selectedFinish === finish}
            onClick={() => handleFinishClick(finish)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question13() {
  const [hasAllergy, setHasAllergy] = useState<boolean>(false);
  const [allergyText, setAllergyText] = useState<string | undefined>("");

  const handleAllergyClick = (value: boolean) => {
    setHasAllergy(value);
    if (!value) {
      setAllergyText("");
    }
  };

  const handleInputChange = (newValue: string) => {
    setAllergyText(newValue);
    if (newValue !== "") {
      setHasAllergy(true);
    }
  };

  return (
    <QuestionLayout title="Are there any makeup ingredients you are allergic to or prefer to avoid?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        <PillInput
          pillLabel="Yes"
          placeholder="Please Specify"
          value={allergyText}
          onChange={handleInputChange}
        />
        <Pill
          label="No"
          selected={hasAllergy === false}
          onClick={() => handleAllergyClick(false)}
        />
      </div>
    </QuestionLayout>
  );
}

export function Question14() {
  const hairTypes = ["Straight", "Wavy", "Curly", "Coily"];

  const [selectedHairType, setSelectedHairType] = useState<string | null>(null);

  const handleHairTypeClick = (label: string) => {
    setSelectedHairType(label);
  };

  return (
    <QuestionLayout title="What are your preferred makeup finishes?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {hairTypes.map((hairType) => (
          <Pill
            key={hairType}
            label={hairType}
            selected={selectedHairType === hairType}
            onClick={() => handleHairTypeClick(hairType)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question15() {
  const concerns = [
    "Frizz",
    "Dryness",
    "Thinning",
    "Dandruff",
    "Oily Scalp",
    "Spit Ends",
    "Breakage",
    "Color-treated",
    "Volume",
    "Hair Loss",
  ];

  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);

  const handleConcernClick = (label: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="What are your main hair concerns?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {concerns.map((concern) => (
          <Pill
            key={concern}
            label={concern}
            selected={selectedConcerns.includes(concern)}
            onClick={() => handleConcernClick(concern)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question16() {
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

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductClick = (label: string) => {
    setSelectedProducts((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="What hair care products do you use regularly?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {products.map((product) => (
          <Pill
            key={product}
            label={product}
            selected={selectedProducts.includes(product)}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question17() {
  const frequencies = ["Daily", "Every Other Day", "Twice a Week", "Weekly"];

  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
    null
  );

  const handleFrequencyClick = (label: string) => {
    setSelectedFrequency(label);
  };

  return (
    <QuestionLayout title="How often do you wash your hair?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {frequencies.map((frequency) => (
          <Pill
            key={frequency}
            label={frequency}
            selected={selectedFrequency === frequency}
            onClick={() => handleFrequencyClick(frequency)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question18() {
  const tools = ["Hair Dryer", "Straightener", "Curling Iron", "None"];

  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleToolClick = (label: string) => {
    setSelectedTool(label);
  };

  return (
    <QuestionLayout title="Do you use any heat styling tools?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {tools.map((tool) => (
          <Pill
            key={tool}
            label={tool}
            selected={selectedTool === tool}
            onClick={() => handleToolClick(tool)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question19() {
  const [hasAllergy, setHasAllergy] = useState<boolean>(false);
  const [allergyText, setAllergyText] = useState<string | undefined>("");

  const handleAllergyClick = (value: boolean) => {
    setHasAllergy(value);
    if (!value) {
      setAllergyText("");
    }
  };

  const handleInputChange = (newValue: string) => {
    setAllergyText(newValue);
    if (newValue !== "") {
      setHasAllergy(true);
    }
  };

  return (
    <QuestionLayout title="Are you allergic to any hair care ingredients?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        <PillInput
          pillLabel="Yes"
          placeholder="Please Specify"
          value={allergyText}
          onChange={handleInputChange}
        />
        <Pill
          label="No"
          selected={hasAllergy === false}
          onClick={() => handleAllergyClick(false)}
        />
      </div>
    </QuestionLayout>
  );
}

export function Question20() {
  const ageGroups = [
    "Under 18",
    "18-24",
    "25-34",
    "35-44",
    "45-54",
    "55-64",
    "65+",
  ];

  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);

  const handleAgeGroupClick = (label: string) => {
    setSelectedAgeGroup(label);
  };

  return (
    <QuestionLayout title=" What is your age?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {ageGroups.map((ageGroup) => (
          <Pill
            key={ageGroup}
            label={ageGroup}
            selected={selectedAgeGroup === ageGroup}
            onClick={() => handleAgeGroupClick(ageGroup)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question21() {
  const genders = ["Female", "Male", "Non Binary", "Prefer not to say"];

  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleGenderClick = (label: string) => {
    setSelectedGender(label);
  };

  return (
    <QuestionLayout title="What is your gender?">
      <div className="mt-[60px] flex flex-col gap-[10px] ">
        {genders.map((gender) => (
          <Pill
            key={gender}
            label={gender}
            selected={selectedGender === gender}
            onClick={() => handleGenderClick(gender)}
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
  const ingredients = [
    "Parabens",
    "Sulfates",
    "Artificial Fragrances",
    "Phthalates",
    "Alcohol",
    "Silicones",
    "Mineral Oil",
    "Gluten",
    "Talc",
    "Formaldehyde",
  ];

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleIngredientClick = (label: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="Are there any ingredients you prefer to avoid in your beauty products?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {ingredients.map((ingredient) => (
          <Pill
            key={ingredient}
            label={ingredient}
            selected={selectedIngredients.includes(ingredient)}
            onClick={() => handleIngredientClick(ingredient)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question24() {
  const lifestylePreferences = [
    "Vegan",
    "Cruelty-free",
    "Gluten-free",
    "Organic",
    "Non-GMO",
    "Natural Ingredients",
    "None",
  ];

  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);

  const handlePreferenceClick = (label: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="Do you have any dietary restrictions or lifestyle preferences that affect your beauty product choices?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {lifestylePreferences.map((preference) => (
          <Pill
            key={preference}
            label={preference}
            selected={selectedPreferences.includes(preference)}
            onClick={() => handlePreferenceClick(preference)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

export function Question25() {
  const naturalIngredients = [
    "Aloe Vera",
    "Tea Tree Oil",
    "Argan Oil",
    "Shea Butter",
    "Coconut Oil",
    "Jojoba Oil",
    "Hydraulic Acid",
    "Green Tea",
    "Chamomile",
    "Rosehip Oil",
    "Vitamin C",
    "Retinol",
  ];

  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleIngredientClick = (label: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]
    );
  };

  return (
    <QuestionLayout title="Are there any specific natural ingredients you prefer in your beauty products?">
      <div className="flex flex-wrap gap-[10px] mb-[10px] ">
        {naturalIngredients.map((ingredient) => (
          <Pill
            key={ingredient}
            label={ingredient}
            selected={selectedIngredients.includes(ingredient)}
            onClick={() => handleIngredientClick(ingredient)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}
