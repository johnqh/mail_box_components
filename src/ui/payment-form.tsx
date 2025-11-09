import { cn } from '../lib/utils';
export interface PaymentFormProps { className?: string; }
export const paymentform = ({ className }: PaymentFormProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default paymentform;
