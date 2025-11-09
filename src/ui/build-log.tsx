import { cn } from '../lib/utils';
export interface BuildLogProps { className?: string; }
export const buildlog = ({ className }: BuildLogProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default buildlog;
