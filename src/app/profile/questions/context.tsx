"use client";

import React, { createContext, useContext, useState } from "react";
import { Category, Question, questionsByCategory } from "./questionsByCategory";
import ProgressBar from "@/components/ProgressBar";

type QuestionnaireContextType = {
  currentQuestionIndex: number;
  responses: Record<string, any>;
  mergedQuestions: Question[];
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  setResponses: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  totalQuestions: number;
  selectedCategories: Category[];
};

const QuestionnaireContext = createContext<
  QuestionnaireContextType | undefined
>(undefined);

type QuestionnaireProviderProps = {
  children: React.ReactNode;
};

export function QuestionnaireProvider({
  children,
}: QuestionnaireProviderProps) {
  // State for managing selected categories
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // Question tracking state (e.g., responses, progress)
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Merge and deduplicate questions based on selected categories
  const mergedQuestions = React.useMemo(() => {
    const selectedQuestions = selectedCategories
      .map((category) => questionsByCategory[category])
      .flat();

    // Create a Map to remove duplicate questions based on ID
    const uniqueQuestionsMap = new Map();
    selectedQuestions.forEach((question) => {
      uniqueQuestionsMap.set(question.id, question);
    });

    // Add general questions that are always needed
    questionsByCategory["General"].forEach((question) => {
      uniqueQuestionsMap.set(question.id, question);
    });

    return Array.from(uniqueQuestionsMap.values());
  }, [selectedCategories]);

  // Navigation functions
  const goToNextQuestion = () =>
    setCurrentQuestionIndex((prev) =>
      Math.min(prev + 1, mergedQuestions.length - 1)
    );
  const goToPreviousQuestion = () =>
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));

  // Dynamic rendering based on the current index
  /*const CurrentQuestionComponent =
    mergedQuestions[currentQuestionIndex]?.component;
  */

  const totalQuestions = mergedQuestions.length;

  return (
    <QuestionnaireContext.Provider
      value={{
        currentQuestionIndex,
        responses,
        mergedQuestions,
        goToNextQuestion,
        goToPreviousQuestion,
        setResponses,
        setSelectedCategories,
        totalQuestions,
        selectedCategories,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error(
      "useQuestionnaire must be used within a QuestionnaireProvider"
    );
  }
  return context;
};

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
      <div className="text-[12px] text-[#222222] flex justify-between mt-[50px]">
        <span>
          {Array.isArray(selectedCategories)
            ? selectedCategories.join(", ")
            : selectedCategories}
        </span>
        <span>
          {currentQuestionIndex + 1} of {totalQuestions}
        </span>
      </div>

      <ProgressBar progress={progress} />

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
