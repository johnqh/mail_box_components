import React, { useEffect, useRef, useState } from 'react';

// Local DOM helpers to avoid @johnqh/lib dependency
const isDOMSupported = () => {
  return (
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function' &&
    typeof document.getElementById === 'function'
  );
};

const getDocumentElementById = (id: string): Element | null => {
  if (typeof document !== 'undefined' && document.getElementById) {
    try {
      return document.getElementById(id);
    } catch {
      // DOM access failed
    }
  }
  return null;
};

const createDocumentElement = (tagName: string): HTMLElement | null => {
  if (typeof document !== 'undefined' && document.createElement) {
    try {
      return document.createElement(tagName);
    } catch {
      // DOM access failed
    }
  }
  return null;
};

const appendToDocumentHead = (element: Node): boolean => {
  const head = typeof document !== 'undefined' ? document.head : null;
  if (head && element) {
    try {
      head.appendChild(element);
      return true;
    } catch {
      // DOM access failed
    }
  }
  return false;
};

type AnimationType =
  | 'fade-in-up'
  | 'fade-in-scale'
  | 'fade-in-left'
  | 'fade-in-right'
  | 'float'
  | 'bounce-slow'
  | 'slide-in-bottom'
  | 'zoom-in'
  | 'none';

interface AnimatedSectionProps {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean; // Only animate once when entering viewport
  children: React.ReactNode;
  className?: string;
  threshold?: number; // Intersection observer threshold
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  once = true,
  children,
  className = '',
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // IntersectionObserver is only available in web environments
    if (!isDOMSupported() || typeof IntersectionObserver === 'undefined') {
      // React Native fallback - immediately show animation
      setIsVisible(true);
      if (once) {
        setHasAnimated(true);
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasAnimated || !once)) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, once, hasAnimated]);

  const getAnimationClasses = () => {
    if (animation === 'none') return '';

    const baseTransition = `transition-all duration-${duration} ease-out`;
    const delayClass = delay > 0 ? `delay-${delay}` : '';

    const animations = {
      'fade-in-up': isVisible
        ? `opacity-100 translate-y-0 ${baseTransition} ${delayClass}`
        : `opacity-0 translate-y-8 ${baseTransition} ${delayClass}`,
      'fade-in-scale': isVisible
        ? `opacity-100 scale-100 ${baseTransition} ${delayClass}`
        : `opacity-0 scale-95 ${baseTransition} ${delayClass}`,
      'fade-in-left': isVisible
        ? `opacity-100 translate-x-0 ${baseTransition} ${delayClass}`
        : `opacity-0 -translate-x-8 ${baseTransition} ${delayClass}`,
      'fade-in-right': isVisible
        ? `opacity-100 translate-x-0 ${baseTransition} ${delayClass}`
        : `opacity-0 translate-x-8 ${baseTransition} ${delayClass}`,
      'slide-in-bottom': isVisible
        ? `translate-y-0 ${baseTransition} ${delayClass}`
        : `translate-y-full ${baseTransition} ${delayClass}`,
      'zoom-in': isVisible
        ? `opacity-100 scale-100 ${baseTransition} ${delayClass}`
        : `opacity-0 scale-50 ${baseTransition} ${delayClass}`,
      float: 'animate-float', // CSS keyframe animation
      'bounce-slow': 'animate-bounce-slow', // CSS keyframe animation
    };

    return animations[animation] || animations['fade-in-up'];
  };

  // Add CSS keyframes to document head if not already present (web only)
  useEffect(() => {
    // Only inject styles if DOM manipulation is supported (web environment)
    if (!isDOMSupported()) {
      return; // React Native doesn't need CSS injection
    }

    if (animation === 'float' || animation === 'bounce-slow') {
      const styleId = 'animated-section-keyframes';
      if (!getDocumentElementById(styleId)) {
        const style = createDocumentElement('style');
        if (style) {
          style.id = styleId;
          style.textContent = `
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            @keyframes bounce-slow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            .animate-bounce-slow {
              animation: bounce-slow 4s ease-in-out infinite;
            }
          `;
          appendToDocumentHead(style);
        }
      }
    }
  }, [animation]);

  return (
    <div ref={ref} className={`${getAnimationClasses()} ${className}`}>
      {children}
    </div>
  );
};

// Utility component for common animation patterns
export const FadeInUp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => (
  <AnimatedSection animation='fade-in-up' delay={delay} className={className}>
    {children}
  </AnimatedSection>
);

export const FadeInScale: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => (
  <AnimatedSection
    animation='fade-in-scale'
    delay={delay}
    className={className}
  >
    {children}
  </AnimatedSection>
);

export const FloatingElement: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <AnimatedSection animation='float' className={className}>
    {children}
  </AnimatedSection>
);
