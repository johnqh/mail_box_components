import { cn } from '../lib/utils';
export interface ProgressTrackerProps { className?: string; }
export const progresstracker = ({ className }: ProgressTrackerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default progresstracker;
