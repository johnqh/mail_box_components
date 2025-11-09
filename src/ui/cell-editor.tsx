import { cn } from '../lib/utils';
export interface CellEditorProps { className?: string; }
export const celleditor = ({ className }: CellEditorProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default celleditor;
