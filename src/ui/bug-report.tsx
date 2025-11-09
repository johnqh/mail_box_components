import { cn } from '../lib/utils';
export interface BugReportProps { className?: string; }
export const bugreport = ({ className }: BugReportProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default bugreport;
