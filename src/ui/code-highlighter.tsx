import { cn } from '../lib/utils';
export interface CodeHighlighterProps { className?: string; }
export const codehighlighter = ({ className }: CodeHighlighterProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default codehighlighter;
