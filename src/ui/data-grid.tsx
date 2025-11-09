
import { cn } from '../lib/utils';

export interface DataGridProps {
  className?: string;
}

export const datagrid = ({ className }: DataGridProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default datagrid;
