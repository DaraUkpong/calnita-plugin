"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    const parentUrl = searchParams.get('parentUrl');
    console.log
    if (status !== 'loading') {
      if (window.opener) {
        window.opener.postMessage({ type: 'GOOGLE_SIGN_IN_RESULT', success: status === 'authenticated', session }, parentUrl || '*');
        window.close();
      } else {
        // If there's no opener, we're in the iframe
        window.parent.postMessage({ type: 'GOOGLE_SIGN_IN_RESULT', success: status === 'authenticated', session }, parentUrl || '*');
      }
    }
  }, [status, session, searchParams]);

  return <div>Authentication complete. You can close this window.</div>;
}