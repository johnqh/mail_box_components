import { cn } from '../lib/utils';
export interface SpreadsheetGridProps { className?: string; }
export const spreadsheetgrid = ({ className }: SpreadsheetGridProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default spreadsheetgrid;
