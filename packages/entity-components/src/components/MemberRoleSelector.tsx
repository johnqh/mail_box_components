/**
 * @fileoverview Member Role Selector Component
 * @description Dropdown for selecting member roles
 */

import { useState } from 'react';
import { ChevronDown, Shield, Briefcase, Eye, Check } from 'lucide-react';
import { EntityRole } from '@sudobility/types';
import { cn } from '../lib/utils';

export interface MemberRoleSelectorProps {
  /** Current role value */
  value: EntityRole;
  /** Change handler */
  onChange: (role: EntityRole) => void;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

interface RoleOption {
  value: EntityRole;
  label: string;
  description: string;
  icon: typeof Shield;
  color: string;
}

const roleOptions: RoleOption[] = [
  {
    value: EntityRole.ADMIN,
    label: 'Admin',
    description: 'Full access to all settings and members',
    icon: Shield,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    value: EntityRole.MANAGER,
    label: 'Manager',
    description: 'Can manage projects and API keys',
    icon: Briefcase,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    value: EntityRole.VIEWER,
    label: 'Viewer',
    description: 'Read-only access',
    icon: Eye,
    color: 'text-gray-600 dark:text-gray-400',
  },
];

/**
 * Dropdown selector for member roles.
 */
export function MemberRoleSelector({
  value,
  onChange,
  disabled = false,
  className,
}: MemberRoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedRole =
    roleOptions.find(r => r.value === value) || roleOptions[2];

  const handleSelect = (role: EntityRole) => {
    onChange(role);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Trigger Button */}
      <button
        type='button'
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded border text-sm',
          'bg-background transition-colors',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-muted cursor-pointer'
        )}
      >
        <selectedRole.icon className={cn('h-3.5 w-3.5', selectedRole.color)} />
        <span>{selectedRole.label}</span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 text-muted-foreground transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className='fixed inset-0 z-40'
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div
            className={cn(
              'absolute top-full right-0 mt-1 z-50',
              'min-w-[200px] rounded-lg border bg-popover shadow-lg p-1',
              'animate-in fade-in-0 zoom-in-95'
            )}
          >
            {roleOptions.map(option => (
              <button
                key={option.value}
                type='button'
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'flex items-start gap-2 w-full px-2 py-2 rounded text-left',
                  'transition-colors',
                  option.value === value ? 'bg-primary/10' : 'hover:bg-muted'
                )}
              >
                <option.icon className={cn('h-4 w-4 mt-0.5', option.color)} />
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-sm'>{option.label}</span>
                    {option.value === value && (
                      <Check className='h-3.5 w-3.5 text-primary' />
                    )}
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    {option.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
