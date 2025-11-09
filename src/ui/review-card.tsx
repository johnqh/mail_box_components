import { cn } from '../lib/utils';
export interface ReviewCardProps { className?: string; }
export const reviewcard = ({ className }: ReviewCardProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default reviewcard;
