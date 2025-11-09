import { cn } from '../lib/utils';
export interface AvatarGroupProps { className?: string; }
export const avatargroup = ({ className }: AvatarGroupProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default avatargroup;
