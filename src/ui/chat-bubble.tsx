
import { cn } from '../lib/utils';

export interface ChatBubbleProps {
  className?: string;
}

export const chatbubble = ({ className }: ChatBubbleProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default chatbubble;
