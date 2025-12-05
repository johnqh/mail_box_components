import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface TopbarActionsProps {
  /** Action elements (buttons, icons, etc.) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Gap between action items */
  gap?: 'sm' | 'md' | 'lg';
  /** Alignment of actions */
  align?: 'left' | 'center' | 'right';
}

const gapClasses = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-3',
};

const alignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

/**
 * TopbarActions - Container for action buttons and icons in the topbar
 *
 * @example
 * ```tsx
 * <TopbarActions>
 *   <IconButton icon={BellIcon} aria-label="Notifications" />
 *   <IconButton icon={SettingsIcon} aria-label="Settings" />
 *   <Button variant="primary">Sign In</Button>
 * </TopbarActions>
 * ```
 */
export const TopbarActions: React.FC<TopbarActionsProps> = ({
  children,
  className,
  gap = 'md',
  align = 'right',
}) => {
  return (
    <div
      className={cn(
        'flex items-center',
        gapClasses[gap],
        alignClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * TopbarIconButton - Standardized icon button for topbar actions
 */
export interface TopbarIconButtonProps {
  /** Icon component to render */
  icon: React.ComponentType<{ className?: string }>;
  /** Click handler */
  onClick?: () => void;
  /** ARIA label for accessibility */
  'aria-label': string;
  /** Additional CSS classes */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Badge count (e.g., for notifications) */
  badge?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

const iconSizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

const buttonSizeClasses = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-2.5',
};

export const TopbarIconButton: React.FC<TopbarIconButtonProps> = ({
  icon: Icon,
  onClick,
  'aria-label': ariaLabel,
  className,
  disabled = false,
  badge,
  size = 'md',
}) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'relative rounded-lg',
        buttonSizeClasses[size],
        'text-gray-500 dark:text-gray-400',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        'hover:text-gray-700 dark:hover:text-gray-200',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        'transition-colors duration-200',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <Icon className={iconSizeClasses[size]} />
      {badge !== undefined && badge > 0 && (
        <span
          className={cn(
            'absolute -top-1 -right-1',
            'min-w-[18px] h-[18px] px-1',
            'flex items-center justify-center',
            'text-xs font-medium',
            'bg-red-500 text-white rounded-full',
            'ring-2 ring-white dark:ring-gray-900'
          )}
          aria-label={`${badge} notifications`}
        >
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  );
};

/**
 * TopbarSearch - Search input component for the topbar
 */
export interface TopbarSearchProps {
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Submit handler */
  onSubmit?: (value: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Width variant */
  width?: 'sm' | 'md' | 'lg' | 'full';
  /** Whether to show on mobile */
  showOnMobile?: boolean;
}

const widthClasses = {
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-96',
  full: 'w-full',
};

export const TopbarSearch: React.FC<TopbarSearchProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSubmit,
  className,
  width = 'md',
  showOnMobile = false,
}) => {
  const [localValue, setLocalValue] = React.useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(localValue);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(!showOnMobile && 'hidden md:block', className)}
      role='search'
    >
      <div className='relative'>
        <svg
          className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
        <input
          type='search'
          value={localValue}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={placeholder}
          className={cn(
            widthClasses[width],
            'pl-10 pr-4 py-2',
            'text-sm',
            'bg-gray-100 dark:bg-gray-800',
            'border border-transparent',
            'rounded-lg',
            'text-gray-900 dark:text-gray-100',
            'placeholder:text-gray-500 dark:placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-700 focus:border-transparent',
            'transition-colors duration-200'
          )}
        />
      </div>
    </form>
  );
};
