import { cn } from '../lib/utils';
export interface WhiteboardProps { className?: string; }
export const whiteboard = ({ className }: WhiteboardProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default whiteboard;
