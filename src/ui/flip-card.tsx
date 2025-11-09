import { cn } from '../lib/utils';
export interface FlipCardProps { className?: string; }
export const flipcard = ({ className }: FlipCardProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default flipcard;
