import { cn } from '../lib/utils';
export interface BillingHistoryProps { className?: string; }
export const billinghistory = ({ className }: BillingHistoryProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default billinghistory;
