import { cn } from '../lib/utils';
export interface BubbleChartProps { className?: string; }
export const bubblechart = ({ className }: BubbleChartProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default bubblechart;
