import { cn } from '../lib/utils';
export interface CtaBannerProps { className?: string; }
export const ctabanner = ({ className }: CtaBannerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default ctabanner;
