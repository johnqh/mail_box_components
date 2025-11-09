import { cn } from '../lib/utils';
export interface RadarChartProps { className?: string; }
export const radarchart = ({ className }: RadarChartProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default radarchart;
