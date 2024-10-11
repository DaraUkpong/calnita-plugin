import ProgressBar from "@/components/ProgressBar";
import { useQuestionnaire } from "./context";
import React from "react";

export function QuestionnaireFlow() {
  const {
    goToNextQuestion,
    goToPreviousQuestion,
    mergedQuestions,
    currentQuestionIndex,
    responses,
    setResponses,
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

  return (
    <div>
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

      {/* Dynamically render the current question */}
      <CurrentQuestionComponent answers={responses} setAnswers={setResponses} />

      {/* Navigation buttons */}
      <button
        onClick={goToPreviousQuestion}
        disabled={currentQuestionIndex === 0}
      >
        Back
      </button>
      <button
        onClick={goToNextQuestion}
        disabled={currentQuestionIndex === mergedQuestions.length - 1}
      >
        Next
      </button>

      {/* Display Finish button when on the last question */}
      {currentQuestionIndex === mergedQuestions.length - 1 && (
        <button
          onClick={() => alert("Questionnaire Completed!")}
          style={{ marginLeft: "10px" }}
        >
          Finish
        </button>
      )}
    </div>
  );
}
