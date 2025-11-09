import { cn } from '../lib/utils';
export interface OAuthButtonProps { className?: string; }
export const oauthbutton = ({ className }: OAuthButtonProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default oauthbutton;
