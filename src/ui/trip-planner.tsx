import { cn } from '../lib/utils';
export interface TripPlannerProps { className?: string; }
export const tripplanner = ({ className }: TripPlannerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700', className)}>Placeholder</div>;
export default tripplanner;
