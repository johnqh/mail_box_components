import React from 'react';
import { cn } from '../lib/utils';
import { textVariants } from '@sudobility/design';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = 'No data',
  description,
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      {icon && <div className='mb-4 text-muted-foreground'>{icon}</div>}
      <h3 className={cn(textVariants.heading.h3(), 'mb-2')}>{title}</h3>
      {description && (
        <p
          className={cn(
            textVariants.body.sm(),
            'text-muted-foreground max-w-sm mb-6'
          )}
        >
          {description}
        </p>
      )}
      {action && <div className='mt-4'>{action}</div>}
    </div>
  );
};
