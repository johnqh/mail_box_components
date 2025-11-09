import { cn } from '../lib/utils';
export interface AchievementUnlockProps { className?: string; }
export const achievementunlock = ({ className }: AchievementUnlockProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default achievementunlock;
