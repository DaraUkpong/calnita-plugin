"use client";

import React from "react";
import { QuestionnaireProvider } from "./questions/context";
import { QuestionnaireFlow } from "./questions/QuestionnaireFlow";

const ProfilePage: React.FC = () => {
  return (
    <QuestionnaireProvider>
      <QuestionnaireFlow />
    </QuestionnaireProvider>
  );
};

export default ProfilePage;
