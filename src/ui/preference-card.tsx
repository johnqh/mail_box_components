
import { cn } from '../lib/utils';

export interface PreferenceCardProps {
  className?: string;
}

export const preferencecard = ({ className }: PreferenceCardProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default preferencecard;
