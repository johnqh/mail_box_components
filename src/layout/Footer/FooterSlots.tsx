import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { textVariants, ui } from '@sudobility/design';
import { Tooltip } from '../../ui/tooltip';

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

/**
 * FooterSocialLinks - Social media icons with tooltips
 * Only renders icons for links that are provided (non-empty)
 */
export interface FooterSocialLinksProps {
  twitterUrl?: string;
  redditUrl?: string;
  discordUrl?: string;
  linkedinUrl?: string;
  farcasterUrl?: string;
  telegramUrl?: string;
  githubUrl?: string;
  className?: string;
}

const SocialIcon: React.FC<{
  href: string;
  label: string;
  children: ReactNode;
}> = ({ href, label, children }) => (
  <Tooltip content={label}>
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='text-gray-400 hover:text-white transition-colors'
      aria-label={label}
    >
      {children}
    </a>
  </Tooltip>
);

export const FooterSocialLinks: React.FC<FooterSocialLinksProps> = ({
  twitterUrl,
  redditUrl,
  discordUrl,
  linkedinUrl,
  farcasterUrl,
  telegramUrl,
  githubUrl,
  className,
}) => {
  const hasAnySocial =
    twitterUrl ||
    redditUrl ||
    discordUrl ||
    linkedinUrl ||
    farcasterUrl ||
    telegramUrl ||
    githubUrl;

  if (!hasAnySocial) return null;

  return (
    <div className={cn('flex items-center gap-4', className)}>
      {twitterUrl && (
        <SocialIcon href={twitterUrl} label='Twitter / X'>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
          </svg>
        </SocialIcon>
      )}
      {redditUrl && (
        <SocialIcon href={redditUrl} label='Reddit'>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z' />
          </svg>
        </SocialIcon>
      )}
      {discordUrl && (
        <SocialIcon href={discordUrl} label='Discord'>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z' />
          </svg>
        </SocialIcon>
      )}
      {linkedinUrl && (
        <SocialIcon href={linkedinUrl} label='LinkedIn'>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
          </svg>
        </SocialIcon>
      )}
      {farcasterUrl && (
        <SocialIcon href={farcasterUrl} label='Farcaster'>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M18.24 2.4H5.76a3.36 3.36 0 0 0-3.36 3.36v12.48a3.36 3.36 0 0 0 3.36 3.36h12.48a3.36 3.36 0 0 0 3.36-3.36V5.76a3.36 3.36 0 0 0-3.36-3.36zm-2.16 13.2h-1.2v-4.8h-5.76v4.8H7.92V8.4h1.2v3.6h5.76V8.4h1.2v7.2z' />
          </svg>
        </SocialIcon>
      )}
      {telegramUrl && (
        <SocialIcon href={telegramUrl} label='Telegram'>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path d='M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' />
          </svg>
        </SocialIcon>
      )}
      {githubUrl && (
        <SocialIcon href={githubUrl} label='GitHub'>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z'
              clipRule='evenodd'
            />
          </svg>
        </SocialIcon>
      )}
    </div>
  );
};
