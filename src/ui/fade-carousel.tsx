import { cn } from '../lib/utils';
export interface FadeCarouselProps { className?: string; }
export const fadecarousel = ({ className }: FadeCarouselProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default fadecarousel;
