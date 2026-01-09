/**
 * @fileoverview Entity Card Component
 * @description Card displaying entity information
 */

import { Building2, User } from 'lucide-react';
import type { EntityWithRole, EntityRole } from '@sudobility/types';
import { cn } from '../lib/utils';

/** Tracking data for EntityCard actions */
export interface EntityCardTrackingData {
  action: 'click';
  trackingLabel?: string;
  componentName?: string;
}

export interface EntityCardProps {
  /** Entity to display */
  entity: EntityWithRole;
  /** Whether this is the currently selected entity */
  isSelected?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional class names */
  className?: string;
  /** Optional tracking callback */
  onTrack?: (data: EntityCardTrackingData) => void;
  /** Optional tracking label */
  trackingLabel?: string;
  /** Optional component name for tracking */
  componentName?: string;
}

/**
 * Role badge colors
 */
const roleBadgeStyles: Record<EntityRole, string> = {
  owner:
    'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  admin: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  member: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

/**
 * Card component for displaying an entity.
 */
export function EntityCard({
  entity,
  isSelected = false,
  onClick,
  className,
  onTrack,
  trackingLabel,
  componentName = 'EntityCard',
}: EntityCardProps) {
  const isPersonal = entity.entityType === 'personal';
  const Icon = isPersonal ? User : Building2;

  const handleClick = () => {
    onTrack?.({ action: 'click', trackingLabel, componentName });
    onClick?.();
  };

  return (
    <div
      onClick={onClick ? handleClick : undefined}
      className={cn(
        'rounded-lg border p-4 transition-all',
        onClick && 'cursor-pointer hover:border-primary',
        isSelected && 'border-primary bg-primary/5',
        !isSelected && 'border-border bg-card',
        className
      )}
    >
      <div className='flex items-start gap-3'>
        {/* Avatar/Icon */}
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-full',
            isPersonal
              ? 'bg-blue-100 dark:bg-blue-900'
              : 'bg-purple-100 dark:bg-purple-900'
          )}
        >
          {entity.avatarUrl ? (
            <img
              src={entity.avatarUrl}
              alt={entity.displayName}
              className='h-10 w-10 rounded-full object-cover'
            />
          ) : (
            <Icon
              className={cn(
                'h-5 w-5',
                isPersonal
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-purple-600 dark:text-purple-400'
              )}
            />
          )}
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2'>
            <h3 className='font-medium text-foreground truncate'>
              {entity.displayName}
            </h3>
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full font-medium',
                roleBadgeStyles[entity.userRole]
              )}
            >
              {entity.userRole}
            </span>
          </div>
          <p className='text-sm text-muted-foreground'>
            {isPersonal ? 'Personal workspace' : 'Organization'}
          </p>
          {entity.description && (
            <p className='text-sm text-muted-foreground mt-1 line-clamp-2'>
              {entity.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
