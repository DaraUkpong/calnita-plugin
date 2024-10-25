import ProgressBar from "@/components/ProgressBar";
import { useQuestionnaire } from "./context";
import React, { useState } from "react";
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
    responses,
  } = useQuestionnaire();

  const CurrentQuestionComponent =
    mergedQuestions[currentQuestionIndex]?.component;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate progress as a percentage
  const progress =
    totalQuestions > 0
      ? ((currentQuestionIndex + 1) / totalQuestions) * 100
      : 0; // Avoid division by zero

  const { data: session } = useSession();

  const handleFinish = async () => {
    setLoading(true);
    setError(null);

    //console.log(formData);
    //return;
    if (!session) {
      setError("User session not found. Please log in again.");
      setLoading(false);
      return;
    }

    if (!responses || Object.keys(responses).length === 0) {
      setError("Please answer all required questions.");
      setLoading(false);
      return;
    }

    try {
      //console.log("calling the updateUser fn");
      const response = await updateUser({
        formData: { ...responses, selectedCategories },
        userId: session?.user?.id,
      });

      if (response?.ok) {
        alert("Profile updated successfully");
      } else {
        setError(
          "An error occurred while updating your profile. Please try again."
        );
      }
    } catch (e) {
      setError("Submission failed. Please check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    //68px is subtracted to account for the bottom tab
    <div className="w-full h-full flex flex-col text-black min-h-[calc(100vh-68px)]  ">
      <div className="flex-1 flex items-stretch overflow-hidden ">
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
        <div className="flex-1 flex flex-col ">
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

          {/* Scrollable Question Content */}
          <div className="flex-1 mt-[30px]  pb-[99px] overflow-y-auto scrollbar-hidden ">
            <CurrentQuestionComponent />
          </div>
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
        <div className="p-4 flex justify-center items-center gap-4 fixed bottom-[68px] left-0 right-0 backdrop-blur-md backdrop-opacity-60 bg-[rgb(250, 246, 246)]/30 w-fit rounded-[20px] ">
          <button
            onClick={handleFinish}
            disabled={loading}
            className="w-[204px] h-[69px] flex-shrink-0 rounded-[20px] bg-black text-white text-[16px] font-semibold"
          >
            {loading ? "Submitting..." : "Finish"}
          </button>

          {error && (
            <div className="text-red-500 text-[14px] mt-[4px]">{error}</div>
          )}
        </div>
      )}
    </div>
  );
}
