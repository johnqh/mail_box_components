import { cn } from '../lib/utils';
export interface TestResultProps { className?: string; }
export const testresult = ({ className }: TestResultProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default testresult;
