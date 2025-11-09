import { cn } from '../lib/utils';
export interface MediaPlaylistProps { className?: string; }
export const mediaplaylist = ({ className }: MediaPlaylistProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default mediaplaylist;
