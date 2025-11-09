
import { cn } from '../lib/utils';

export interface FilterPanelProps {
  className?: string;
}

export const filterpanel = ({ className }: FilterPanelProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default filterpanel;
