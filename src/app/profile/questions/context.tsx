"use client";

import React, { createContext, useContext, useState } from "react";
import { questionsByCategory } from "./questionsByCategory";
import { Question0 } from "./components";
import { Category, Question, Response } from "./types";

type QuestionnaireContextType = {
  currentQuestionIndex: number;
  responses: Response;
  mergedQuestions: Question[];
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  setResponses: React.Dispatch<React.SetStateAction<Response>>;
  setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  totalQuestions: number;
  selectedCategories: Category[];
  updateResponse: (
    key: keyof Response,
    value: Response[keyof Response],
    isMultipleChoice?: boolean
  ) => void;
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
  const [responses, setResponses] = useState<Response>({});
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

    //return Array.from(uniqueQuestionsMap.values());
    // Add Question0 as the first item in the array
    return [
      { component: Question0 },
      ...Array.from(uniqueQuestionsMap.values()),
    ];
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

  /*const updateResponse = (key: string, value: string | string[] | boolean) => {
    setResponses((prev: Response) => ({
      ...prev,
      [key]: value,
    }));
  };*/
  const updateResponse = (
    key: keyof Response,
    value: Response[keyof Response],
    isMultipleChoice: boolean = false
  ) => {
    setResponses((prev: Response) => {
      if (isMultipleChoice) {
        const currentValues = (prev[key] as string[]) || [];
        const updatedValues = currentValues.includes(value as string)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        return { ...prev, [key]: updatedValues };
      } else {
        return { ...prev, [key]: value };
      }
    });
  };

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
        updateResponse,
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
