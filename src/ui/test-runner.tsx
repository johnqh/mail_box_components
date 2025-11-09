import { cn } from '../lib/utils';
export interface TestRunnerProps { className?: string; }
export const testrunner = ({ className }: TestRunnerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default testrunner;
