import { cn } from '../lib/utils';
export interface ScreenReaderTextProps { className?: string; }
export const screenreadertext = ({ className }: ScreenReaderTextProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default screenreadertext;
