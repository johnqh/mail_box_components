
import { cn } from '../lib/utils';

export interface UserTableProps {
  className?: string;
}

export const usertable = ({ className }: UserTableProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default usertable;
