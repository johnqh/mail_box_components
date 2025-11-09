
import { cn } from '../lib/utils';

export interface RoleManagerProps {
  className?: string;
}

export const rolemanager = ({ className }: RoleManagerProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default rolemanager;
