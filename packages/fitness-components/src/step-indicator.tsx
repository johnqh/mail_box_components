import React from 'react';
import { cn } from '@sudobility/components';
import { CheckIcon } from '@heroicons/react/24/solid';

export interface Step {
  /** Step label */
  label: string;
  /** Optional description */
  description?: string;
  /** Step status */
  status?: 'pending' | 'current' | 'completed';
}

export interface StepIndicatorProps {
  /** Array of steps */
  steps: Step[];
  /** Current active step index (0-based) */
  currentStep?: number;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  variant?: 'primary' | 'success' | 'purple';
  /** Show connector lines */
  showConnectors?: boolean;
  /** Additional className */
  className?: string;
  /** Click handler for steps */
  onStepClick?: (index: number) => void;
}

/**
 * StepIndicator Component
 *
 * Visual indicator for multi-step processes or workflows.
 * Shows numbered steps with optional labels, descriptions, and connecting lines.
 *
 * @example
 * ```tsx
 * <StepIndicator
 *   steps={[
 *     { label: 'Select Plan', status: 'completed' },
 *     { label: 'Payment', status: 'current' },
 *     { label: 'Confirmation', status: 'pending' },
 *   ]}
 *   currentStep={1}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <StepIndicator
 *   steps={steps}
 *   orientation="vertical"
 *   size="lg"
 *   showConnectors
 * />
 * ```
 */
export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep = 0,
  orientation = 'horizontal',
  size = 'md',
  variant = 'primary',
  showConnectors = true,
  className,
  onStepClick,
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      circle: 'w-6 h-6 text-xs',
      label: 'text-xs',
      description: 'text-xs',
      connector: orientation === 'vertical' ? 'h-6' : 'h-0.5',
    },
    md: {
      circle: 'w-8 h-8 text-sm',
      label: 'text-sm',
      description: 'text-xs',
      connector: orientation === 'vertical' ? 'h-8' : 'h-0.5',
    },
    lg: {
      circle: 'w-10 h-10 text-base',
      label: 'text-base',
      description: 'text-sm',
      connector: orientation === 'vertical' ? 'h-10' : 'h-0.5',
    },
  };

  // Color variant configurations
  const variantClasses = {
    primary: {
      active: 'bg-blue-500 text-white border-blue-500',
      completed: 'bg-blue-500 text-white border-blue-500',
      pending:
        'bg-white dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-600',
      connector: 'bg-blue-500',
      connectorPending: 'bg-gray-300 dark:bg-gray-600',
    },
    success: {
      active: 'bg-green-500 text-white border-green-500',
      completed: 'bg-green-500 text-white border-green-500',
      pending:
        'bg-white dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-600',
      connector: 'bg-green-500',
      connectorPending: 'bg-gray-300 dark:bg-gray-600',
    },
    purple: {
      active: 'bg-purple-500 text-white border-purple-500',
      completed: 'bg-purple-500 text-white border-purple-500',
      pending:
        'bg-white dark:bg-gray-800 text-gray-400 border-gray-300 dark:border-gray-600',
      connector: 'bg-purple-500',
      connectorPending: 'bg-gray-300 dark:bg-gray-600',
    },
  };

  const sizeConfig = sizeClasses[size];
  const variantConfig = variantClasses[variant];

  // Determine step status
  const getStepStatus = (
    index: number
  ): 'pending' | 'current' | 'completed' => {
    const step = steps[index];
    if (step.status) return step.status;
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'current';
    return 'pending';
  };

  const renderStep = (step: Step, index: number) => {
    const status = getStepStatus(index);
    const isClickable = onStepClick && status !== 'pending';

    const stepClasses = cn(
      'flex items-center justify-center rounded-full border-2 font-bold flex-shrink-0 transition-all',
      sizeConfig.circle,
      status === 'completed' && variantConfig.completed,
      status === 'current' && variantConfig.active,
      status === 'pending' && variantConfig.pending,
      isClickable && 'cursor-pointer hover:opacity-80'
    );

    return (
      <div
        key={index}
        className={cn(
          orientation === 'horizontal' ? 'flex items-center' : 'flex',
          orientation === 'horizontal' ? 'flex-col items-center' : 'items-start'
        )}
      >
        <div
          className={cn(
            orientation === 'horizontal'
              ? 'flex flex-col items-center'
              : 'flex items-start gap-3'
          )}
        >
          <div
            className={stepClasses}
            onClick={isClickable ? () => onStepClick(index) : undefined}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
          >
            {status === 'completed' ? (
              <CheckIcon
                className={cn(
                  size === 'sm'
                    ? 'h-3 w-3'
                    : size === 'md'
                      ? 'h-4 w-4'
                      : 'h-5 w-5'
                )}
              />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <div
            className={cn(
              orientation === 'horizontal' ? 'text-center mt-2' : 'flex-1'
            )}
          >
            <div
              className={cn(
                'font-medium',
                sizeConfig.label,
                status === 'pending'
                  ? 'text-gray-500 dark:text-gray-400'
                  : 'text-gray-900 dark:text-gray-100'
              )}
            >
              {step.label}
            </div>
            {step.description && (
              <div
                className={cn(
                  sizeConfig.description,
                  'text-gray-600 dark:text-gray-400 mt-0.5'
                )}
              >
                {step.description}
              </div>
            )}
          </div>
        </div>
        {showConnectors && index < steps.length - 1 && (
          <div
            className={cn(
              orientation === 'vertical' ? 'w-0.5 ml-3.5' : 'flex-1 mx-2',
              sizeConfig.connector,
              status === 'completed'
                ? variantConfig.connector
                : variantConfig.connectorPending
            )}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'items-start' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => renderStep(step, index))}
    </div>
  );
};

export default StepIndicator;
