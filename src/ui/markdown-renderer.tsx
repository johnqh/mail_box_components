import { cn } from '../lib/utils';
export interface MarkdownRendererProps { className?: string; }
export const markdownrenderer = ({ className }: MarkdownRendererProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default markdownrenderer;
