import { cn } from '../lib/utils';
export interface TaskDependencyProps { className?: string; }
export const taskdependency = ({ className }: TaskDependencyProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default taskdependency;
