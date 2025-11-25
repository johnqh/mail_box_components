import React from 'react';

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({
  children,
}) => {
  return <>{children}</>;
};
