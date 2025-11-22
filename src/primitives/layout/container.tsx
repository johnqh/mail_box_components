import React from 'react';
import { cn } from '../../lib/utils';

export interface ContainerProps {
  /** Container content */
  children: React.ReactNode;
  /** Max width variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  /** Center container horizontally */
  center?: boolean;
  /** Padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

/**
 * Container Component
 *
 * Responsive container with max-width constraints and horizontal centering.
 * Useful for creating consistent page layouts and content areas.
 *
 * @example
 * ```tsx
 * <Container>
 *   <h1>Page Content</h1>
 * </Container>
 * ```
 *
 * @example
 * ```tsx
 * <Container size="lg" padding="lg">
 *   <Text>Centered content with large max-width</Text>
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'xl',
  center = true,
  padding = 'md',
  className,
}) => {
  // Max-width configurations
  const sizeClasses = {
    sm: 'max-w-screen-sm', // 640px
    md: 'max-w-screen-md', // 768px
    lg: 'max-w-screen-lg', // 1024px
    xl: 'max-w-screen-xl', // 1280px
    '2xl': 'max-w-screen-2xl', // 1536px
    full: 'max-w-full',
  };

  // Padding configurations
  const paddingClasses = {
    none: '',
    sm: 'px-4 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6',
  };

  return (
    <div
      className={cn(
        'w-full',
        sizeClasses[size],
        center && 'mx-auto',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
