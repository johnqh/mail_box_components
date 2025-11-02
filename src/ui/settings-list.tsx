import React from 'react';
import {
  Cog6ToothIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  FunnelIcon,
  LinkIcon,
  AdjustmentsHorizontalIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

/**
 * Setting section interface
 * Matches the SettingSection from useMailAccountSettings hook
 */
export interface SettingItem {
  id: string;
  title: string;
  icon?: string;
  description?: string;
}

export interface SettingsListProps {
  /** Array of setting items to display */
  settings: SettingItem[];
  /** Currently selected setting ID */
  selectedSetting?: string;
  /** Callback when a setting is selected */
  onSettingSelect: (settingId: string) => void;
  /** Optional CSS class name */
  className?: string;
}

/**
 * Icon mapping function based on icon name
 * Maps string icon identifiers to actual icon components
 */
const getIconForSetting = (
  iconName?: string
): React.ComponentType<{ className?: string }> => {
  switch (iconName) {
    case 'cog':
      return Cog6ToothIcon;
    case 'arrow-right':
      return ArrowRightIcon;
    case 'shield':
      return ShieldCheckIcon;
    case 'reply':
    case 'chat':
      return ChatBubbleLeftRightIcon;
    case 'filter':
      return FunnelIcon;
    case 'plug':
      return LinkIcon;
    case 'adjustments':
      return AdjustmentsHorizontalIcon;
    case 'currency-dollar':
      return CurrencyDollarIcon;
    default:
      return Cog6ToothIcon; // Default to cog icon
  }
};

/**
 * SettingsList Component
 *
 * Displays a list of setting items for an email account, similar to how
 * mailboxes are displayed in a mail client sidebar.
 *
 * Features:
 * - Each item shows an icon and title
 * - Highlights the currently selected setting
 * - Hover states for better UX
 * - Dark mode support
 * - Accessible keyboard navigation
 *
 * @example
 * ```tsx
 * <SettingsList
 *   settings={[
 *     { id: 'general', title: 'General', icon: 'cog' },
 *     { id: 'forwarding', title: 'Forwarding', icon: 'arrow-right' },
 *   ]}
 *   selectedSetting="general"
 * />
 * ```
 */
export const SettingsList: React.FC<SettingsListProps> = ({
  settings,
  selectedSetting,
  onSettingSelect,
  className = '',
}) => {
  return (
    <nav
      className={cn('space-y-1', className)}
      aria-label='Settings navigation'
    >
      <ul className='space-y-1' role='list'>
        {settings.map(setting => {
          const Icon = getIconForSetting(setting.icon);
          const isSelected = selectedSetting === setting.id;

          return (
            <li key={setting.id}>
              <button
                onClick={() => onSettingSelect(setting.id)}
                className={cn(
                  'w-full flex items-center text-left px-3 py-2 rounded-lg transition-colors h-[44px]',
                  textVariants.body.sm(),
                  isSelected
                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                )}
                aria-current={isSelected ? 'page' : undefined}
                title={setting.description}
              >
                <div className='flex items-center flex-1 min-w-0'>
                  <Icon
                    className='h-5 w-5 mr-3 flex-shrink-0'
                    aria-hidden='true'
                  />
                  <span className='truncate'>{setting.title}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SettingsList;
