import { cn } from '../lib/utils';
export interface NeighborhoodInfoProps { className?: string; }
export const neighborhoodinfo = ({ className }: NeighborhoodInfoProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700', className)}>Placeholder</div>;
export default neighborhoodinfo;
