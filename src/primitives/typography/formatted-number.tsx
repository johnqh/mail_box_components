import React from 'react';
import { cn } from '../../lib/utils';

export interface FormattedNumberProps {
  /** Number value to format */
  value: number;
  /** Number style */
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
  /** Currency code (for currency style) */
  currency?: string;
  /** Unit to display (for unit style) */
  unit?: string;
  /** Minimum fraction digits */
  minimumFractionDigits?: number;
  /** Maximum fraction digits */
  maximumFractionDigits?: number;
  /** Locale */
  locale?: string;
  /** Notation (compact for abbreviations like 1.2K) */
  notation?: 'standard' | 'compact';
  /** Additional className */
  className?: string;
}

/**
 * FormattedNumber Component
 *
 * Formats numbers using Intl.NumberFormat with various styles and locales.
 * Supports currencies, percentages, units, and compact notation.
 *
 * @example
 * ```tsx
 * <FormattedNumber value={1234.56} />
 * <FormattedNumber value={1234.56} notation="compact" />
 * <FormattedNumber
 *   value={1234.56}
 *   style="currency"
 *   currency="USD"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <FormattedNumber
 *   value={0.1234}
 *   style="percent"
 *   minimumFractionDigits={2}
 * />
 * <FormattedNumber
 *   value={1500000}
 *   notation="compact"
 * />
 * ```
 */
export const FormattedNumber: React.FC<FormattedNumberProps> = ({
  value,
  style = 'decimal',
  currency = 'USD',
  unit,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = 'en-US',
  notation = 'standard',
  className,
}) => {
  const formatNumber = (): string => {
    try {
      const options: Intl.NumberFormatOptions = {
        style,
        notation,
        minimumFractionDigits,
        maximumFractionDigits,
      };

      if (style === 'currency') {
        options.currency = currency;
      }

      if (style === 'unit' && unit) {
        options.unit = unit;
      }

      return new Intl.NumberFormat(locale, options).format(value);
    } catch (error) {
      // Fallback to basic formatting if Intl fails
      console.error('Number formatting error:', error);
      return value.toLocaleString(locale);
    }
  };

  return <span className={cn(className)}>{formatNumber()}</span>;
};
