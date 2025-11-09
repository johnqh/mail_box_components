import { cn } from '../lib/utils';
export interface BookingWidgetProps { className?: string; }
export const bookingwidget = ({ className }: BookingWidgetProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default bookingwidget;
