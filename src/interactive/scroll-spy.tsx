import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

export interface ScrollSpySection {
  /** Section ID */
  id: string;
  /** Section label */
  label: string;
  /** Subsections */
  subsections?: ScrollSpySection[];
}

export interface ScrollSpyProps {
  /** Sections to track */
  sections: ScrollSpySection[];
  /** Active section ID */
  activeId?: string;
  /** Active section change handler */
  onActiveChange?: (id: string) => void;
  /** Scroll offset from top */
  offset?: number;
  /** Scroll container selector */
  container?: string;
  /** Smooth scroll on click */
  smoothScroll?: boolean;
  /** Show subsections */
  showSubsections?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * ScrollSpy Component
 *
 * Navigation that highlights the active section based on scroll position.
 * Tracks sections and updates active state automatically.
 *
 * @example
 * ```tsx
 * <ScrollSpy
 *   sections={[
 *     { id: 'intro', label: 'Introduction' },
 *     { id: 'features', label: 'Features' },
 *     { id: 'pricing', label: 'Pricing' }
 *   ]}
 *   offset={100}
 *   smoothScroll
 * />
 * ```
 *
 * @example
 * ```tsx
 * <ScrollSpy
 *   sections={tocSections}
 *   activeId={currentSection}
 *   onActiveChange={setCurrentSection}
 *   showSubsections
 * />
 * ```
 */
export const ScrollSpy: React.FC<ScrollSpyProps> = ({
  sections,
  activeId: controlledActiveId,
  onActiveChange,
  offset = 80,
  container,
  smoothScroll = true,
  showSubsections = true,
  className,
}) => {
  const [internalActiveId, setInternalActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const activeId =
    controlledActiveId !== undefined ? controlledActiveId : internalActiveId;

  // Set up intersection observer
  useEffect(() => {
    const scrollContainer = container
      ? document.querySelector(container)
      : window;

    if (!scrollContainer) return;

    // Get all section IDs
    const getAllIds = (secs: ScrollSpySection[]): string[] => {
      return secs.flatMap(section => [
        section.id,
        ...(section.subsections ? getAllIds(section.subsections) : []),
      ]);
    };

    const allIds = getAllIds(sections);
    const elements = allIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const newActiveId = entry.target.id;

            if (controlledActiveId !== undefined && onActiveChange) {
              onActiveChange(newActiveId);
            } else {
              setInternalActiveId(newActiveId);
            }
          }
        });
      },
      {
        root: container ? (scrollContainer as Element) : null,
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    // Observe all elements
    elements.forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections, container, offset, controlledActiveId, onActiveChange]);

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const scrollContainer = container
      ? document.querySelector(container)
      : window;

    if (!scrollContainer) return;

    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - offset;

    if (smoothScroll) {
      if (scrollContainer === window) {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        (scrollContainer as Element).scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      if (scrollContainer === window) {
        window.scrollTo(0, offsetPosition);
      } else {
        (scrollContainer as Element).scrollTop = offsetPosition;
      }
    }
  };

  // Render section
  const renderSection = (section: ScrollSpySection, level: number = 0) => {
    const isActive = activeId === section.id;
    const hasActiveChild =
      section.subsections?.some(sub => activeId === sub.id) || false;

    return (
      <div key={section.id}>
        <button
          onClick={() => scrollToSection(section.id)}
          className={cn(
            'w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors',
            level === 0 ? 'font-medium' : 'pl-6 text-sm',
            isActive
              ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30'
              : hasActiveChild
                ? 'text-gray-700 dark:text-gray-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
          style={{ paddingLeft: `${level * 0.75 + 0.75}rem` }}
        >
          {section.label}
        </button>

        {/* Subsections */}
        {showSubsections &&
          section.subsections &&
          section.subsections.length > 0 && (
            <div className='ml-2 border-l-2 border-gray-200 dark:border-gray-700'>
              {section.subsections.map(subsection =>
                renderSection(subsection, level + 1)
              )}
            </div>
          )}
      </div>
    );
  };

  return (
    <nav className={cn('space-y-1', className)}>
      {sections.map(section => renderSection(section, 0))}
    </nav>
  );
};

export default ScrollSpy;
