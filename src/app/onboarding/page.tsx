"use client";

import OnboardingForm from "@/components/OnboardingForm";
import Pill from "@/components/Pill";
import { updateUser } from "@/services/user";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const OnboardingPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleOnboardingSubmit = async (formData: any) => {
    if (!session) return;
    const response = await updateUser({
      formData,
      userId: session.user?.id,
    });

    if (response?.ok) router.push("/recommendations");
  };

  return (
    <div className="w-full h-full flex flex-col text-black px-[40px] ">
      <h1 className="md:text-4xl text-[35px] font-[600] mt-[84px] ">
        💖 Tell Us About Your Beauty Needs
      </h1>
      <Pill label="dfj" />
      <div
        className={`h-full md:px-4 px-2 flex flex-col items-center justify-end md:mb-6 mb-2`}
      >
        <OnboardingForm onSubmit={handleOnboardingSubmit} />
      </div>
    </div>
  );
};

export default OnboardingPage;
