import { cn } from '../lib/utils';
export interface SensorReadingProps { className?: string; }
export const sensorreading = ({ className }: SensorReadingProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default sensorreading;
