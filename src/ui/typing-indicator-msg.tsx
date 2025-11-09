
import { cn } from '../lib/utils';

export interface TypingIndicatorMsgProps {
  className?: string;
}

export const typingindicatormsg = ({ className }: TypingIndicatorMsgProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default typingindicatormsg;
