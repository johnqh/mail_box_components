import { cn } from '../lib/utils';
export interface ImageComparisonProps { className?: string; }
export const imagecomparison = ({ className }: ImageComparisonProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default imagecomparison;
