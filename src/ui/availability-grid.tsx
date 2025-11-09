import { cn } from '../lib/utils';
export interface AvailabilityGridProps { className?: string; }
export const availabilitygrid = ({ className }: AvailabilityGridProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default availabilitygrid;
