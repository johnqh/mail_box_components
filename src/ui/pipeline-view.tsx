import { cn } from '../lib/utils';
export interface PipelineViewProps { className?: string; }
export const pipelineview = ({ className }: PipelineViewProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default pipelineview;
