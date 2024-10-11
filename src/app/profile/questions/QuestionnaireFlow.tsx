import ProgressBar from "@/components/ProgressBar";
import { useQuestionnaire } from "./context";
import React from "react";
import { updateUser } from "@/services/user";
import { useSession } from "next-auth/react";

export function QuestionnaireFlow() {
  const {
    goToNextQuestion,
    goToPreviousQuestion,
    mergedQuestions,
    currentQuestionIndex,
    totalQuestions,
    selectedCategories,
  } = useQuestionnaire();

  const CurrentQuestionComponent =
    mergedQuestions[currentQuestionIndex]?.component;

  // Calculate progress as a percentage
  const progress =
    totalQuestions > 0
      ? ((currentQuestionIndex + 1) / totalQuestions) * 100
      : 0; // Avoid division by zero

  const { data: session } = useSession();

  const handleFinish = async (formData: any) => {
    alert("Questionnaire Completed!");
    return;
    if (!session) return;
    const response = await updateUser({
      formData,
      userId: session?.user?.id,
    });

    if (response?.ok) alert("Profile updated successfully");
  };

  return (
    <div className="w-full h-full flex flex-col text-black px-[40px]">
      {currentQuestionIndex > 0 && (
        <>
          <div className="text-[12px] text-[#222222] flex justify-between mt-[50px]">
            <span>
              {Array.isArray(selectedCategories)
                ? selectedCategories.join(", ")
                : selectedCategories}
            </span>
            <span>
              {currentQuestionIndex} of {totalQuestions - 1}
            </span>
          </div>
          <ProgressBar progress={progress} />
        </>
      )}

      <CurrentQuestionComponent />

      {/* Navigation Buttons (Fixed at 46px from the bottom) */}
      <div className="p-4 flex justify-between fixed bottom-[46px] left-0 right-0 bg-white">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>
        {currentQuestionIndex === mergedQuestions.length - 1 ? (
          <button
            onClick={handleFinish}
            className="w-[204px] h-[69px] rounded-[20px] bg-black text-white text-[16px] font-semibold "
          >
            Finish
          </button>
        ) : (
          <button
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === mergedQuestions.length - 1}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
