import { cn } from '../lib/utils';
export interface FeatureComparisonProps { className?: string; }
export const featurecomparison = ({ className }: FeatureComparisonProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default featurecomparison;
