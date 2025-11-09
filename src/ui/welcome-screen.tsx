import { cn } from '../lib/utils';
export interface WelcomeScreenProps { className?: string; }
export const welcomescreen = ({ className }: WelcomeScreenProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default welcomescreen;
