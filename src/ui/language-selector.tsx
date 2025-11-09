
import { cn } from '../lib/utils';

export interface LanguageSelectorProps {
  className?: string;
}

export const languageselector = ({ className }: LanguageSelectorProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default languageselector;
