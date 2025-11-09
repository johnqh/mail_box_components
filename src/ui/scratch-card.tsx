import { cn } from '../lib/utils';
export interface ScratchCardProps { className?: string; }
export const scratchcard = ({ className }: ScratchCardProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default scratchcard;
