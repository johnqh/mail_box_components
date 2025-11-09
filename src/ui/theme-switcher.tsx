
import { cn } from '../lib/utils';

export interface ThemeSwitcherProps {
  className?: string;
}

export const themeswitcher = ({ className }: ThemeSwitcherProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default themeswitcher;
