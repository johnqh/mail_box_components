import React from 'react';
import { cn } from '../lib/utils';

export interface StepperStep {
  /** Step ID */
  id: string;
  /** Step label */
  label: string;
  /** Step description */
  description?: string;
  /** Step icon */
  icon?: React.ReactNode;
}

export interface StepperProps {
  /** Steps array */
  steps: StepperStep[];
  /** Current active step index */
  currentStep: number;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Allow clicking on steps */
  clickable?: boolean;
  /** Step click handler */
  onStepClick?: (stepIndex: number) => void;
  /** Additional className */
  className?: string;
}

/**
 * Stepper Component
 *
 * Multi-step progress indicator for workflows.
 * Supports horizontal and vertical orientations.
 *
 * @example
 * ```tsx
 * <Stepper
 *   steps={[
 *     { id: '1', label: 'Account' },
 *     { id: '2', label: 'Profile' },
 *     { id: '3', label: 'Confirm' }
 *   ]}
 *   currentStep={1}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <Stepper
 *   steps={steps}
 *   currentStep={activeStep}
 *   orientation="vertical"
 *   clickable
 *   onStepClick={setActiveStep}
 * />
 * ```
 */
export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  clickable = false,
  onStepClick,
  className,
}) => {
  const handleStepClick = (index: number) => {
    if (clickable && onStepClick) {
      onStepClick(index);
    }
  };

  const getStepStatus = (index: number): 'completed' | 'active' | 'upcoming' => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'upcoming';
  };

  if (orientation === 'horizontal') {
    return (
      <div className={cn('w-full', className)}>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isLast = index === steps.length - 1;

            return (
              <React.Fragment key={step.id}>
                {/* Step */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleStepClick(index)}
                    disabled={!clickable}
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                      'disabled:cursor-default',
                      clickable && 'hover:scale-110',
                      status === 'completed' &&
                        'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500',
                      status === 'active' &&
                        'bg-white dark:bg-gray-900 border-blue-600 dark:border-blue-500',
                      status === 'upcoming' &&
                        'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700'
                    )}
                  >
                    {status === 'completed' ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : step.icon ? (
                      <span
                        className={cn(
                          'w-5 h-5',
                          status === 'active'
                            ? 'text-blue-600 dark:text-blue-500'
                            : 'text-gray-400 dark:text-gray-600'
                        )}
                      >
                        {step.icon}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          'text-sm font-semibold',
                          status === 'active'
                            ? 'text-blue-600 dark:text-blue-500'
                            : 'text-gray-400 dark:text-gray-600'
                        )}
                      >
                        {index + 1}
                      </span>
                    )}
                  </button>

                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        status === 'active'
                          ? 'text-blue-600 dark:text-blue-500'
                          : status === 'completed'
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      )}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {!isLast && (
                  <div className="flex-1 h-0.5 mx-2 bg-gray-300 dark:bg-gray-700 relative">
                    <div
                      className={cn(
                        'absolute left-0 top-0 h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300',
                        index < currentStep ? 'w-full' : 'w-0'
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className={cn('w-full', className)}>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex gap-4">
              {/* Step indicator column */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!clickable}
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                    'disabled:cursor-default flex-shrink-0',
                    clickable && 'hover:scale-110',
                    status === 'completed' &&
                      'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500',
                    status === 'active' &&
                      'bg-white dark:bg-gray-900 border-blue-600 dark:border-blue-500',
                    status === 'upcoming' &&
                      'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700'
                  )}
                >
                  {status === 'completed' ? (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : step.icon ? (
                    <span
                      className={cn(
                        'w-5 h-5',
                        status === 'active'
                          ? 'text-blue-600 dark:text-blue-500'
                          : 'text-gray-400 dark:text-gray-600'
                      )}
                    >
                      {step.icon}
                    </span>
                  ) : (
                    <span
                      className={cn(
                        'text-sm font-semibold',
                        status === 'active'
                          ? 'text-blue-600 dark:text-blue-500'
                          : 'text-gray-400 dark:text-gray-600'
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </button>

                {/* Connector Line */}
                {!isLast && (
                  <div className="w-0.5 flex-1 min-h-[32px] bg-gray-300 dark:bg-gray-700 relative mt-2">
                    <div
                      className={cn(
                        'absolute top-0 left-0 w-full bg-blue-600 dark:bg-blue-500 transition-all duration-300',
                        index < currentStep ? 'h-full' : 'h-0'
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Content column */}
              <div className="flex-1 pb-4">
                <p
                  className={cn(
                    'text-sm font-medium',
                    status === 'active'
                      ? 'text-blue-600 dark:text-blue-500'
                      : status === 'completed'
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
