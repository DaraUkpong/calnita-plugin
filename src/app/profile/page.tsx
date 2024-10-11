"use client";

import Pill from "@/components/Pill";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { QuestionnaireProvider } from "./questions/context";
import { QuestionnaireFlow } from "./questions/QuestionnaireFlow";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const [profileData, setProfileData] = useState(session?.user);

  const handleUpdate = async () => {
    const response = await fetch("/api/update-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileData),
    });

    if (response.ok) alert("Profile updated successfully");
  };

  return (
    <div className="w-full h-full flex flex-col text-black px-[40px] ">
      <QuestionnaireProvider>
        <QuestionnaireFlow />
      </QuestionnaireProvider>

      <button
        onClick={handleUpdate}
        className="w-[204px] h-[69px] rounded-[20px] bg-black text-white text-[16px] font-semibold "
      >
        Next
      </button>
    </div>
  );
};

export default ProfilePage;
