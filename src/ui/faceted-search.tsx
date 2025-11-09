
import { cn } from '../lib/utils';

export interface FacetedSearchProps {
  className?: string;
}

export const facetedsearch = ({ className }: FacetedSearchProps) => {
  return <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
};

export default facetedsearch;
