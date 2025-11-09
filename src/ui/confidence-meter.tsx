import { cn } from '../lib/utils';
export interface ConfidenceMeterProps { className?: string; }
export const confidencemeter = ({ className }: ConfidenceMeterProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default confidencemeter;
