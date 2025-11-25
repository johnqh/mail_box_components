import React, { useState, useRef, useLayoutEffect } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export interface Subsection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface CollapsibleDocumentationTopicProps {
  id: string;
  title: string;
  content: React.ReactNode;
  subsections?: Subsection[];
  isSelected?: boolean;
  selectedSubsection?: string | null;
  onSectionSelect?: (sectionId: string) => void;
  onSubsectionSelect?: (subsectionId: string, parentSectionId: string) => void;
  className?: string;
}

const CollapsibleSubsections: React.FC<{
  subsections: Subsection[];
  isExpanded: boolean;
  selectedSubsection?: string | null;
  parentSectionId: string;
  onSubsectionSelect?: (subsectionId: string, parentSectionId: string) => void;
}> = ({
  subsections,
  isExpanded,
  selectedSubsection,
  parentSectionId,
  onSubsectionSelect,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      // Add buffer to prevent bottom cutoff
      setHeight(isExpanded ? scrollHeight + 16 : 0);
    }
  }, [isExpanded, subsections]);

  return (
    <div
      className='overflow-hidden transition-all duration-300 ease-in-out'
      style={{ height: height !== undefined ? `${height}px` : 'auto' }}
    >
      <div ref={contentRef} className='ml-6 mt-1 mb-1 space-y-1'>
        {subsections.map(subsection => (
          <div key={subsection.id} className='relative group'>
            {/* Rounded selection overlay */}
            {selectedSubsection === subsection.id && (
              <div className='absolute top-0.5 bottom-0.5 left-1 right-12 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg pointer-events-none' />
            )}
            {/* Hover overlay */}
            {selectedSubsection !== subsection.id && (
              <div className='absolute top-0.5 bottom-0.5 left-1 right-12 bg-blue-500/0 group-hover:bg-blue-500/10 dark:group-hover:bg-blue-400/10 rounded-lg pointer-events-none transition-colors duration-200' />
            )}
            <button
              onClick={() =>
                onSubsectionSelect?.(subsection.id, parentSectionId)
              }
              className={`relative z-10 block w-full text-left pl-4 pr-3 py-2 rounded-md text-sm transition-all duration-200 ${
                selectedSubsection === subsection.id
                  ? 'text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {subsection.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * CollapsibleDocumentationTopic - A collapsible documentation section component
 *
 * Features:
 * - Smooth collapsible animations with height transitions
 * - Support for nested subsections
 * - Selection states for both sections and subsections
 * - Responsive design with hover effects
 * - Dark mode support
 *
 * @param id - Unique identifier for the section
 * @param title - Display title for the section
 * @param content - React content to display (not used in current implementation)
 * @param subsections - Optional array of subsections
 * @param isSelected - Whether this section is currently selected
 * @param selectedSubsection - Currently selected subsection ID
 * @param onSectionSelect - Callback when section is selected
 * @param onSubsectionSelect - Callback when subsection is selected
 * @param className - Additional CSS classes
 */
export const CollapsibleDocumentationTopic: React.FC<
  CollapsibleDocumentationTopicProps
> = ({
  id,
  title,
  content: _content,
  subsections,
  isSelected = false,
  selectedSubsection = null,
  onSectionSelect,
  onSubsectionSelect,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSectionClick = () => {
    onSectionSelect?.(id);
  };

  const hasSubsections = subsections && subsections.length > 0;

  return (
    <div className={className}>
      <div className='relative flex items-center group'>
        {/* Rounded selection overlay */}
        {isSelected && !selectedSubsection && (
          <div className='absolute top-2 bottom-2 left-2 right-12 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg pointer-events-none' />
        )}
        {/* Hover overlay */}
        {!(isSelected && !selectedSubsection) && (
          <div className='absolute top-2 bottom-2 left-2 right-12 bg-blue-500/0 group-hover:bg-blue-500/10 dark:group-hover:bg-blue-400/10 rounded-lg pointer-events-none transition-colors duration-200' />
        )}
        <button
          onClick={handleSectionClick}
          className={`relative z-10 flex-1 text-left pl-5 pr-3 py-4 text-base font-medium transition-all duration-200 ${
            isSelected && !selectedSubsection
              ? 'text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          {title}
        </button>
        {hasSubsections && (
          <button
            onClick={handleToggle}
            className='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110 transition-all duration-200'
            aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          >
            <ChevronRightIcon
              className={`h-5 w-5 text-gray-500 transition-transform duration-300 ease-in-out ${
                isExpanded ? 'rotate-90' : 'rotate-0'
              }`}
            />
          </button>
        )}
      </div>

      {hasSubsections && (
        <CollapsibleSubsections
          subsections={subsections}
          isExpanded={isExpanded}
          selectedSubsection={selectedSubsection}
          parentSectionId={id}
          onSubsectionSelect={onSubsectionSelect}
        />
      )}
    </div>
  );
};
