import { cn } from '../lib/utils';
export interface AchievementBadgeProps { className?: string; }
export const achievementbadge = ({ className }: AchievementBadgeProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default achievementbadge;
