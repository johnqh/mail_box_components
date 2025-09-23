import React from 'react';
import { cn } from '../lib/utils';

export interface StepListItem {
  content: React.ReactNode;
  subItems?: React.ReactNode[];
}

export interface StepListProps {
  items: (string | StepListItem)[];
  type?: 'ordered' | 'unordered';
  variant?: 'default' | 'enhanced' | 'minimal';
  className?: string;
  itemClassName?: string;
}

export const StepList: React.FC<StepListProps> = ({
  items,
  type = 'ordered',
  variant = 'default',
  className,
  itemClassName,
}) => {
  const getListStyles = () => {
    const baseStyles = 'space-y-2';

    const typeStyles = {
      ordered: type === 'ordered' ? 'list-decimal' : '',
      unordered: type === 'unordered' ? 'list-disc' : '',
    };

    const variantStyles = {
      default: 'list-inside',
      enhanced: 'list-inside space-y-3',
      minimal: 'list-none space-y-1',
    };

    return cn(
      baseStyles,
      typeStyles[type as keyof typeof typeStyles],
      variantStyles[variant]
    );
  };

  const getItemStyles = (index: number) => {
    const baseStyles = 'text-gray-600 dark:text-gray-400';

    if (variant === 'enhanced') {
      return cn(
        baseStyles,
        'relative pl-8 pb-2 border-l-2 border-gray-200 dark:border-gray-700',
        index === items.length - 1 && 'border-l-transparent'
      );
    }

    if (variant === 'minimal') {
      return cn(baseStyles, 'flex items-start');
    }

    return baseStyles;
  };

  const getStepNumber = (index: number) => {
    if (variant === 'enhanced' && type === 'ordered') {
      return (
        <div className='absolute -left-4 -top-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium'>
          {index + 1}
        </div>
      );
    }
    return null;
  };

  const renderItem = (item: string | StepListItem, index: number) => {
    const isStepItem = typeof item === 'object';
    const content = isStepItem ? item.content : item;
    const subItems = isStepItem ? item.subItems : undefined;

    return (
      <li key={index} className={cn(getItemStyles(index), itemClassName)}>
        {getStepNumber(index)}
        {variant === 'minimal' && type === 'ordered' && (
          <span className='inline-block w-6 h-6 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium text-center leading-6 mr-3 flex-shrink-0'>
            {index + 1}
          </span>
        )}
        {variant === 'minimal' && type === 'unordered' && (
          <span className='inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0' />
        )}
        <div className='flex-1'>
          <div>{content}</div>
          {subItems && subItems.length > 0 && (
            <ul className='mt-2 ml-4 space-y-1 list-disc list-inside text-sm text-gray-500 dark:text-gray-500'>
              {subItems.map((subItem, subIndex) => (
                <li key={subIndex}>{subItem}</li>
              ))}
            </ul>
          )}
        </div>
      </li>
    );
  };

  return (
    <ul className={cn(getListStyles(), className)}>{items.map(renderItem)}</ul>
  );
};

export default StepList;
