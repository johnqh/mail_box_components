import { cn } from '../lib/utils';
export interface RentalApplicationProps { className?: string; }
export const rentalapplication = ({ className }: RentalApplicationProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700', className)}>Placeholder</div>;
export default rentalapplication;
