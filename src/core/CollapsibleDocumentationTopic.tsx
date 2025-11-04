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
      <div ref={contentRef} className='ml-6 mt-2 space-y-1'>
        {subsections.map(subsection => (
          <div key={subsection.id} className='relative'>
            {/* Rounded selection overlay */}
            {selectedSubsection === subsection.id && (
              <div className='absolute top-0 bottom-0 left-0 right-4 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg pointer-events-none border-2 border-blue-500/30 dark:border-blue-400/30' />
            )}
            <button
              onClick={() =>
                onSubsectionSelect?.(subsection.id, parentSectionId)
              }
              className={`relative z-10 block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 hover:scale-[1.02] ${
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
const CollapsibleDocumentationTopic: React.FC<
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
      <div className='relative flex items-center'>
        {/* Rounded selection overlay */}
        {isSelected && !selectedSubsection && (
          <div className='absolute top-1 bottom-1 left-3 right-4 bg-blue-500/20 dark:bg-blue-400/20 rounded-lg pointer-events-none border-2 border-blue-500/30 dark:border-blue-400/30' />
        )}
        <button
          onClick={handleSectionClick}
          className={`relative z-10 flex-1 text-left px-3 py-4 text-base font-medium transition-all duration-200 ${
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

export default CollapsibleDocumentationTopic;
