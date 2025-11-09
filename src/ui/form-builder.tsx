
import { cn } from '../lib/utils';

export interface FormBuilderProps {
  className?: string;
}

export const formbuilder = ({ className }: FormBuilderProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default formbuilder;
