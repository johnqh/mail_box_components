
import { cn } from '../lib/utils';

export interface SortDropdownProps {
  className?: string;
}

export const sortdropdown = ({ className }: SortDropdownProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default sortdropdown;
