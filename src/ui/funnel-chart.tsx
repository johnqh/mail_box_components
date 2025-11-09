
import { cn } from '../lib/utils';

export interface FunnelChartProps {
  className?: string;
}

export const funnelchart = ({ className }: FunnelChartProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default funnelchart;
