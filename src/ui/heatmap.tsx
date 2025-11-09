
import { cn } from '../lib/utils';

export interface HeatmapProps {
  className?: string;
}

export const heatmap = ({ className }: HeatmapProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default heatmap;
