import { ErrorMessage, Field, useFormikContext, getIn } from "formik";
import { useMultistepForm } from "../hooks/useMultistepform";
import {
  Cosmetics,
  Fragrances,
  HairCare,
  PersonalInfo,
  ProductPreferences,
  SkinCare,
} from "../lib/ProductUtils";
import { ReactElement, useState } from "react";
import { Countries } from "../lib/countries";
import StepForm from "./createStepForm";

export interface CheckboxTypes {
  placeholder: string;
  name: string;
  label: string;
  options: Array<string> | Array<number>;
  multiple?: boolean;
  parentStyle?: string;
}

export const CustomCheckboxInput = (props: CheckboxTypes) => {
  const { values, setFieldValue } = useFormikContext<any>(); // Replace 'any' with your form's value type if you have it defined
  const field = props.name;

  // Use getIn to safely access nested values
  const fieldValue = getIn(values, field);

  // Determine if the allergies field is set to 'Yes'
  const isAllergic =
    fieldValue === "Yes (Please Specify)" ||
    (typeof fieldValue === "string" &&
      fieldValue.startsWith("Yes (Please Specify):"));

  const handleSpecificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = `Yes (Please Specify): ${e.target.value}`;
    setFieldValue(field, newValue);
  };

  console.log(fieldValue);
  return (
    <div className="flex flex-col gap-4">
      <span className="font-[500] block  md:text-base text-sm">{props.label}</span>
      <div
        className={
          props.parentStyle
            ? props.parentStyle
            : "flex flex-row gap-2 flex-wrap justify-start"
        }
      >
        {props.options.map((option, index) => {
          const isChecked =
            option === "Yes (Please Specify)" ? isAllergic : undefined;
          return (
            <div id="ck-button" key={index}>
              <label>
                <Field
                  type={props.multiple ? "radio" : "checkbox"}
                  name={props.name}
                  value={option}
                  className="font-light  md:text-xs text-[10px]"
                  checked={isChecked}
                  onChange={() => {
                    const currentValue = fieldValue; // Get the current value of the field
                    console.log(Array.isArray(currentValue));
                    // Check if it's a checkbox scenario (multiple selections allowed)
                    if (props.multiple === false) {
                      if (Array.isArray(currentValue)) {
                        if (currentValue.includes(option)) {
                          // Remove the option from the array if it's already selected
                          setFieldValue(
                            props.name,
                            currentValue.filter((item) => item !== option)
                          );
                        } else {
                          // Add the option to the array if it's not selected
                          setFieldValue(props.name, [...currentValue, option]);
                        }
                      } else {
                        // Initialize as an array if it's not already one, starting with the selected option
                        setFieldValue(props.name, [option]);
                      }
                    } else {
                      // Handle the case where the field is not multiple (radio button behavior)
                      if (option === "Yes (Please Specify)") {
                        setFieldValue(props.name, "Yes (Please Specify)");
                      } else {
                        setFieldValue(props.name, option);
                      }
                    }
                  }}
                />
                <ErrorMessage
                  name={props.name}
                  component="h6"
                  className="text-[10px]  w-full mb-3 font-light text-[#f10000]"
                />
                <div>
                  <span className="whitespace-nowrap font-extralight">
                    {option}
                  </span>
                </div>
              </label>
            </div>
          );
        })}
      </div>
      {isAllergic && (
        <input
          value={fieldValue?.replace("Yes (Please Specify): ", "") || ""}
          onChange={handleSpecificationChange}
          placeholder="Please specify"
          className="mt-2 md:py-3 py-2 px-3 text-[10px] md:text-sm border font-extralight rounded-3xl border-solid focus:ring-0 focus:outline-none border-gray-300"
        />
      )}
    </div>
  );
};
export const CountryInput = () => {
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <span className="font-normal block ">
        Which country are you located in?
      </span>
      <Field
        name="personalInfo.country"
        as="select"
        className="h-fit w-fit bg-transparent border border-solid border-black rounded-xl text-3xl"
      >
        {Countries.map((country, index) => (
          <option key={index} value={country.name}>
            {country.flag}
          </option>
        ))}
      </Field>
    </div>
  );
};

const createCheckboxInput = (
  key: number,
  name: string,
  label: string,
  options: string[] | number[],
  multiple?: boolean,
  parentStyle?: string
) => (
  <CustomCheckboxInput
    key={key}
    placeholder="Enter option"
    name={name}
    label={label}
    options={options}
    multiple={multiple || false}
    parentStyle={parentStyle}
  />
);

