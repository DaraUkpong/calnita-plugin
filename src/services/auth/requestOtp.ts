import { signIn } from "next-auth/react";

interface RequestOtpResponse {
  message: string;
  success: boolean;
}

export const requestOtp = async (
  email: string
): Promise<RequestOtpResponse> => {
  try {
    const response = await fetch(`/api/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`Failed to request OTP: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error requesting OTP:", error);
    throw error;
  }
};

export const otpSignIn = async (email: string, otp: string) => {
  try {
    const result = await signIn("email-otp", { email, otp, redirect: false });
    if (result?.error) throw new Error(result.error);
    return result;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

export const googleSignIn = async () => {
  try {
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/onboarding",
    });

    if (result?.error) {
      console.error("Google Sign-In failed:", result.error);
      throw new Error(result.error);
    }
    return { success: true, result };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};
