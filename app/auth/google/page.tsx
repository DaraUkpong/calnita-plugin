"use client";

import { Suspense, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

 function AuthCallback() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const parentUrl = searchParams.get("parentUrl");

  const handleGoogleSignIn = async (url: string) => {
    // If popup is blocked, try to sign in in the current window
    await signIn("google", {
      callbackUrl: `${process.env.APP_URL}/auth/callback?parentUrl=${encodeURIComponent(parentUrl!)}`,
      redirect: true,
    });
  };
  useEffect(() => {
   
    console.log(parentUrl);
     if (status === 'authenticated') {
      // Close the window and send a message to the parent
      window.opener.postMessage({ type: 'GOOGLE_SIGN_IN_SUCCESS', session }, '*');
      window.close();
    } else if (status === 'unauthenticated') {
      handleGoogleSignIn(parentUrl!);
    }
  }, [status, session, searchParams]);

  return <div className="h-svh w-screen flex flex-col items-center justify-center font-bold bg-black text-white text-sm md:text-lg">Authenticating...</div>;
}

export default function AuthCallbackWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCallback />
    </Suspense>
  );
}
