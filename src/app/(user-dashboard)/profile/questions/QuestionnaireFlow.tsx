import ProgressBar from "@/components/ProgressBar";
import { useQuestionnaire } from "./context";
import React from "react";
import { updateUser } from "@/services/user";
import { useSession } from "next-auth/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <div className="w-full h-full flex flex-col text-black min-h-screen  ">
      <div className="flex-1 flex items-stretch ">
        {/* Left Navigation */}
        <div className="w-[40px] flex items-center justify-start">
          {currentQuestionIndex > 0 && (
            <button
              onClick={goToPreviousQuestion}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Progress Bar and Selected Categories */}
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
        </div>

        {/* Right Navigation */}
        <div className="w-[40px] flex items-center justify-end">
          {currentQuestionIndex < mergedQuestions.length - 1 && (
            <button
              onClick={goToNextQuestion}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Finish Button */}
      {currentQuestionIndex === mergedQuestions.length - 1 && (
        <div className="p-4 flex justify-center fixed bottom-[46px] left-0 right-0 ">
          <button
            onClick={handleFinish}
            className="w-[204px] h-[69px] rounded-[20px] bg-black text-white text-[16px] font-semibold"
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}
