
import { cn } from '../lib/utils';

export interface MessageListProps {
  className?: string;
}

export const messagelist = ({ className }: MessageListProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default messagelist;
