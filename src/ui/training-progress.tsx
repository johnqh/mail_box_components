import { cn } from '../lib/utils';
export interface TrainingProgressProps { className?: string; }
export const trainingprogress = ({ className }: TrainingProgressProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default trainingprogress;
