import { cn } from '../lib/utils';
export interface ReceiptTemplateProps { className?: string; }
export const receipttemplate = ({ className }: ReceiptTemplateProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700', className)}>Placeholder</div>;
export default receipttemplate;
