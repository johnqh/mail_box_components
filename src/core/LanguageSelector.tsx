import React from 'react';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

interface LanguageSelectorProps {
  variant?: 'compact' | 'full';
  className?: string;
}

// Language mappings with proper names and flags
const LANGUAGE_INFO: Record<string, { name: string; flag: string }> = {
  en: { name: 'English', flag: '🇺🇸' },
  ar: { name: 'العربية', flag: '🇸🇦' },
  de: { name: 'Deutsch', flag: '🇩🇪' },
  es: { name: 'Español', flag: '🇪🇸' },
  fr: { name: 'Français', flag: '🇫🇷' },
  it: { name: 'Italiano', flag: '🇮🇹' },
  ja: { name: '日本語', flag: '🇯🇵' },
  ko: { name: '한국어', flag: '🇰🇷' },
  pt: { name: 'Português', flag: '🇵🇹' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  sv: { name: 'Svenska', flag: '🇸🇪' },
  th: { name: 'ไทย', flag: '🇹🇭' },
  uk: { name: 'Українська', flag: '🇺🇦' },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳' },
  zh: { name: '简体中文', flag: '🇨🇳' },
};

/**
 * LanguageSelector - A comprehensive internationalization language selector component
 *
 * Features:
 * - Supports both compact and full variants
 * - Displays language flags and native names
 * - Integrates with react-i18next for language switching
 * - Automatically detects supported languages from i18next configuration
 * - Provides visual feedback and localStorage persistence
 *
 * @param variant - Display variant: "compact" for minimal UI, "full" for detailed form
 * @param className - Additional CSS classes
 */
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { i18n, t } = useTranslation('languageSelector');
  const [currentLang, setCurrentLang] = React.useState(i18n.language);

  // Get supported languages from i18next and map them with info
  const languages = React.useMemo(() => {
    if (!i18n.options.supportedLngs) return [];

    return i18n.options.supportedLngs
      .filter((lng: string) => lng !== 'cimode') // Filter out i18next's debug language
      .map((code: string) => ({
        code: code,
        name: LANGUAGE_INFO[code]?.name || code.toUpperCase(),
        flag: LANGUAGE_INFO[code]?.flag || '🌐',
      }))
      .sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );
  }, [i18n.options.supportedLngs]);

  const currentLanguage = languages.find(
    lang =>
      lang.code === currentLang ||
      lang.code.toLowerCase() === currentLang.toLowerCase()
  );

  // Sync current language state with i18n changes
  React.useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const handleLanguageChange = (newLanguage: string) => {
    // Set localStorage first
    localStorage.setItem('language', newLanguage);

    // Change language
    i18n
      .changeLanguage(newLanguage)
      .then(() => {
        // Update local state to force re-render
        setCurrentLang(i18n.language);

        // Force re-render by triggering a state update
        setTimeout(() => {
          window.dispatchEvent(new Event('languagechange'));
        }, 100);
      })
      .catch(() => {
        // Language change failed
      });
  };

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <Select value={currentLang} onValueChange={handleLanguageChange}>
          <SelectTrigger className='h-10 w-auto px-3 border-0 bg-transparent hover:bg-muted focus:ring-0 focus:ring-offset-0'>
            <div className='flex items-center space-x-2'>
              <span className='text-lg leading-none'>
                {currentLanguage?.flag}
              </span>
              <span className='hidden sm:block text-sm font-medium text-foreground'>
                {currentLanguage?.name}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {languages.map(
              (lang: { code: string; name: string; flag: string }) => (
                <SelectItem
                  key={lang.code}
                  value={lang.code}
                  className='cursor-pointer'
                >
                  <div className='flex items-center space-x-2'>
                    <span className='text-lg leading-none'>{lang.flag}</span>
                    <span className='text-sm'>{lang.name}</span>
                  </div>
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <label className='text-sm font-medium text-foreground flex items-center space-x-2'>
        <LanguageIcon className='h-4 w-4 text-muted-foreground' />
        <span>{t('language', 'Language')}</span>
      </label>
      <Select value={currentLang} onValueChange={handleLanguageChange}>
        <SelectTrigger>
          <SelectValue placeholder={t('selectLanguage', 'Select language')} />
        </SelectTrigger>
        <SelectContent>
          {languages.map(
            (lang: { code: string; name: string; flag: string }) => (
              <SelectItem
                key={lang.code}
                value={lang.code}
                className='cursor-pointer'
              >
                <div className='flex items-center space-x-2'>
                  <span className='text-lg leading-none'>{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              </SelectItem>
            )
          )}
        </SelectContent>
      </Select>
      <p className='text-xs text-muted-foreground'>
        {t('selectPreferredLanguage', 'Select your preferred language')}
      </p>
    </div>
  );
};
