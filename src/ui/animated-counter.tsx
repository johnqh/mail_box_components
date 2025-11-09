import { cn } from '../lib/utils';
export interface AnimatedCounterProps { className?: string; }
export const animatedcounter = ({ className }: AnimatedCounterProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default animatedcounter;
