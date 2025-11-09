import { cn } from '../lib/utils';
export interface ProfileHeaderProps { className?: string; }
export const profileheader = ({ className }: ProfileHeaderProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default profileheader;
