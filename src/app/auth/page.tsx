// app/auth/page.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { googleSignIn, otpSignIn, requestOtp } from "@/services/auth";
import { ActionButton } from "@/components/ActionButton";

const AuthPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleOtpRequest = async () => {
    setSubmitting(true);
    try {
      console.log("Requesting OTP for email:", email);
      const data = await requestOtp(email);
      console.log("OTP request successful:", data);
      setIsOtpSent(true);
      console.log("isOtpSent after OTP request:", isOtpSent);
    } catch (error) {
      console.error("OTP request failed:", error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleOtpSignIn = async () => {
    console.log("Verifying OTP...");
    setSubmitting(true);
    try {
      console.log("Email:", email, "OTP:", otp);
      await otpSignIn(email, otp);
      console.log("OTP sign-in successful, navigating to onboarding...");
      router.replace("/recommendations");
    } catch (error) {
      console.error("Sign-in error:", error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col py-8 px-4 md:gap-10 gap-5 items-center justify-center text-black bg-transparent">
      <div className="flex flex-col w-full gap-2 ">
        <h1 className="md:text-5xl text-2xl">📝 Get Started</h1>
      </div>

      <div className="w-full flex flex-col items-center gap-3">
        <label htmlFor="" className="flex flex-col items-start gap-3 w-full">
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
            //type="text" //check if the right type is text
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
          <Image
            src="/assets/googleIcon.svg"
            alt="Google Icon"
            width={24} // Corresponds to md:w-6 (6 * 4px = 24px)
            height={24} // Corresponds to md:h-6 (6 * 4px = 24px)
            className="md:w-6 md:h-6 w-3 h-3"
          />

          <span className="text-xs">Continue with Google</span>
        </button>
      </div>

      <ActionButton
        variant="variant1"
        label={submitting ? "..." : isOtpSent ? "Verify OTP" : "Send OTP"}
        //onClick={isOtpSent ? handleOtpSignIn : handleOtpRequest}
      />

      <button
        onClick={isOtpSent ? handleOtpSignIn : handleOtpRequest}
        className="mt-4 py-3 w-[80%] bg-black disabled:opacity-65 text-xs text-white rounded-xl cursor-pointer"
      >
        {submitting ? "..." : isOtpSent ? "Verify OTP" : "Send OTP"}
      </button>
    </div>
  );
};

export default AuthPage;
