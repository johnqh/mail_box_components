import { cn } from '../lib/utils';
export interface SkillProgressProps { className?: string; }
export const skillprogress = ({ className }: SkillProgressProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default skillprogress;
