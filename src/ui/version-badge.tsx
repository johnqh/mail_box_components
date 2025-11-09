import { cn } from '../lib/utils';
export interface VersionBadgeProps { className?: string; }
export const versionbadge = ({ className }: VersionBadgeProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default versionbadge;
