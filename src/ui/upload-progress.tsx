
import { cn } from '../lib/utils';

export interface UploadProgressProps {
  className?: string;
}

export const uploadprogress = ({ className }: UploadProgressProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default uploadprogress;
