import React from 'react';
import { cn } from '../lib/utils';

export interface AppLinkItem {
  href: string;
  logo: string;
  alt: string;
}

export interface AppLinksProps {
  label: string;
  links: AppLinkItem[];
  logoSize?: number;
  className?: string;
}

export const AppLinks: React.FC<AppLinksProps> = ({
  label,
  links,
  logoSize = 48,
  className,
}) => {
  return (
    <div className={cn('flex flex-col items-center gap-4 py-12', className)}>
      <p className='text-sm text-theme-text-secondary'>{label}</p>
      <div className='flex flex-wrap items-center justify-center gap-6'>
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='transition-opacity hover:opacity-80'
          >
            <img
              src={link.logo}
              alt={link.alt}
              style={{ height: logoSize, width: 'auto' }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
