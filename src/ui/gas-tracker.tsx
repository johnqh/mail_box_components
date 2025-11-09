import { cn } from '../lib/utils';
export interface GasTrackerProps { className?: string; }
export const gastracker = ({ className }: GasTrackerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default gastracker;
