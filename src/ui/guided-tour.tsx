import { cn } from '../lib/utils';
export interface GuidedTourProps { className?: string; }
export const guidedtour = ({ className }: GuidedTourProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default guidedtour;
