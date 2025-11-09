import { cn } from '../lib/utils';
export interface NftGalleryProps { className?: string; }
export const nftgallery = ({ className }: NftGalleryProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default nftgallery;
