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
    snsWebSdk: any;
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
      if (containerRef.current && window.snsWebSdk) {
        try {
          // Use WebSDK 2.0 API
          const snsWebSdkInstance = window.snsWebSdk
            .init(accessToken, () => accessToken) // Token refresh callback
            .withConf({
              lang: 'en',
            })
            .withOptions({
              addViewportTag: false,
              adaptIframeHeight: true,
            })
            .on('idCheck.onStepCompleted', (_payload: any) => {
              // Step completed
            })
            .on('idCheck.onApplicantSubmitted', (_payload: any) => {
              onComplete?.();
            })
            .on('idCheck.onError', (error: any) => {
              console.error('SumsubWebSDK: Error', error);
              onError?.(error);
            })
            .build();

          sdkInstanceRef.current = snsWebSdkInstance;

          snsWebSdkInstance.launch('#sumsub-websdk-container');
        } catch (error) {
          console.error('Failed to initialize Sumsub SDK:', error);
          onError?.(error);
        }
      } else {
        console.error(
          'SumsubWebSDK: Missing requirements - containerRef:',
          !!containerRef.current,
          'snsWebSdk:',
          !!window.snsWebSdk
        );
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
