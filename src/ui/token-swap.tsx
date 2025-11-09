import { cn } from '../lib/utils';
export interface TokenSwapProps { className?: string; }
export const tokenswap = ({ className }: TokenSwapProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default tokenswap;
