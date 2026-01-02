/**
 * @fileoverview Member List Component
 * @description List of entity members with role management
 */

import { User, Trash2 } from 'lucide-react';
import type { EntityMember, EntityRole } from '@sudobility/types';
import { MemberRoleSelector } from './MemberRoleSelector';
import { cn } from '../lib/utils';

export interface MemberListProps {
  /** Members to display */
  members: EntityMember[];
  /** Current user's ID (to identify self) */
  currentUserId?: string;
  /** Whether current user can manage members */
  canManage?: boolean;
  /** Role change handler */
  onRoleChange?: (memberId: string, role: EntityRole) => void;
  /** Remove member handler */
  onRemove?: (memberId: string) => void;
  /** Whether data is loading */
  isLoading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional class names */
  className?: string;
}

/**
 * Role badge styles
 */
const roleBadgeStyles: Record<EntityRole, string> = {
  admin:
    'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
  manager: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  viewer: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

/**
 * List component for displaying entity members.
 */
export function MemberList({
  members,
  currentUserId,
  canManage = false,
  onRoleChange,
  onRemove,
  isLoading = false,
  emptyMessage = 'No members found',
  className,
}: MemberListProps) {
  if (isLoading) {
    return (
      <div className={cn('space-y-2', className)}>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className='h-16 rounded-lg border border-border bg-muted animate-pulse'
          />
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className={cn('text-center py-8 text-muted-foreground', className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn('divide-y divide-border rounded-lg border', className)}>
      {members.map(member => (
        <MemberRow
          key={member.id}
          member={member}
          isSelf={member.userId === currentUserId}
          canManage={canManage}
          onRoleChange={onRoleChange}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

interface MemberRowProps {
  member: EntityMember;
  isSelf: boolean;
  canManage: boolean;
  onRoleChange?: (memberId: string, role: EntityRole) => void;
  onRemove?: (memberId: string) => void;
}

function MemberRow({
  member,
  isSelf,
  canManage,
  onRoleChange,
  onRemove,
}: MemberRowProps) {
  const displayName =
    member.user?.displayName || member.user?.email || 'Unknown user';
  const email = member.user?.email;

  return (
    <div className='flex items-center gap-3 p-3'>
      {/* Avatar */}
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-muted'>
        <User className='h-5 w-5 text-muted-foreground' />
      </div>

      {/* Info */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2'>
          <p className='font-medium text-foreground truncate'>{displayName}</p>
          {isSelf && (
            <span className='text-xs text-muted-foreground'>(you)</span>
          )}
        </div>
        {email && (
          <p className='text-sm text-muted-foreground truncate'>{email}</p>
        )}
      </div>

      {/* Role */}
      {canManage && onRoleChange && !isSelf ? (
        <MemberRoleSelector
          value={member.role}
          onChange={role => onRoleChange(member.userId, role)}
        />
      ) : (
        <span
          className={cn(
            'text-xs px-2 py-1 rounded-full font-medium',
            roleBadgeStyles[member.role]
          )}
        >
          {member.role}
        </span>
      )}

      {/* Actions */}
      {canManage && onRemove && !isSelf && (
        <button
          type='button'
          onClick={() => onRemove(member.userId)}
          className={cn(
            'p-1.5 rounded hover:bg-destructive/10 text-muted-foreground',
            'hover:text-destructive transition-colors'
          )}
          title='Remove member'
        >
          <Trash2 className='h-4 w-4' />
        </button>
      )}
    </div>
  );
}