export const CustomSwitchInput = ({ values }: { values: string }) => {
  const personalQuestions = [
    createCheckboxInput(
      6,
      "personalInfo.age",
      "What is your age?",
      PersonalInfo.age,
      true
    ),
    createCheckboxInput(
      7,
      "personalInfo.gender",
      "What is your gender?",
      PersonalInfo.gender,
      true
    ),
    <CountryInput key={8} />,
    createCheckboxInput(
      39,
      "productPreferences.ingredientsToAvoid",
      "Are there any ingredients you prefer to avoid in your beauty products?",
      ProductPreferences.ingredientsToAvoid
    ),
    createCheckboxInput(
      20,
      "productPreferences.dietaryRestrictions",
      "Do you have any dietary restrictions or lifestyle preferences that affect your beauty product choices?",
      ProductPreferences.dietaryRestrictions
    ),
    createCheckboxInput(
      49,
      "productPreferences.preferredNaturalIngredients",
      "Are there any specific natural ingredients you prefer in your beauty products?",
      ProductPreferences.preferredNaturalIngredients
    ),
  ];
  switch (values) {
    case "Skincare":
      return StepForm(
        [
          createCheckboxInput(
            1,
            "skinCare.skinType",
            "Select Your Skin Type",
            SkinCare.SkinType,
            true
          ),
          createCheckboxInput(
            2,
            "skinCare.primaryConcerns",
            "What is your primary skin concern?",
            SkinCare.primaryConcern
          ),
          createCheckboxInput(
            3,
            "skinCare.currentProducts",
            "What skin care products do you currently use?",
            SkinCare.currentProducts
          ),
          createCheckboxInput(
            4,
            "skinCare.routine",
            "How would you describe your skin care routine?",
            SkinCare.routine,
            true,
            "flex flex-col items-start gap-4"
          ),
          createCheckboxInput(
            5,
            "skinCare.allergies",
            "Do you have any known allergies to skin care ingredients?",
            SkinCare.allergies,
            true,
            "flex flex-col items-start gap-4"
          ),
          ...personalQuestions,
        ],
        "Skincare"
      );

    case "Haircare":
      return StepForm(
        [
          createCheckboxInput(
            1,
            "hairCare.hairType",
            "Select Your Hair Type",
            HairCare.hairType,
            true,
            "flex flex-col items-start gap-4"
          ),
          createCheckboxInput(
            2,
            "hairCare.concerns",
            "What are your main hair concerns?",
            HairCare.concerns
          ),
          createCheckboxInput(
            3,
            "hairCare.regularProducts",
            "What hair care products do you use regularly?",
            HairCare.regularProducts
          ),
          createCheckboxInput(
            4,
            "hairCare.washFrequency",
            "How often do you wash your hair?",
            HairCare.washFrequency,
            true,
            "flex flex-col items-start gap-4"
          ),
          createCheckboxInput(
            5,
            "hairCare.heatStylingTools",
            "Do you use any heat styling tools?",
            HairCare.heatStylingTools
          ),
          createCheckboxInput(
            6,
            "hairCare.allergies",
            "Are you allergic to any hair care ingredients?",
            HairCare.allergies,
            true,
            "flex flex-col items-start gap-4"
          ),
          ...personalQuestions,
        ],
        "Haircare"
      );

    case "Cosmetics":
      return StepForm(
        [
          createCheckboxInput(
            1,
            "makeup.dailyProducts",
            "What makeup products do you use daily?",
            Cosmetics.dailyProducts
          ),
          createCheckboxInput(
            2,
            "makeup.concerns",
            "Do you have any particular makeup concerns?",
            Cosmetics.concerns
          ),
          createCheckboxInput(
            3,
            "makeup.preferredFinishes",
            "What are your preferred makeup finishes?",
            Cosmetics.preferredFinishes
          ),
          createCheckboxInput(
            4,
            "makeup.allergies",
            "Are there any makeup ingredients you are allergic to or prefer to avoid?",
            Cosmetics.allergies,
            true,
            "flex flex-col items-start gap-4"
          ),

          ...personalQuestions,
        ],
        "Cosmetics"
      );

    case "Fragrance":
      return StepForm(
        [
          createCheckboxInput(
            1,
            "fragrance.preferredScents",
            "What type of scents do you prefer?",
            Fragrances.preferredScents
          ),
          createCheckboxInput(
            2,
            "fragrance.perfumeUseFrequency",
            "How often do you wear perfume?",
            Fragrances.perfumeUseFrequency,
            true
          ),
          createCheckboxInput(
            3,
            "fragrance.strengthPreference",
            "Do you prefer stronger or more subtle fragrances?",
            Fragrances.strengthPreference,
            true,
            "flex flex-col items-start gap-4"
          ),
          createCheckboxInput(
            4,
            "fragrance.allergies",
            "Are you sensitive or allergic to any specific fragrance ingredients?",
            Fragrances.allergies,
            true,
            "flex flex-col items-start gap-4"
          ),
          ...personalQuestions,
        ],
        "Fragrance"
      );

    default:
      return null;
  }
};
