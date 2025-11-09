import { cn } from '../lib/utils';
export interface FlashcardProps { className?: string; }
export const flashcard = ({ className }: FlashcardProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default flashcard;
