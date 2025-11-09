import React from 'react';
import { cn } from '../lib/utils';

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target?: string;
  timestamp: string;
  avatar?: string;
  icon?: React.ReactNode;
}

export interface ActivityFeedProps {
  /** Activity items */
  items: ActivityItem[];
  /** Max items to show */
  maxItems?: number;
  /** Show avatars */
  showAvatars?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * ActivityFeed Component
 *
 * Activity feed widget for dashboards.
 * Displays recent user actions and events.
 *
 * @example
 * ```tsx
 * <ActivityFeed
 *   items={[
 *     { id: '1', user: 'John', action: 'created', target: 'new project', timestamp: '2 min ago' },
 *     { id: '2', user: 'Jane', action: 'commented on', target: 'issue #123', timestamp: '5 min ago' }
 *   ]}
 *   maxItems={5}
 *   showAvatars
 * />
 * ```
 */
export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  maxItems = 10,
  showAvatars = true,
  className,
}) => {
  const displayItems = items.slice(0, maxItems);

  return (
    <div className={cn('bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6', className)}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {displayItems.map((item) => (
          <div key={item.id} className="flex gap-3">
            {showAvatars && (
              <div className="flex-shrink-0">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.user} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white font-semibold">
                    {item.user.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-white">
                <span className="font-semibold">{item.user}</span>{' '}
                <span className="text-gray-600 dark:text-gray-400">{item.action}</span>{' '}
                {item.target && <span className="font-medium">{item.target}</span>}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {item.timestamp}
              </p>
            </div>

            {item.icon && (
              <div className="flex-shrink-0 text-gray-400">
                {item.icon}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
