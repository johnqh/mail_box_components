import { FC } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  onClick?: () => void;
  logoSrc?: string; // Allow customizing logo source
  logoAlt?: string; // Allow customizing alt text
  logoText: string; // Required - no default
  fontFamily?: string; // Allow customizing font family
}

export const Logo: FC<LogoProps> = ({
  size = 'md',
  className = '',
  showText = true,
  onClick,
  logoSrc = '/logo.png',
  logoAlt = 'Logo',
  logoText,
  fontFamily = 'Dancing Script, cursive',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'space-x-2',
          image: 'h-6 w-6',
          text: 'text-lg',
        };
      case 'md':
        return {
          container: 'space-x-2',
          image: 'h-8 w-8',
          text: 'text-2xl',
        };
      case 'lg':
        return {
          container: 'space-x-3',
          image: 'h-10 w-10',
          text: 'text-3xl',
        };
      case 'xl':
        return {
          container: 'space-x-4',
          image: 'h-12 w-12',
          text: 'text-4xl',
        };
      default:
        return {
          container: 'space-x-2',
          image: 'h-8 w-8',
          text: 'text-2xl',
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const logoContent = (
    <>
      <img src={logoSrc} alt={logoAlt} className={sizeClasses.image} />
      {showText && (
        <div
          className={`${sizeClasses.text} font-bold text-gray-900 dark:text-gray-100`}
          style={{ fontFamily, fontWeight: '700' }}
        >
          {logoText}
        </div>
      )}
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`flex items-center ${sizeClasses.container} ${className} hover:opacity-80 transition-opacity`}
      >
        {logoContent}
      </button>
    );
  }

  return (
    <div className={`flex items-center ${sizeClasses.container} ${className}`}>
      {logoContent}
    </div>
  );
};