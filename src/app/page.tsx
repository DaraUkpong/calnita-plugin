// app/page.tsx
"use client";
import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import DynamicTypewriter from "@/components/DynamicTypewriter";
import { useBrand } from "@/context/PartnerDataProvider";

const HomePage = () => {
  const { data: session } = useSession();
  const {partnerData, isLoading, error } = useBrand();
  const router = useRouter();

  // Handler for "Let's Go" button click
  const handleLetsGoClick = () => {
    if (!session) {
      signIn(); // Redirect to sign-in if the user is not authenticated
    } else {
      //window.location.href = "/recommendations"; // Go to recommendations page if authenticated
      router.replace("/recommendations"); // Use router to navigate to recommendations
    }
  };

  return (
    <div className="w-full h-full flex flex-col pt-[105px] px-[40px] md:gap-10 text-black ">
      <div className="md:text-5xl text-[35px] font-semibold max-w-[81.6%] ">
        <h1>&quot;👋Welcome to</h1>
        {/*<h1 className="max-w-full truncate ">DaraologyiticaSofiariatana!</h1>*/}
        <DynamicTypewriter
          text={partnerData?.name! || "Calnita"}
          typingSpeed={100}
        />
      </div>

      <p className="md:text-sm text-[20px] font-semibold mt-[14px] ">
        I&apos;m calnita AI, your virtual beauty assistant.
      </p>

      <p className="md:text-sm text-[20px] text-[#737373] font-normal mt-[78px] ">
        Let&apos;s create your personalized Beauty Profile for tailored
        recommendations, exclusive rewards, and more. How can I assist you
        today? 😊
      </p>

      <button
        onClick={handleLetsGoClick}
        className="px-6 py-3 bg-black text-white rounded-full mt-[39px] "
      >
        Let&apos;s Go
      </button>
    </div>
  );
};

export default HomePage;
