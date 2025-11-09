import { cn } from '../lib/utils';
export interface DiffViewerProps { className?: string; }
export const diffviewer = ({ className }: DiffViewerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default diffviewer;
