import { cn } from '../lib/utils';
export interface ShiftPlannerProps { className?: string; }
export const shiftplanner = ({ className }: ShiftPlannerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700', className)}>Placeholder</div>;
export default shiftplanner;
