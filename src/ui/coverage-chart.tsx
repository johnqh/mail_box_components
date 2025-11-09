import { cn } from '../lib/utils';
export interface CoverageChartProps { className?: string; }
export const coveragechart = ({ className }: CoverageChartProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default coveragechart;
