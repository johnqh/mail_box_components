import React from 'react';

interface OptimizedRoutePreloaderProps {
  children: React.ReactNode;
}

const OptimizedRoutePreloader: React.FC<OptimizedRoutePreloaderProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export { OptimizedRoutePreloader };
