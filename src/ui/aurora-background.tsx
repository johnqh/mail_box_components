import { cn } from '../lib/utils';
export interface AuroraBackgroundProps { className?: string; }
export const aurorabackground = ({ className }: AuroraBackgroundProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default aurorabackground;
