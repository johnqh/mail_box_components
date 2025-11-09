
import { cn } from '../lib/utils';

export interface SearchBarProps {
  className?: string;
}

export const searchbar = ({ className }: SearchBarProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default searchbar;
