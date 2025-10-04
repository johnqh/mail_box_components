/**
 * Sumsub Web SDK Component
 *
 * Embeds Sumsub verification UI for document upload and KYC verification
 */

import React, { useEffect, useRef } from 'react';

interface SumsubWebSDKProps {
  accessToken: string;
  onComplete?: () => void;
  onError?: (error: any) => void;
  className?: string;
}

declare global {
  interface Window {
    SumsubWebSdk: any;
  }
}

export const SumsubWebSDK: React.FC<SumsubWebSDKProps> = ({
  accessToken,
  onComplete,
  onError,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sdkInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!accessToken) {
      console.warn('No access token provided to SumsubWebSDK');
      return;
    }

    // Load Sumsub Web SDK script
    const script = document.createElement('script');
    script.src =
      'https://static.sumsub.com/idensic/static/sns-websdk-builder.js';
    script.async = true;

    script.onload = () => {
      if (containerRef.current && window.SumsubWebSdk) {
        try {
          sdkInstanceRef.current = window.SumsubWebSdk.Builder(
            containerRef.current,
            {
              accessToken,
              onMessage: (type: string, payload: any) => {
                // Message handler for Sumsub events
                if (type === 'idCheck.onApplicantSubmitted') {
                  // Applicant submitted successfully
                  onComplete?.();
                } else if (type === 'idCheck.onError') {
                  console.error('Sumsub error:', payload);
                  onError?.(payload);
                }
              },
              onError: (error: any) => {
                console.error('Sumsub SDK error:', error);
                onError?.(error);
              },
            }
          );

          sdkInstanceRef.current.build();
        } catch (error) {
          console.error('Failed to build Sumsub SDK:', error);
          onError?.(error);
        }
      }
    };

    script.onerror = () => {
      const error = new Error('Failed to load Sumsub Web SDK script');
      console.error(error);
      onError?.(error);
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }

      // Destroy SDK instance if it exists
      if (
        sdkInstanceRef.current &&
        typeof sdkInstanceRef.current.destroy === 'function'
      ) {
        sdkInstanceRef.current.destroy();
      }
    };
  }, [accessToken, onComplete, onError]);

  return (
    <div className={`sumsub-sdk-container ${className}`}>
      <div ref={containerRef} id='sumsub-websdk-container' />
    </div>
  );
};

export default SumsubWebSDK;
