import React from 'react';

interface SecurityProviderProps {
  children: React.ReactNode;
}

const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export { SecurityProvider };
export default SecurityProvider;
