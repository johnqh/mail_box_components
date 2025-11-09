import { cn } from '../lib/utils';
export interface SpinWheelProps { className?: string; }
export const spinwheel = ({ className }: SpinWheelProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default spinwheel;
