
import { cn } from '../lib/utils';

export interface SettingsGroupProps {
  className?: string;
}

export const settingsgroup = ({ className }: SettingsGroupProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default settingsgroup;
