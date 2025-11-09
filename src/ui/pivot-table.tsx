import { cn } from '../lib/utils';
export interface PivotTableProps { className?: string; }
export const pivottable = ({ className }: PivotTableProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default pivottable;
