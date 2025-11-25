import React from 'react';
import { cn } from '@sudobility/components';
import { variants as v } from '@sudobility/design';
import {
  BellAlertIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'attention' | 'error';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const defaultIcons = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  attention: BellAlertIcon,
  error: XCircleIcon,
};

export const AlertTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('font-medium mb-1', className)}>{children}</div>
);

export const AlertDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('text-sm break-words', className)}>{children}</div>
);

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  children,
  className,
}) => {
  const DefaultIcon = defaultIcons[variant];
  const IconComponent = icon || <DefaultIcon className='h-5 w-5' />;

  // ✨ SIMPLE: Get variant classes using the new system
  const alertClass =
    typeof v.alert[variant] === 'function' ? v.alert[variant]() : '';

  return (
    <div role='alert' className={cn(alertClass, className)}>
      {IconComponent && <div className='flex-shrink-0'>{IconComponent}</div>}
      <div className='flex-1 min-w-0'>
        {title && <div className='font-medium mb-1 break-words'>{title}</div>}
        {description && (
          <div className='text-sm break-words'>{description}</div>
        )}
        {children}
      </div>
    </div>
  );
};
