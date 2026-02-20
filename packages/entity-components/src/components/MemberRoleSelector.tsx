/**
 * @fileoverview Member Role Selector Component
 * @description Dropdown for selecting member roles
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  ChevronDownIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  EyeIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { EntityRole } from '@sudobility/types';
import { cn } from '../lib/utils';

/** Tracking data for MemberRoleSelector actions */
export interface MemberRoleSelectorTrackingData {
  action: 'toggle' | 'select';
  trackingLabel?: string;
  componentName?: string;
}

export interface MemberRoleSelectorProps {
  /** Current role value */
  value: EntityRole;
  /** Change handler */
  onChange: (role: EntityRole) => void;
  /** Whether the selector is disabled */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
  /** Optional tracking callback */
  onTrack?: (data: MemberRoleSelectorTrackingData) => void;
  /** Optional tracking label */
  trackingLabel?: string;
  /** Optional component name for tracking */
  componentName?: string;
}

interface RoleOption {
  value: EntityRole;
  label: string;
  description: string;
  icon: typeof ShieldCheckIcon;
  color: string;
}

const roleOptions: RoleOption[] = [
  {
    value: EntityRole.OWNER,
    label: 'Owner',
    description: 'Full access to all settings and members',
    icon: ShieldCheckIcon,
    color: 'text-purple-600 dark:text-purple-400',
  },
  {
    value: EntityRole.MANAGER,
    label: 'Manager',
    description: 'Can manage projects and API keys',
    icon: BriefcaseIcon,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    value: EntityRole.MEMBER,
    label: 'Member',
    description: 'Read-only access',
    icon: EyeIcon,
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
  onTrack,
  trackingLabel,
  componentName = 'MemberRoleSelector',
}: MemberRoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedRole =
    roleOptions.find(r => r.value === value) || roleOptions[2];

  const updateMenuPosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 4,
        left: rect.right - 200,
      });
    }
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      onTrack?.({ action: 'toggle', trackingLabel, componentName });
      if (!isOpen) {
        updateMenuPosition();
      }
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (role: EntityRole) => {
    onTrack?.({ action: 'select', trackingLabel, componentName });
    onChange(role);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside (check both trigger and menu refs)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close dropdown on escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type='button'
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          'flex items-center gap-1.5 px-2 py-1 rounded border text-sm',
          'bg-background transition-colors',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-muted cursor-pointer'
        )}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <selectedRole.icon className={cn('h-3.5 w-3.5', selectedRole.color)} />
        <span>{selectedRole.label}</span>
        <ChevronDownIcon
          className={cn(
            'h-3.5 w-3.5 text-muted-foreground transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown Menu - fixed position to escape overflow-hidden parents */}
      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'fixed z-50',
            'min-w-[200px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-1',
            'animate-in fade-in-0 zoom-in-95'
          )}
          style={{ top: menuPos.top, left: Math.max(0, menuPos.left) }}
          role='listbox'
          aria-label='Roles'
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
              role='option'
              aria-selected={option.value === value}
            >
              <option.icon className={cn('h-4 w-4 mt-0.5', option.color)} />
              <div className='flex-1 min-w-0'>
                <div className='flex items-center gap-2'>
                  <span className='font-medium text-sm'>{option.label}</span>
                  {option.value === value && (
                    <CheckIcon className='h-3.5 w-3.5 text-primary' />
                  )}
                </div>
                <p className='text-xs text-muted-foreground'>
                  {option.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
