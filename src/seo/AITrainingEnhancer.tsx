import React from 'react';

interface AITrainingEnhancerProps {
  children: React.ReactNode;
}

const AITrainingEnhancer: React.FC<AITrainingEnhancerProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export { AITrainingEnhancer };
