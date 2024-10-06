// app/widget/page.tsx

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import { gql } from "graphql-request";
import { UserProfile, Product, PartnerWebsite } from "../types";
import { useRouter, useSearchParams } from "next/navigation";
import { graphqlClient } from "@/utils/graphql-client";
import FilterCarousel from "../components/FilterCarousel";
import OnboardingForm from "../components/onboardingForm";
import ProductList from "../components/productList";
import { generateMockRecommendations, getUniqueFilters } from "@/mock/mockdata";
// Add this import

const GET_RECOMMENDATIONS = gql`
  query GetRecommendations($userId: ID!, $partnerWebsiteUrl: String!) {
    getRecommendations(userId: $userId, partnerWebsiteUrl: $partnerWebsiteUrl) {
      id
      name
      brand
      category
      price
      image
    }
  }
`;
const WidgetPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      if (status === "authenticated" && session) {
        // Send message to parent window about successful authentication
        window.parent.postMessage(
          { type: "GOOGLE_SIGN_IN_SUCCESS", session },
          "*"
        );

        // If this is a popup window, close it
        if (window.opener) {
          window.close();
        }
      }
    };

    handleAuth();
  }, [status, session]);

  // Add this new useEffect for handling messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "REFRESH_AUTH") {
        // Refresh the session
        router.refresh();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("C-");
  const [error, setError] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [partnerWebsite, setPartnerWebsite] = useState<PartnerWebsite | null>(
    null
  );
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState(false);

  useEffect(() => {
    const websiteUrl = new URL(document.referrer).origin;
    // Fetch partner website info (you'll need to implement this API)
    fetch(`/api/partner-website?url=${websiteUrl}`)
      .then((res) => res.json())
      .then((data) => setPartnerWebsite(data));

    // Use mock recommendations for now
    if (status === "authenticated" && session?.user?.personalInfo!) {
      const userPreferences = session?.user;
      const mockRecommendations = generateMockRecommendations(userPreferences);

      setRecommendations(mockRecommendations);
    }
  }, [status, session]);

  const handleToggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const uniqueFilters = getUniqueFilters(recommendations);
  // Comment out or remove the fetchRecommendations function for now

  const handleOnboardingSubmit = async (formData: any) => {
    if (!session?.user?.email) {
      console.error("User not authenticated");
      return;
    }

    try {
      const response = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: {
            userId: session.user.id,
            ...formData,
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);
        setUserProfile(data.user);
        // Update the session with the new personalInfo
        const newSession = {
          ...session,
          user: {
            ...session.user,
            personalInfo: data.user.personalInfo,
          },
        };
        await fetch("/api/auth/session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSession),
        });
        const websiteUrl = new URL(document.referrer).origin;
        // fetchRecommendations(session.user.id, websiteUrl);
      } else {
        console.error("Failed to update user profile:", data.code);
      }
    } catch (error) {
      console.error("Error creating user profile:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      setSubmitting(true); // Start submission
      console.log("Submitting sign-in...");

      if (showForm && !isOtpSent) {
        console.log("Requesting OTP for email:", email);
        const response = await fetch(`/api/auth/request-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email }),
        });

        if (!response.ok) {
          console.error("Failed to request OTP:", response.statusText);
          throw new Error("Failed to request OTP");
        }

        const data = await response.json();
        console.log("OTP request successful:", data);
        setIsOtpSent(true);
        setSubmitting(false); // End submission
      } else {
        console.log("Signing in with OTP:", otp);
        const result = await signIn("email-otp", {
          email,
          otp,
          redirect: false, // Ensure redirect is handled correctly
        });

        if (result?.error) {
          console.error("Sign-in error:", result.error);
          throw new Error(result.error);
        }

        console.log("Sign-in successful:", result);
        setSubmitting(false); // End submission
      }
    } catch (err: any) {
      console.error("Error during sign-in:", err);
      setError(err.message || "An error occurred");
      setSubmitting(false); // Ensure submission state is reset on error
    }
  };

  const handleGoogleSignIn = async () => {
    const parentUrl = encodeURIComponent(partnerWebsite?.url || "");

    // Open a new window for Google sign-in
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;

    const newWindow = window.open(
      "${process.env.APP_URL}/auth/google?parentUrl=${parentUrl}",
      "Google Sign In",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (newWindow) {
      // Call signIn in the new window
      newWindow.location.href = `/auth/google?parentUrl=${parentUrl}&provider=google`;
    } else {
      // If popup is blocked, try to sign in in the current window
      await signIn("google", {
        callbackUrl: `${process.env.APP_URL}/auth/callback`,
        redirect: false,
      });
    }
  };

  if (status === "loading") {
    return (
      <div className="text-center flex h-full w-full flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="w-full h-full flex flex-col py-8 px-4 md:gap-10 gap-5 items-center justify-center text-black bg-transparent">
        <div className="flex flex-col w-full gap-2 ">
          <h1 className="md:text-5xl text-2xl">
            {showForm
              ? `📝 Get Started`
              : ` 👋Welcome to ${partnerWebsite?.name}!`}{" "}
          </h1>
          {!showForm && (
            <p className="md:text-sm text-xs">
              I&apos;m calnita AI, your virtual beauty assistant.{" "}
            </p>
          )}
        </div>
        {showForm ? (
          <div className="w-full flex flex-col items-center gap-3">
            <label
              htmlFor=""
              className="flex flex-col items-start gap-3 w-full"
            >
              <span className="text-xs text-gray-500">
                Enter your Email Address
              </span>
              <input
                type="email"
                className="w-full md:py-3 py-2 px-3 font-light md:text-sm text-xs text-[#344054] rounded-3xl border focus:outline-none border-gray-800 focus:ring-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={isOtpSent}
              />
            </label>
            {isOtpSent && (
              <input
                type="string"
                placeholder="C-49583"
                className="w-full md:py-3 py-2 px-3 font-light md:text-sm text-xs text-[#344054] rounded-3xl border border-gray-800 focus:ring-0"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex flex-row items-center gap-2 text-[#344054] mt-3 tracking-wide"
            >
              <img
                src="/googleIcon.svg"
                alt=""
                className="md:w-6 md:h-6 w-3 h-3"
              />
              <span className="text-xs">Continue with Google</span>
            </button>
          </div>
        ) : (
          <p className="md:text-sm text-xs text-[#737373] font-light">
            Let&apos;s create your personalized Beauty Profile for tailored
            recommendations, exclusive rewards, and more. How can I assist you
            today? 😊
          </p>
        )}

        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            disabled={submitting}
            className="mt-4 py-3 w-[80%] bg-black disabled:opacity-65 text-white rounded-xl cursor-pointer"
          >
            {submitting ? "..." : "Let's go!"}
          </button>
        ) : (
          <button
            onClick={handleSignIn}
            disabled={submitting}
            className="mt-4 py-3 w-[80%] bg-black disabled:opacity-65 text-xs text-white rounded-xl cursor-pointer"
          >
            {submitting ? "..." : isOtpSent ? "Verify OTP" : "Send OTP"}
          </button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className="w-full h-full max-h-full flex flex-col  justify-end overflow-hidden text-black bg-transparent"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {session?.user?.personalInfo && (
        <div className="flex flex-row w-full gap-2 md:px-4 px-2 h-[20%] md:py-6 py-2 items-center">
          <div className="w-fit">
            <h1 className="md:text-3xl text-base w-fit font-semibold text-[#222222]">
              🎉 Your Personalized Recomendations
            </h1>
          </div>
          <div className="rounded-full overflow-hidden flex flex-col items-center justify-center h-full w-1/5">
            {" "}
            <img
              src="https://res.cloudinary.com/df8kki6aw/image/upload/v1716378923/calnita/products/664dcfcf00a84d9a09e0810a/coverPhoto.jpg"
              alt=""
              className="md:h-16 w-8 h-8 rounded-full md:w-16 object-cover bg-gray-200"
            />
          </div>
        </div>
      )}

      <div
        className={`${
          !session?.user?.personalInfo ? "h-full" : "h-[65%]"
        }  md:px-4 px-2 flex flex-col items-center justify-end md:mb-6 mb-2`}
      >
        {!session?.user?.personalInfo ? (
          <OnboardingForm onSubmit={handleOnboardingSubmit} />
        ) : (
          <div className="w-full h-fit p-2 bg-[#DBB9B9]/25 rounded-3xl ">
            <h2 className="md:text-xl text-sm font-semibold md:py-4 md:px-4 px-4 py-2">
              Based on Your Preferrences
            </h2>
            <FilterCarousel
              filters={[
                ...uniqueFilters.categories,
                ...uniqueFilters.brands,
                ...uniqueFilters.ingredients,
              ]}
              selectedFilters={selectedFilters}
              onToggleFilter={handleToggleFilter}
            />
            <ProductList products={recommendations} />
          </div>
        )}
      </div>
      {!session?.user?.personalInfo ? null : (
        <div className="flex flex-row h-[15%] justify-between px-4 md:my-3 my-1 w-full gap-2 bg-[#A3A3A3]/">
          <button className="flex-1 transition-all duration-200 rounded-3xl px-2 gap-1 overflow-hidden flex flex-row items-center justify-start group active:bg-black hover:bg-black">
            <img src="/foryou.png" className="md:w-auto w-5 " alt="" />
            <p className="text-[10px] text-center text-black group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              For You
            </p>
          </button>
          <button className="flex-1 transition-all duration-200 rounded-3xl px-2 gap-1 overflow-hidden flex flex-row items-center justify-start group active:bg-black hover:bg-black">
            <img src="/routine.png" className="md:w-auto w-5 " alt="" />
            <p className="text-[10px] text-center text-black group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Routine
            </p>
          </button>
          <button className="flex-1 transition-all duration-200 rounded-3xl px-2 gap-1 overflow-hidden flex flex-row items-center justify-start group active:bg-black hover:bg-black">
            <img src="/share.png" className="md:w-auto w-5 " alt="" />
            <p className="text-[10px] text-center text-black group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Share
            </p>
          </button>
          <button
            onClick={() => signOut()}
            className="flex-1 transition-all duration-200 rounded-3xl px-2 gap-1 overflow-hidden flex flex-row items-center justify-start group active:bg-black hover:bg-black"
          >
            <img src="/aichat.png" className="md:w-auto w-5 " alt="" />
            <p className="text-[10px] text-center text-black group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              LogOut
            </p>
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default WidgetPage;
