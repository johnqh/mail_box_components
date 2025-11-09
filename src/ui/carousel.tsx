import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface CarouselProps {
  /** Carousel items */
  children: React.ReactNode[];
  /** Auto-play interval (ms) */
  autoPlay?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show indicators */
  showIndicators?: boolean;
  /** Loop slides */
  loop?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Carousel Component
 *
 * Image/content carousel with auto-play and navigation.
 * Supports arrows, indicators, and looping.
 *
 * @example
 * ```tsx
 * <Carousel autoPlay={3000} loop>
 *   <img src="slide1.jpg" alt="Slide 1" />
 *   <img src="slide2.jpg" alt="Slide 2" />
 *   <img src="slide3.jpg" alt="Slide 3" />
 * </Carousel>
 * ```
 *
 * @example
 * ```tsx
 * <Carousel showArrows showIndicators>
 *   {slides.map(slide => (
 *     <div key={slide.id}>{slide.content}</div>
 *   ))}
 * </Carousel>
 * ```
 */
export const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay,
  showArrows = true,
  showIndicators = true,
  loop = true,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  // Auto-play
  useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlay);

    return () => clearInterval(interval);
  }, [autoPlay, currentIndex, totalSlides]);

  const goToPrevious = () => {
    if (currentIndex === 0) {
      if (loop) {
        setCurrentIndex(totalSlides - 1);
      }
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex === totalSlides - 1) {
      if (loop) {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0"
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={goToPrevious}
            disabled={!loop && currentIndex === 0}
            className={cn(
              'absolute left-4 top-1/2 -translate-y-1/2',
              'w-10 h-10 rounded-full',
              'bg-white/80 dark:bg-gray-900/80',
              'hover:bg-white dark:hover:bg-gray-900',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'flex items-center justify-center',
              'transition-all',
              'shadow-lg'
            )}
            aria-label="Previous slide"
          >
            <svg
              className="w-5 h-5 text-gray-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={!loop && currentIndex === totalSlides - 1}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2',
              'w-10 h-10 rounded-full',
              'bg-white/80 dark:bg-gray-900/80',
              'hover:bg-white dark:hover:bg-gray-900',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'flex items-center justify-center',
              'transition-all',
              'shadow-lg'
            )}
            aria-label="Next slide"
          >
            <svg
              className="w-5 h-5 text-gray-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && totalSlides > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                index === currentIndex
                  ? 'w-8 bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
