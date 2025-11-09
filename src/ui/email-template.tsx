import { cn } from '../lib/utils';
export interface EmailTemplateProps { className?: string; }
export const emailtemplate = ({ className }: EmailTemplateProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700', className)}>Placeholder</div>;
export default emailtemplate;
