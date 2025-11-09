import { cn } from '../lib/utils';
export interface TestimonialSliderProps { className?: string; }
export const testimonialslider = ({ className }: TestimonialSliderProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default testimonialslider;
