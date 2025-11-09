import { cn } from '../lib/utils';
export interface BatchProcessorProps { className?: string; }
export const batchprocessor = ({ className }: BatchProcessorProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700', className)}>Placeholder</div>;
export default batchprocessor;
