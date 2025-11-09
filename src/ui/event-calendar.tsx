import { cn } from '../lib/utils';
export interface EventCalendarProps { className?: string; }
export const eventcalendar = ({ className }: EventCalendarProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default eventcalendar;
