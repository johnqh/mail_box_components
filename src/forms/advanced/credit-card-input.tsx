import React from 'react';
import { cn } from '../../lib/utils';

export type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';

export interface CreditCardInputProps {
  /** Card number value */
  cardNumber: string;
  /** Card number change handler */
  onCardNumberChange: (value: string) => void;
  /** Expiry date value (MM/YY) */
  expiryDate?: string;
  /** Expiry date change handler */
  onExpiryDateChange?: (value: string) => void;
  /** CVV value */
  cvv?: string;
  /** CVV change handler */
  onCVVChange?: (value: string) => void;
  /** Cardholder name */
  cardholderName?: string;
  /** Cardholder name change handler */
  onCardholderNameChange?: (value: string) => void;
  /** Show all fields (card, expiry, cvv, name) */
  showAllFields?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * CreditCardInput Component
 *
 * Credit card input with auto-formatting and card type detection.
 * Supports multiple card types and validates input.
 *
 * @example
 * ```tsx
 * <CreditCardInput
 *   cardNumber={cardNumber}
 *   onCardNumberChange={setCardNumber}
 *   expiryDate={expiry}
 *   onExpiryDateChange={setExpiry}
 *   cvv={cvv}
 *   onCVVChange={setCvv}
 *   cardholderName={name}
 *   onCardholderNameChange={setName}
 *   showAllFields
 * />
 * ```
 *
 * @example
 * ```tsx
 * <CreditCardInput
 *   cardNumber={number}
 *   onCardNumberChange={setNumber}
 * />
 * ```
 */
export const CreditCardInput: React.FC<CreditCardInputProps> = ({
  cardNumber,
  onCardNumberChange,
  expiryDate = '',
  onExpiryDateChange,
  cvv = '',
  onCVVChange,
  cardholderName = '',
  onCardholderNameChange,
  showAllFields = false,
  disabled = false,
  className,
}) => {
  // Detect card type
  const detectCardType = (number: string): CardType => {
    const cleaned = number.replace(/\s/g, '');

    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'discover';

    return 'unknown';
  };

  const cardType = detectCardType(cardNumber);

  // Format card number
  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const type = detectCardType(cleaned);

    // Amex: 4-6-5 format
    if (type === 'amex') {
      const maxLength = 15;
      const trimmed = cleaned.slice(0, maxLength);
      const parts = [
        trimmed.slice(0, 4),
        trimmed.slice(4, 10),
        trimmed.slice(10, 15),
      ].filter(Boolean);
      return parts.join(' ');
    }

    // Other cards: 4-4-4-4 format
    const maxLength = 16;
    const trimmed = cleaned.slice(0, maxLength);
    const parts = trimmed.match(/.{1,4}/g) || [];
    return parts.join(' ');
  };

  // Format expiry date
  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const maxLength = 4;
    const trimmed = cleaned.slice(0, maxLength);

    if (trimmed.length >= 2) {
      return `${trimmed.slice(0, 2)}/${trimmed.slice(2)}`;
    }

    return trimmed;
  };

  // Format CVV
  const formatCVV = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const maxLength = cardType === 'amex' ? 4 : 3;
    return cleaned.slice(0, maxLength);
  };

  // Handle card number change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    onCardNumberChange(formatted);
  };

  // Handle expiry date change
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onExpiryDateChange) return;
    const formatted = formatExpiryDate(e.target.value);
    onExpiryDateChange(formatted);
  };

  // Handle CVV change
  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onCVVChange) return;
    const formatted = formatCVV(e.target.value);
    onCVVChange(formatted);
  };

  // Get card type icon
  const getCardIcon = () => {
    switch (cardType) {
      case 'visa':
        return (
          <svg className='w-8 h-5' viewBox='0 0 48 32' fill='none'>
            <rect width='48' height='32' rx='4' fill='#1434CB' />
            <path
              d='M20 11l-2 10h2l2-10h-2zm8 0l-3.5 7-1.5-7h-2l2.5 10h2l5.5-10h-3zm-12 0c-1.5 0-2.5.5-2.5 1.5 0 1.5 3 1.5 3 3.5s-2.5 2-4 2l-.5-2c1 0 2-.5 2-1.5s-3-1.5-3-3.5 2.5-2 4-2l.5 2z'
              fill='white'
            />
          </svg>
        );
      case 'mastercard':
        return (
          <svg className='w-8 h-5' viewBox='0 0 48 32' fill='none'>
            <rect width='48' height='32' rx='4' fill='#EB001B' />
            <circle cx='18' cy='16' r='8' fill='#F79E1B' />
            <circle cx='30' cy='16' r='8' fill='#FF5F00' />
          </svg>
        );
      case 'amex':
        return (
          <svg className='w-8 h-5' viewBox='0 0 48 32' fill='none'>
            <rect width='48' height='32' rx='4' fill='#006FCF' />
            <path d='M10 12h8l2 8-2 8h-8l-2-8 2-8z' fill='white' />
          </svg>
        );
      case 'discover':
        return (
          <svg className='w-8 h-5' viewBox='0 0 48 32' fill='none'>
            <rect width='48' height='32' rx='4' fill='#FF6000' />
            <circle cx='38' cy='16' r='6' fill='#FFA500' />
          </svg>
        );
      default:
        return (
          <svg
            className='w-5 h-5 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
            />
          </svg>
        );
    }
  };

  return (
    <div className={cn('w-full space-y-3', className)}>
      {/* Card number */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
          Card number
        </label>
        <div className='relative'>
          <input
            type='text'
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder='1234 5678 9012 3456'
            disabled={disabled}
            className={cn(
              'w-full px-3 py-2 pr-12 text-sm',
              'bg-white dark:bg-gray-900',
              'border border-gray-300 dark:border-gray-700',
              'rounded-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            {getCardIcon()}
          </div>
        </div>
      </div>

      {/* Expiry and CVV */}
      {showAllFields && (
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              Expiry date
            </label>
            <input
              type='text'
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder='MM/YY'
              disabled={disabled}
              className={cn(
                'w-full px-3 py-2 text-sm',
                'bg-white dark:bg-gray-900',
                'border border-gray-300 dark:border-gray-700',
                'rounded-md',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
              CVV
            </label>
            <input
              type='text'
              value={cvv}
              onChange={handleCVVChange}
              placeholder={cardType === 'amex' ? '1234' : '123'}
              disabled={disabled}
              className={cn(
                'w-full px-3 py-2 text-sm',
                'bg-white dark:bg-gray-900',
                'border border-gray-300 dark:border-gray-700',
                'rounded-md',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            />
          </div>
        </div>
      )}

      {/* Cardholder name */}
      {showAllFields && (
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
            Cardholder name
          </label>
          <input
            type='text'
            value={cardholderName}
            onChange={e => onCardholderNameChange?.(e.target.value)}
            placeholder='John Doe'
            disabled={disabled}
            className={cn(
              'w-full px-3 py-2 text-sm',
              'bg-white dark:bg-gray-900',
              'border border-gray-300 dark:border-gray-700',
              'rounded-md',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />
        </div>
      )}
    </div>
  );
};

export default CreditCardInput;
