import { cn } from '../lib/utils';
export interface ApiPlaygroundProps { className?: string; }
export const apiplayground = ({ className }: ApiPlaygroundProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default apiplayground;
