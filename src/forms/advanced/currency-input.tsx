import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils';

export interface Currency {
  /** Currency code (ISO 4217) */
  code: string;
  /** Currency symbol */
  symbol: string;
  /** Currency name */
  name: string;
  /** Decimal places */
  decimals?: number;
}

export interface CurrencyInputProps {
  /** Numeric value */
  value: number;
  /** Change handler */
  onChange: (value: number) => void;
  /** Currency code or object */
  currency?: string | Currency;
  /** Currency change handler */
  onCurrencyChange?: (currency: string) => void;
  /** Available currencies */
  currencies?: Currency[];
  /** Show currency selector */
  showCurrencySelector?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

// Common currencies
const DEFAULT_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', decimals: 2 },
  { code: 'EUR', symbol: '€', name: 'Euro', decimals: 2 },
  { code: 'GBP', symbol: '£', name: 'British Pound', decimals: 2 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', decimals: 0 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', decimals: 2 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', decimals: 2 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', decimals: 2 },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', decimals: 2 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', decimals: 2 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', decimals: 2 },
];

/**
 * CurrencyInput Component
 *
 * Currency input with locale formatting and symbol display.
 * Supports multiple currencies and automatic formatting.
 *
 * @example
 * ```tsx
 * <CurrencyInput
 *   value={amount}
 *   onChange={setAmount}
 *   currency="USD"
 *   onCurrencyChange={setCurrency}
 *   showCurrencySelector
 * />
 * ```
 *
 * @example
 * ```tsx
 * <CurrencyInput
 *   value={price}
 *   onChange={setPrice}
 *   currency={{ code: 'EUR', symbol: '€', name: 'Euro' }}
 *   min={0}
 *   max={10000}
 * />
 * ```
 */
export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  currency: currencyProp = 'USD',
  onCurrencyChange,
  currencies = DEFAULT_CURRENCIES,
  showCurrencySelector = false,
  placeholder = '0.00',
  min,
  max,
  disabled = false,
  className,
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Get currency object
  const getCurrency = (): Currency => {
    if (typeof currencyProp === 'string') {
      return (
        currencies.find(c => c.code === currencyProp) || DEFAULT_CURRENCIES[0]
      );
    }
    return currencyProp;
  };

  const currentCurrency = getCurrency();

  // Format number for display
  const formatDisplay = useCallback(
    (num: number): string => {
      const decimals = currentCurrency.decimals ?? 2;
      return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    },
    [currentCurrency]
  );

  // Update display value when value or currency changes
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatDisplay(value || 0));
    }
  }, [value, formatDisplay, isFocused]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Remove all non-numeric characters except decimal point
    const cleaned = input.replace(/[^\d.]/g, '');

    // Allow only one decimal point
    const parts = cleaned.split('.');
    const formatted =
      parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;

    setDisplayValue(formatted);

    // Parse to number
    const numValue = parseFloat(formatted) || 0;

    // Apply min/max constraints
    let finalValue = numValue;
    if (min !== undefined && finalValue < min) finalValue = min;
    if (max !== undefined && finalValue > max) finalValue = max;

    onChange(finalValue);
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    // Show raw number without formatting on focus
    setDisplayValue(value ? value.toString() : '');
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);
    // Re-format on blur
    setDisplayValue(formatDisplay(value || 0));
  };

  // Handle currency change
  const handleCurrencyChange = (code: string) => {
    onCurrencyChange?.(code);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className='flex gap-2'>
        {/* Currency selector */}
        {showCurrencySelector && (
          <div className='relative'>
            <button
              type='button'
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              className={cn(
                'flex items-center gap-2 px-3 py-2 min-w-[100px]',
                'bg-white dark:bg-gray-900',
                'border border-gray-300 dark:border-gray-700',
                'rounded-md',
                'hover:bg-gray-50 dark:hover:bg-gray-800',
                'transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                isOpen && 'ring-2 ring-blue-500 dark:ring-blue-400'
              )}
            >
              <span className='text-sm font-medium text-gray-900 dark:text-white'>
                {currentCurrency.code}
              </span>
              <svg
                className={cn(
                  'w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform',
                  isOpen && 'rotate-180'
                )}
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </button>

            {/* Currency dropdown */}
            {isOpen && (
              <div className='absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50'>
                <div className='max-h-60 overflow-y-auto py-1'>
                  {currencies.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => handleCurrencyChange(curr.code)}
                      className={cn(
                        'w-full px-3 py-2 text-left flex items-center gap-3',
                        'hover:bg-gray-100 dark:hover:bg-gray-800',
                        'transition-colors',
                        curr.code === currentCurrency.code &&
                          'bg-blue-50 dark:bg-blue-900/30'
                      )}
                    >
                      <span className='text-lg font-semibold w-8'>
                        {curr.symbol}
                      </span>
                      <div className='flex-1'>
                        <p className='text-sm font-medium text-gray-900 dark:text-white'>
                          {curr.code}
                        </p>
                        <p className='text-xs text-gray-600 dark:text-gray-400'>
                          {curr.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Amount input */}
        <div className='relative flex-1'>
          <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400 text-sm font-medium'>
            {currentCurrency.symbol}
          </div>
          <input
            type='text'
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'w-full pl-8 pr-3 py-2 text-sm',
              'bg-white dark:bg-gray-900',
              'border border-gray-300 dark:border-gray-700',
              'rounded-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />
        </div>
      </div>

      {/* Helper text */}
      {(min !== undefined || max !== undefined) && (
        <p className='mt-1.5 text-xs text-gray-600 dark:text-gray-400'>
          {min !== undefined && max !== undefined
            ? `Range: ${currentCurrency.symbol}${formatDisplay(min)} - ${currentCurrency.symbol}${formatDisplay(max)}`
            : min !== undefined
              ? `Minimum: ${currentCurrency.symbol}${formatDisplay(min)}`
              : `Maximum: ${currentCurrency.symbol}${formatDisplay(max!)}`}
        </p>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className='fixed inset-0 z-40' onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CurrencyInput;
