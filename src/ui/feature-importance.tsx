import { cn } from '../lib/utils';
export interface FeatureImportanceProps { className?: string; }
export const featureimportance = ({ className }: FeatureImportanceProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default featureimportance;
