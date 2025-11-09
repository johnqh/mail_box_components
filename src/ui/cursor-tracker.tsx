import { cn } from '../lib/utils';
export interface CursorTrackerProps { className?: string; }
export const cursortracker = ({ className }: CursorTrackerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default cursortracker;
