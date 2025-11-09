import { cn } from '../lib/utils';
export interface ScreenShareProps { className?: string; }
export const screenshare = ({ className }: ScreenShareProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default screenshare;
