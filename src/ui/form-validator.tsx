
import { cn } from '../lib/utils';

export interface FormValidatorProps {
  className?: string;
}

export const formvalidator = ({ className }: FormValidatorProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default formvalidator;
