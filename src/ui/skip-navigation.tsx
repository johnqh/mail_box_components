import { cn } from '../lib/utils';
export interface SkipNavigationProps { className?: string; }
export const skipnavigation = ({ className }: SkipNavigationProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default skipnavigation;
