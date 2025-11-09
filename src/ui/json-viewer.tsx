import { cn } from '../lib/utils';
export interface JsonViewerProps { className?: string; }
export const jsonviewer = ({ className }: JsonViewerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default jsonviewer;
