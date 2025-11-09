
import { cn } from '../lib/utils';

export interface MessageInputProps {
  className?: string;
}

export const messageinput = ({ className }: MessageInputProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default messageinput;
