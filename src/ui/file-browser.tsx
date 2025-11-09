
import { cn } from '../lib/utils';

export interface FileBrowserProps {
  className?: string;
}

export const filebrowser = ({ className }: FileBrowserProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default filebrowser;
