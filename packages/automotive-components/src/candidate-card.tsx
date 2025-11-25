import { cn } from '@sudobility/components';

/**
 * CandidateCard Component
 *
 * HR & recruiting component with full dark mode support.
 *
 * @component
 * @example
 * ```tsx
 * <CandidateCard className="custom-class" />
 * ```
 */
interface CandidateCardProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const CandidateCard = ({
  className,
  children,
  disabled,
}: CandidateCardProps) => {
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
      aria-label='CandidateCard'
    >
      {children || 'CandidateCard Component'}
    </div>
  );
};
