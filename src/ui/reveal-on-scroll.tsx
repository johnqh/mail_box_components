import { cn } from '../lib/utils';
export interface RevealOnScrollProps { className?: string; }
export const revealonscroll = ({ className }: RevealOnScrollProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default revealonscroll;
