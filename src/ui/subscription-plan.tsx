import { cn } from '../lib/utils';
export interface SubscriptionPlanProps { className?: string; }
export const subscriptionplan = ({ className }: SubscriptionPlanProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default subscriptionplan;
