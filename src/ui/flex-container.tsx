/**
 * @deprecated FlexContainer is deprecated. Use standard Tailwind flex utilities instead.
 *
 * Migration guide:
 * - `<FlexContainer align="center" gap="3">` → `<div className="flex items-center gap-3">`
 * - `<FlexContainer justify="between" align="center">` → `<div className="flex justify-between items-center">`
 * - `<FlexContainer direction="col" gap="4">` → `<div className="flex flex-col gap-4">`
 *
 * This component will be removed in v2.0. Please migrate to Tailwind flex classes.
 */

import React from 'react';
import { cn } from '../lib/utils';

/**
 * @deprecated Use Tailwind flex utilities instead. This component will be removed in v2.0.
 */
interface FlexContainerProps {
  children: React.ReactNode;
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12';
  className?: string;
}

const directionClasses = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
};

const alignClasses = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const wrapClasses = {
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
  nowrap: 'flex-nowrap',
};

const gapClasses = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
  '12': 'gap-12',
};

/**
 * @deprecated Use Tailwind flex utilities instead. This component will be removed in v2.0.
 * See migration guide in file header.
 */
export const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap = '0',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex',
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        wrapClasses[wrap],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};
