import { cn } from '../lib/utils';
export interface ApiReferenceProps { className?: string; }
export const apireference = ({ className }: ApiReferenceProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default apireference;
