import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface SlotProps {
  children: ReactNode;
  className?: string;
}

/**
 * TopbarLeft - Container for left-aligned content (logo, menu toggle)
 */
export const TopbarLeft: React.FC<SlotProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center gap-2 shrink-0', className)}>
      {children}
    </div>
  );
};

/**
 * TopbarCenter - Container for center content (search, navigation)
 * Grows to fill available space on desktop, hidden on mobile by default
 */
export const TopbarCenter: React.FC<SlotProps> = ({ children, className }) => {
  return (
    <div
      className={cn('flex-1 flex items-center justify-center px-4', className)}
    >
      {children}
    </div>
  );
};

/**
 * TopbarRight - Container for right-aligned content (actions, user menu)
 */
export const TopbarRight: React.FC<SlotProps> = ({ children, className }) => {
  return (
    <div className={cn('flex items-center gap-2 shrink-0', className)}>
      {children}
    </div>
  );
};

/**
 * TopbarMobileContent - Secondary row shown only on mobile
 * Useful for search bars or additional controls
 */
export const TopbarMobileContent: React.FC<SlotProps> = ({
  children,
  className,
}) => {
  return <div className={cn('md:hidden px-4 pb-3', className)}>{children}</div>;
};

/**
 * TopbarDivider - Visual separator between topbar sections
 */
export const TopbarDivider: React.FC<{ className?: string }> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        'hidden md:block h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2',
        className
      )}
      role='separator'
      aria-orientation='vertical'
    />
  );
};
