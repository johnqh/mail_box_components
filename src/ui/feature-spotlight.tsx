import { cn } from '../lib/utils';
export interface FeatureSpotlightProps { className?: string; }
export const featurespotlight = ({ className }: FeatureSpotlightProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default featurespotlight;
