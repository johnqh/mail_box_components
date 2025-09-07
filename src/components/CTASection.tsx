import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
  external?: boolean;
}

interface CTASectionProps {
  title: string;
  description: string;
  primaryButton: CTAButton;
  secondaryButton?: CTAButton;
  gradient?: {
    from: string;
    to: string;
    via?: string;
  };
  textColor?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryButton,
  secondaryButton,
  gradient = { from: 'blue-600', to: 'purple-600' },
  textColor = 'light',
  className = '',
  size = 'lg'
}) => {
  const gradientClass = gradient.via 
    ? `bg-gradient-to-r from-${gradient.from} via-${gradient.via} to-${gradient.to}`
    : `bg-gradient-to-r from-${gradient.from} to-${gradient.to}`;

  const textColorClass = textColor === 'light' 
    ? 'text-white' 
    : 'text-gray-900';

  const sizeClasses = {
    sm: 'py-12',
    md: 'py-16', 
    lg: 'py-20'
  };

  const titleSizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl'
  };

  const descriptionSizeClasses = {
    sm: 'text-base md:text-lg',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl'
  };

  const renderButton = (button: CTAButton, isPrimary: boolean = false) => {
    const getButtonVariant = () => {
      if (button.variant === 'primary' || isPrimary) return 'gradient';
      if (button.variant === 'secondary') return 'outline';
      return 'outline';
    };

    const buttonElement = (
      <Button
        variant={getButtonVariant()}
        size="lg"
        className={isPrimary ? '' : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/30'}
      >
        {button.label}
      </Button>
    );

    if (button.external) {
      return (
        <a
          href={button.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {buttonElement}
        </a>
      );
    }

    return (
      <Link to={button.href}>
        {buttonElement}
      </Link>
    );
  };

  return (
    <section className={`${gradientClass} ${sizeClasses[size]} relative overflow-hidden ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={`${titleSizeClasses[size]} font-bold ${textColorClass} mb-6`}>
          {title}
        </h2>
        
        <p className={`${descriptionSizeClasses[size]} ${textColorClass}/90 mb-8 max-w-2xl mx-auto`}>
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {renderButton(primaryButton, true)}
          {secondaryButton && renderButton(secondaryButton, false)}
        </div>
      </div>
    </section>
  );
};

export default CTASection;