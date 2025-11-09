import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface Country {
  /** Country code (ISO 3166-1 alpha-2) */
  code: string;
  /** Country name */
  name: string;
  /** Dial code */
  dialCode: string;
  /** Flag emoji */
  flag: string;
}

export interface PhoneInputProps {
  /** Phone value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Selected country code */
  country?: string;
  /** Country change handler */
  onCountryChange?: (country: string) => void;
  /** Available countries (defaults to common countries) */
  countries?: Country[];
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Additional className */
  className?: string;
}

// Common countries
const DEFAULT_COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
];

/**
 * PhoneInput Component
 *
 * Phone number input with country code selector.
 * Formats phone numbers and shows country flags.
 *
 * @example
 * ```tsx
 * <PhoneInput
 *   value={phoneNumber}
 *   onChange={setPhoneNumber}
 *   country={selectedCountry}
 *   onCountryChange={setSelectedCountry}
 *   placeholder="Phone number"
 * />
 * ```
 *
 * @example
 * ```tsx
 * <PhoneInput
 *   value={phone}
 *   onChange={setPhone}
 *   countries={customCountryList}
 * />
 * ```
 */
export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  country: controlledCountry,
  onCountryChange,
  countries = DEFAULT_COUNTRIES,
  placeholder = 'Phone number',
  disabled = false,
  className,
}) => {
  const [internalCountry, setInternalCountry] = useState(
    countries[0]?.code || 'US'
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCountryCode =
    controlledCountry !== undefined ? controlledCountry : internalCountry;

  const selectedCountry = countries.find(c => c.code === selectedCountryCode);

  // Handle country selection
  const handleCountrySelect = (countryCode: string) => {
    if (controlledCountry !== undefined && onCountryChange) {
      onCountryChange(countryCode);
    } else {
      setInternalCountry(countryCode);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  // Format phone number (basic formatting)
  const formatPhoneNumber = (input: string): string => {
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, '');

    // Basic US/CA formatting (can be extended for other countries)
    if (selectedCountry?.dialCode === '+1') {
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6)
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }

    // Default: just return cleaned number
    return cleaned;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  // Filter countries based on search
  const filteredCountries = countries.filter(
    country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={cn('relative w-full', className)}>
      <div className='flex gap-2'>
        {/* Country selector */}
        <div className='relative'>
          <button
            type='button'
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              'flex items-center gap-2 px-3 py-2 min-w-[120px]',
              'bg-white dark:bg-gray-900',
              'border border-gray-300 dark:border-gray-700',
              'rounded-md',
              'hover:bg-gray-50 dark:hover:bg-gray-800',
              'transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              isOpen && 'ring-2 ring-blue-500 dark:ring-blue-400'
            )}
          >
            <span className='text-xl'>{selectedCountry?.flag}</span>
            <span className='text-sm font-medium text-gray-900 dark:text-white'>
              {selectedCountry?.dialCode}
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

          {/* Country dropdown */}
          {isOpen && (
            <div className='absolute top-full left-0 mt-1 w-72 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg z-50'>
              {/* Search */}
              <div className='p-2 border-b border-gray-200 dark:border-gray-700'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder='Search countries...'
                  className='w-full px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
                  onClick={e => e.stopPropagation()}
                />
              </div>

              {/* Countries list */}
              <div className='max-h-60 overflow-y-auto py-1'>
                {filteredCountries.length === 0 ? (
                  <div className='px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center'>
                    No countries found
                  </div>
                ) : (
                  filteredCountries.map(country => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country.code)}
                      className={cn(
                        'w-full px-3 py-2 text-left flex items-center gap-3',
                        'hover:bg-gray-100 dark:hover:bg-gray-800',
                        'transition-colors',
                        country.code === selectedCountryCode &&
                          'bg-blue-50 dark:bg-blue-900/30'
                      )}
                    >
                      <span className='text-xl'>{country.flag}</span>
                      <span className='flex-1 text-sm text-gray-900 dark:text-white'>
                        {country.name}
                      </span>
                      <span className='text-sm text-gray-600 dark:text-gray-400'>
                        {country.dialCode}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone number input */}
        <input
          type='tel'
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'flex-1 px-3 py-2 text-sm',
            'bg-white dark:bg-gray-900',
            'border border-gray-300 dark:border-gray-700',
            'rounded-md',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        />
      </div>

      {/* Full number display */}
      {value && selectedCountry && (
        <p className='mt-1.5 text-xs text-gray-600 dark:text-gray-400'>
          Full number: {selectedCountry.dialCode} {value}
        </p>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className='fixed inset-0 z-40' onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default PhoneInput;
