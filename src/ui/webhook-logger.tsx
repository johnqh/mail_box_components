import { cn } from '../lib/utils';
export interface WebhookLoggerProps { className?: string; }
export const webhooklogger = ({ className }: WebhookLoggerProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default webhooklogger;
