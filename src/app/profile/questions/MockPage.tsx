"use client";

import React, { useState } from "react";
import { Category, questionsByCategory } from "./questionsByCategory";

export const QuestionnaireFlow = () => {
  // State for managing selected categories
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([
    "Skin Care",
    // "Makeup",
  ]);

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
  const CurrentQuestionComponent =
    mergedQuestions[currentQuestionIndex]?.component;

  return (
    <div>
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
};
