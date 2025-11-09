
import { cn } from '../lib/utils';

export interface ScatterPlotProps {
  className?: string;
}

export const scatterplot = ({ className }: ScatterPlotProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default scatterplot;
