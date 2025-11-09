import { cn } from '../lib/utils';
export interface VideoThumbnailProps { className?: string; }
export const videothumbnail = ({ className }: VideoThumbnailProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default videothumbnail;
