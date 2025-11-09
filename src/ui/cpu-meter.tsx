import { cn } from '../lib/utils';
export interface CpuMeterProps { className?: string; }
export const cpumeter = ({ className }: CpuMeterProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default cpumeter;
