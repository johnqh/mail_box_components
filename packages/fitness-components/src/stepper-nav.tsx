import React from 'react';
import { cn } from '@sudobility/components';

export interface NavStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperNavProps {
  steps: NavStep[];
  currentStep: number;
  onStepClick?: (index: number) => void;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const StepperNav: React.FC<StepperNavProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  className,
}) => {
  return (
    <nav
      className={cn(
        orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col',
        className
      )}
    >
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            'flex items-center',
            orientation === 'vertical' && 'flex-col items-start'
          )}
        >
          <div className='flex items-center gap-3'>
            <button
              onClick={() => onStepClick?.(index)}
              disabled={index > currentStep}
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                index < currentStep && 'bg-green-500 text-white',
                index === currentStep && 'bg-blue-500 text-white',
                index > currentStep &&
                  'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              )}
            >
              {index < currentStep ? '✓' : index + 1}
            </button>
            <div>
              <p className='font-medium text-gray-900 dark:text-white'>
                {step.label}
              </p>
              {step.description && (
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {step.description}
                </p>
              )}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                orientation === 'horizontal'
                  ? 'w-full h-0.5 mx-4'
                  : 'h-8 w-0.5 ml-5 my-2',
                'bg-gray-300 dark:bg-gray-700'
              )}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default StepperNav;
