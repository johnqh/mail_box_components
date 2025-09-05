import React from 'react';
import { cn } from '../lib/utils';
import { variants } from '../design-system';
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
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
  error: XCircleIcon
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  children,
  className
}) => {
  const DefaultIcon = defaultIcons[variant];
  const IconComponent = icon || <DefaultIcon className="h-5 w-5" />;
  
  // Use design system alert variants for consistent styling
  const alertClass = variants.alert[variant]();

  return (
    <div className={cn(alertClass, className)}>
      {IconComponent && (
        <div className="flex-shrink-0">
          {IconComponent}
        </div>
      )}
      <div className="flex-1">
        {title && (
          <div className="font-medium mb-1">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm">
            {description}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Alert;