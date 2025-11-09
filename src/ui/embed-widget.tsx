import { cn } from '../lib/utils';
export interface EmbedWidgetProps { className?: string; }
export const embedwidget = ({ className }: EmbedWidgetProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default embedwidget;
