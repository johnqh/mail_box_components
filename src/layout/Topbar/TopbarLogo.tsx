import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface TopbarLogoProps {
  /** Logo content - can be an image, SVG, or custom component */
  children?: ReactNode;
  /** Image source URL (alternative to children) */
  src?: string;
  /** Alt text for the logo image */
  alt?: string;
  /** Click handler - typically navigates to home */
  onClick?: () => void;
  /** Link href (alternative to onClick) */
  href?: string;
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-6',
  md: 'h-8',
  lg: 'h-10',
};

/**
 * TopbarLogo - Logo component for the topbar
 *
 * @example
 * ```tsx
 * // With image
 * <TopbarLogo src="/logo.svg" alt="Company Logo" onClick={() => navigate('/')} />
 *
 * // With custom content
 * <TopbarLogo onClick={() => navigate('/')}>
 *   <MyLogoComponent />
 * </TopbarLogo>
 * ```
 */
export const TopbarLogo: React.FC<TopbarLogoProps> = ({
  children,
  src,
  alt = 'Logo',
  onClick,
  href,
  className,
  size = 'md',
}) => {
  const logoContent =
    children ||
    (src && (
      <img
        src={src}
        alt={alt}
        className={cn(sizeClasses[size], 'w-auto object-contain')}
      />
    ));

  const baseClasses = cn(
    'flex items-center',
    'hover:opacity-80 transition-opacity duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md',
    className
  );

  // Render as anchor if href is provided
  if (href) {
    return (
      <a href={href} className={baseClasses} title={alt}>
        {logoContent}
      </a>
    );
  }

  // Render as button if onClick is provided
  if (onClick) {
    return (
      <button
        type='button'
        onClick={onClick}
        className={baseClasses}
        title={alt}
        aria-label={`Go to ${alt || 'home'}`}
      >
        {logoContent}
      </button>
    );
  }

  // Render as static element
  return <div className={baseClasses}>{logoContent}</div>;
};
