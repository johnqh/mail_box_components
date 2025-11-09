import { cn } from '../lib/utils';
export interface VideoCallProps { className?: string; }
export const videocall = ({ className }: VideoCallProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default videocall;
