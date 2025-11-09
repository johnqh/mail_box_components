import { cn } from '../lib/utils';

/**
 * InvestmentPortfolio Component
 *
 * Banking component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <InvestmentPortfolio className="custom-class" />
 * ```
 */
export interface InvestmentPortfolioProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const InvestmentPortfolio = ({
  className,
  children,
  disabled,
}: InvestmentPortfolioProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      role='region'
      aria-label='InvestmentPortfolio'
    >
      {children || 'InvestmentPortfolio Component'}
    </div>
  );
};

export default InvestmentPortfolio;
