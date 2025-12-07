import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { textVariants, ui } from '@sudobility/design';

interface SlotProps {
  children: ReactNode;
  className?: string;
}

/**
 * FooterGrid - Grid container for full footer columns
 */
export const FooterGrid: React.FC<SlotProps> = ({ children, className }) => {
  return (
    <div className={cn('grid md:grid-cols-5 gap-8', className)}>{children}</div>
  );
};

/**
 * FooterBrand - Brand/logo section with description
 */
export interface FooterBrandProps extends SlotProps {
  /** Description text below the logo */
  description?: string;
}

export const FooterBrand: React.FC<FooterBrandProps> = ({
  children,
  description,
  className,
}) => {
  return (
    <div className={className}>
      <div className='mb-4'>{children}</div>
      {description && <p className={textVariants.body.sm()}>{description}</p>}
    </div>
  );
};

/**
 * FooterLinkSection - A column of links with a title
 */
export interface FooterLinkSectionProps extends SlotProps {
  /** Section title */
  title: string;
}

export const FooterLinkSection: React.FC<FooterLinkSectionProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div className={className}>
      <h3 className={cn(textVariants.heading.h5(), 'mb-4 text-white')}>
        {title}
      </h3>
      <ul className={cn('space-y-2', textVariants.body.sm())}>{children}</ul>
    </div>
  );
};

/**
 * FooterLink - Individual link item in a section
 */
export interface FooterLinkProps {
  /** Link content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const FooterLink: React.FC<FooterLinkProps> = ({
  children,
  className,
}) => {
  return (
    <li className={cn('hover:text-white transition-colors', className)}>
      {children}
    </li>
  );
};

/**
 * FooterBottom - Bottom bar with copyright, version, etc.
 */
export const FooterBottom: React.FC<SlotProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'border-t mt-8 pt-8 text-center',
        ui.border.default,
        className
      )}
    >
      <div className='flex items-center justify-center gap-3 text-gray-400 text-sm'>
        {children}
      </div>
    </div>
  );
};

/**
 * FooterCompact - Layout for compact footer variant
 */
export const FooterCompact: React.FC<SlotProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0',
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * FooterCompactLeft - Left side of compact footer (version, copyright, status)
 */
export const FooterCompactLeft: React.FC<SlotProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn('flex items-center gap-3 text-gray-400 text-sm', className)}
    >
      {children}
    </div>
  );
};

/**
 * FooterCompactRight - Right side of compact footer (links)
 */
export const FooterCompactRight: React.FC<SlotProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('flex space-x-6 text-sm', className)}>{children}</div>
  );
};

/**
 * FooterVersion - Version display
 */
export interface FooterVersionProps {
  version: string;
  className?: string;
}

export const FooterVersion: React.FC<FooterVersionProps> = ({
  version,
  className,
}) => {
  return <span className={cn('text-gray-500', className)}>v{version}</span>;
};

/**
 * FooterCopyright - Copyright text with optional link
 */
export interface FooterCopyrightProps {
  /** Year or year range (e.g., "2025" or "2025-2026") */
  year: string;
  /** Company/owner name */
  companyName: string;
  /** Rights text (e.g., "All rights reserved") */
  rightsText?: string;
  /** Link component wrapping company name */
  companyLink?: ReactNode;
  className?: string;
}

export const FooterCopyright: React.FC<FooterCopyrightProps> = ({
  year,
  companyName,
  rightsText,
  companyLink,
  className,
}) => {
  return (
    <span className={className}>
      &copy; {year}{' '}
      {companyLink || <span className='text-blue-400'>{companyName}</span>}
      {rightsText && `. ${rightsText}`}
    </span>
  );
};
