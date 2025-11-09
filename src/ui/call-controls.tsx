import { cn } from '../lib/utils';
export interface CallControlsProps { className?: string; }
export const callcontrols = ({ className }: CallControlsProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default callcontrols;
