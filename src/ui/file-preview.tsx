
import { cn } from '../lib/utils';

export interface FilePreviewProps {
  className?: string;
}

export const filepreview = ({ className }: FilePreviewProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default filepreview;
