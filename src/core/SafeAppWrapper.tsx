import React from 'react';

interface SafeAppWrapperProps {
  children: React.ReactNode;
}

const SafeAppWrapper: React.FC<SafeAppWrapperProps> = ({ children }) => {
  return <>{children}</>;
};

export { SafeAppWrapper };
