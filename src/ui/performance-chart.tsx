import { cn } from '../lib/utils';
export interface PerformanceChartProps { className?: string; }
export const performancechart = ({ className }: PerformanceChartProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default performancechart;
