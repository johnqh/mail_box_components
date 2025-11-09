import { cn } from '../lib/utils';
export interface PricingCalculatorProps { className?: string; }
export const pricingcalculator = ({ className }: PricingCalculatorProps) => <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-lg', className)}>Placeholder</div>;
export default pricingcalculator;
