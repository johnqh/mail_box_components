/**
 * NoContent component for displaying empty states
 */

import React from 'react';
import { cn } from "../../lib/utils";

interface NoContentProps {
  title: string;
  subtext: string;
  className?: string;
}

export const NoContent: React.FC<NoContentProps> = ({ 
  title, 
  subtext, 
  className 
}) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center h-full w-full",
      "text-center space-y-4 p-8",
      className
    )}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
        {subtext}
      </p>
    </div>
  );
};

export default NoContent;