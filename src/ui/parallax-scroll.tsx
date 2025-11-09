import { cn } from '../lib/utils';
export interface ParallaxScrollProps { className?: string; }
export const parallaxscroll = ({ className }: ParallaxScrollProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default parallaxscroll;
