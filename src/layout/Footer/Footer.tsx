import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type FooterVariant = 'full' | 'compact';

export interface FooterProps {
  /** Footer variant - full for landing pages, compact for app pages */
  variant?: FooterVariant;
  /** Whether the footer should stick to the bottom */
  sticky?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Footer content */
  children: ReactNode;
}

/**
 * Footer - Main footer container component
 *
 * @example
 * ```tsx
 * // Full footer for landing pages
 * <Footer variant="full">
 *   <FooterGrid>
 *     <FooterBrand>...</FooterBrand>
 *     <FooterLinkSection title="Platform">...</FooterLinkSection>
 *   </FooterGrid>
 *   <FooterBottom>...</FooterBottom>
 * </Footer>
 *
 * // Compact footer for app pages
 * <Footer variant="compact" sticky>
 *   <FooterCompact>...</FooterCompact>
 * </Footer>
 * ```
 */
export const Footer: React.FC<FooterProps> = ({
  variant = 'full',
  sticky = false,
  className,
  children,
}) => {
  const isCompact = variant === 'compact';

  return (
    <footer
      className={cn(
        'bg-gray-900 text-white transition-all duration-300 ease-in-out',
        isCompact ? 'py-4' : 'py-12',
        sticky
          ? 'sticky bottom-0 z-50 border-t border-gray-700'
          : 'relative z-10',
        'pointer-events-auto',
        className
      )}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
    </footer>
  );
};
