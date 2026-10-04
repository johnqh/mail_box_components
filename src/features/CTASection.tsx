import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { ui } from '@sudobility/design';
import { useLayout } from '../layout/Layout/LayoutContext';

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
  /**
   * Which of the theme's colours the band is drawn in. The palette names are
   * kept for compatibility and name a theme colour, not a hue:
   * `blue-600 → purple-600` (the default) and `purple-600 → pink-600` are the
   * theme's primary, `green-600 → blue-600` its success, `orange-900 →
   * red-900` its warning. Any other pair falls back to the primary.
   */
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
  size = 'lg',
}) => {
  const { paddingClass } = useLayout();
  /*
    Each band is one theme colour fading into a lighter step of itself, with
    the ink that reads on it. A gradient into `accent` used to fade into a
    near-white grey in some themes (Swiss), under white text. Every class is
    a whole literal so a consuming app's Tailwind scan finds it.
  */
  const tones = {
    primary: {
      band: 'bg-gradient-to-r from-primary to-primary/80',
      ink: 'text-primary-foreground',
      softInk: 'text-primary-foreground/90',
      glow: 'bg-primary-foreground/10',
      solidButton:
        'bg-primary-foreground text-primary hover:bg-primary-foreground/90 border-transparent',
      ghostButton:
        'bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 backdrop-blur-sm',
    },
    success: {
      band: 'bg-gradient-to-r from-success to-success/80',
      ink: 'text-success-foreground',
      softInk: 'text-success-foreground/90',
      glow: 'bg-success-foreground/10',
      solidButton:
        'bg-success-foreground text-success hover:bg-success-foreground/90 border-transparent',
      ghostButton:
        'bg-success-foreground/10 hover:bg-success-foreground/20 text-success-foreground border-success-foreground/30 backdrop-blur-sm',
    },
    warning: {
      band: 'bg-gradient-to-r from-warning to-warning/80',
      ink: 'text-warning-foreground',
      softInk: 'text-warning-foreground/90',
      glow: 'bg-warning-foreground/10',
      solidButton:
        'bg-warning-foreground text-warning hover:bg-warning-foreground/90 border-transparent',
      ghostButton:
        'bg-warning-foreground/10 hover:bg-warning-foreground/20 text-warning-foreground border-warning-foreground/30 backdrop-blur-sm',
    },
  };
  const gradientKey = gradient.via
    ? `${gradient.from}-${gradient.via}-${gradient.to}`
    : `${gradient.from}-${gradient.to}`;
  const toneByGradient: Record<string, keyof typeof tones> = {
    'blue-600-purple-600': 'primary',
    'purple-600-pink-600': 'primary',
    'green-600-blue-600': 'success',
    'orange-900-red-900': 'warning',
  };
  const tone = tones[toneByGradient[gradientKey] ?? 'primary'];

  const gradientClass = tone.band;
  const textColorClass = textColor === 'light' ? tone.ink : ui.text.emphasis;
  const descriptionColorClass =
    textColor === 'light' ? tone.softInk : ui.text.emphasis;

  const sizeClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
  };

  const titleSizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
  };

  const descriptionSizeClasses = {
    sm: 'text-base md:text-lg',
    md: 'text-lg md:text-xl',
    lg: 'text-xl md:text-2xl',
  };

  const renderButton = (button: CTAButton, isPrimary: boolean = false) => {
    const getButtonVariant = () => {
      if (button.variant === 'primary' || isPrimary) return 'primary';
      if (button.variant === 'secondary') return 'outline';
      return 'outline';
    };

    const buttonElement = (
      <Button
        variant={getButtonVariant()}
        size='lg'
        className={isPrimary ? tone.solidButton : tone.ghostButton}
      >
        {button.label}
      </Button>
    );

    if (button.external) {
      return (
        <a href={button.href} target='_blank' rel='noopener noreferrer'>
          {buttonElement}
        </a>
      );
    }

    return <Link to={button.href}>{buttonElement}</Link>;
  };

  return (
    <section
      className={`${gradientClass} ${sizeClasses[size]} relative overflow-hidden ${className}`}
    >
      {/* Background decoration, in the band's own ink */}
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full'>
        <div
          className={`absolute top-10 left-10 w-72 h-72 ${tone.glow} rounded-full blur-3xl`}
        />
        <div
          className={`absolute bottom-10 right-10 w-72 h-72 ${tone.glow} rounded-full blur-3xl`}
        />
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto ${paddingClass} text-center`}
      >
        <h2
          className={`${titleSizeClasses[size]} font-bold ${textColorClass} mb-6`}
        >
          {title}
        </h2>

        <p
          className={`${descriptionSizeClasses[size]} ${descriptionColorClass} mb-8 max-w-2xl mx-auto`}
        >
          {description}
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          {renderButton(primaryButton, true)}
          {secondaryButton && renderButton(secondaryButton, false)}
        </div>
      </div>
    </section>
  );
};
