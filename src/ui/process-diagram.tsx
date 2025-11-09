import { cn } from '../lib/utils';
export interface ProcessDiagramProps { className?: string; }
export const processdiagram = ({ className }: ProcessDiagramProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default processdiagram;
