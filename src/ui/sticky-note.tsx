import { cn } from '../lib/utils';
export interface StickyNoteProps { className?: string; }
export const stickynote = ({ className }: StickyNoteProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default stickynote;
