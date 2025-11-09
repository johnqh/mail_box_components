import { cn } from '../lib/utils';
export interface FeedbackFormProps { className?: string; }
export const feedbackform = ({ className }: FeedbackFormProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default feedbackform;
