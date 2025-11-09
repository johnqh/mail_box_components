import { cn } from '../lib/utils';
export interface GlassmorphismCardProps { className?: string; }
export const glassmorphismcard = ({ className }: GlassmorphismCardProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default glassmorphismcard;
