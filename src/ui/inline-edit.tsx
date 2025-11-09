
import { cn } from '../lib/utils';

export interface InlineEditProps {
  className?: string;
}

export const inlineedit = ({ className }: InlineEditProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default inlineedit;
