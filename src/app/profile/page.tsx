"use client";

import Pill from "@/components/Pill";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { QuestionnaireFlow } from "./questions/MockPage";

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
      <QuestionnaireFlow />

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

function Question0() {
  return (
    <>
      <h1 className="md:text-4xl text-[35px] font-[600] mt-[84px] ">
        💖 Tell Us About Your Beauty Needs
      </h1>
      <p className="text-[20px] font-semibold mt-[25px] ">
        Select Your Preferred Category
      </p>
      <div className="mt-[31px] flex flex-col gap-[10px] ">
        <Pill label="Skin Care" />
        <Pill label="Fragrance" />
        <Pill label="Makeup" />
        <Pill label="Hair Care" />
      </div>
    </>
  );
}
