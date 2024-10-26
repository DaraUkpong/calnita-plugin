'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { setCookie, getCookie } from '../utils/cookies';
import { Partner } from '@/services/graphql/types';



interface BrandContextType {
  partnerId: string | null;
  partnerData: Partner | null;
  isLoading: boolean;
  error: string | null;
}

const BrandContext = createContext<BrandContextType>({
  partnerId: null,
  partnerData: null,
  isLoading: true,
  error: null,
});

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [partnerId, setPartnerId] = useState<string | null>(null);
  const [partnerData, setPartnerData] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPartnerData = async (id: string) => {
    try {
      setIsLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch(`/api/partner/${id}`);
      if (!response.ok) throw new Error('Failed to fetch partner data');
      const data = await response.json();
      setPartnerData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeBrand = async () => {
      // Check for partnerId in cookie first
      let storedPartnerId = getCookie('partnerId');
      
      if (!storedPartnerId) {
        // If not in cookie, check URL and postMessage
        const urlParams = new URLSearchParams(window.location.search);
        storedPartnerId = urlParams.get('partnerId');

        
        if (storedPartnerId) {
          setCookie('partnerId', storedPartnerId);
        }
      }

      if (storedPartnerId) {
        setPartnerId(storedPartnerId);
        await fetchPartnerData(storedPartnerId);
      }
    };

    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'PARTNER_ID' && event.data.partnerId) {
        const newPartnerId = event.data.partnerId;
        setCookie('partnerId', newPartnerId);
        setPartnerId(newPartnerId);
        await fetchPartnerData(newPartnerId);
      }
    };

    window.addEventListener('message', handleMessage);
    initializeBrand();

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <BrandContext.Provider value={{ partnerId, partnerData, isLoading, error }}>
      {children}
    </BrandContext.Provider>
  );
}

export const useBrand = () => useContext(BrandContext);