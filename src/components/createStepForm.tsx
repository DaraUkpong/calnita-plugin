import React from "react";
import { useFormikContext } from "formik";
import { ReactElement } from "react";
import { useMultistepForm } from "@/hooks/useMultistepform";

const StepForm = (steps: ReactElement[], section: string) => {
  // Accessing Formik context
  const { values, isSubmitting, handleSubmit } = useFormikContext<any>();
  console.log(isSubmitting, values);

  // Using custom hook to manage multi-step form
  const {
    steps: totalSteps,
    currentStepIndex,
    step,
    next,
    back,
    isLastStep,
  } = useMultistepForm(steps);

  return (
    <div className="flex flex-col md:pt-6 pt-4 md:px-4 px-1 w-full items-start h-full justify-between">
      <div className="w-full flex flex-col items-start md:gap-8 gap-3 h-fit">
        <div className="flex flex-col items-start w-full md:gap-2 gap-1">
          <div className="flex flex-row w-full items-center justify-between md:text-xs text-[10px]">
            <span>{section}</span>
            <span>{currentStepIndex + 1 + " of " + totalSteps.length}</span>
          </div>
          <div className="w-full flex flex-row justify-start items-center h-1 bg-gray-200 rounded-l-md rounded-r-md overflow-hidden">
            <div
              className={`h-full bg-black rounded-r-md transition-all duration-400`}
              style={{
                width: `${((currentStepIndex + 1) / totalSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>
        {step}
      </div>

      <div className="flex flex-row h-[10%] w-full justify-between items-center">
        <button
          type="button"
          onClick={back}
          className="p-2 bg-black w-2/5 h-full md:text-xs text-[10px] text-white rounded-3xl cursor-pointer"
        >
          Back
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => {
            if (isLastStep) {
              // Manually trigger form submission
              handleSubmit();
            } else {
              // Move to the next step
              next();
            }
          }}
          className="p-2 w-2/5 bg-black h-full md:text-xs text-[10px] disabled:opacity-85 text-white rounded-3xl cursor-pointer"
        >
          {isSubmitting ? "..." : isLastStep ? "Let's Go!" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepForm;
