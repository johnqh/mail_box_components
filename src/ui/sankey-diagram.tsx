import { cn } from '../lib/utils';
export interface SankeyDiagramProps { className?: string; }
export const sankeydiagram = ({ className }: SankeyDiagramProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default sankeydiagram;
