
import { cn } from '../lib/utils';

export interface MetricComparisonProps {
  className?: string;
}

export const metriccomparison = ({ className }: MetricComparisonProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default metriccomparison;
