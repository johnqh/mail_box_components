import React, { useRef, useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export interface TOCSection {
  id: string;
  title: string;
  subsections?: TOCSection[];
}

interface TableOfContentsProps {
  sections: TOCSection[];
  selectedSection: string;
  selectedSubsection?: string | null;
  expandedSections: string[];
  onSectionSelect: (sectionId: string) => void;
  onSubsectionSelect?: (subsectionId: string, parentSectionId: string) => void;
  onToggleSection: (sectionId: string) => void;
  className?: string;
}

// Collapsible subsection component with smooth animations
const CollapsibleSubsections: React.FC<{
  subsections: TOCSection[];
  isExpanded: boolean;
  selectedSubsection?: string | null;
  parentSectionId: string;
  onSubsectionSelect?: (subsectionId: string, parentSectionId: string) => void;
}> = ({ subsections, isExpanded, selectedSubsection, parentSectionId, onSubsectionSelect }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(isExpanded ? scrollHeight : 0);
    }
  }, [isExpanded, subsections]);

  return (
    <div
      className="overflow-hidden transition-all duration-300 ease-in-out"
      style={{ height: height !== undefined ? `${height}px` : 'auto' }}
    >
      <div ref={contentRef} className="ml-6 mt-2 space-y-1">
        {subsections.map((subsection) => (
          <button
            key={subsection.id}
            onClick={() => onSubsectionSelect?.(subsection.id, parentSectionId)}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 hover:scale-[1.02] ${
              selectedSubsection === subsection.id
                ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            {subsection.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  sections,
  selectedSection,
  selectedSubsection,
  expandedSections,
  onSectionSelect,
  onSubsectionSelect,
  onToggleSection,
  className = ""
}) => {
  return (
    <nav className={`space-y-2 ${className}`}>
      {sections.map((section) => (
        <div key={section.id}>
          <div className="flex items-center">
            <button
              onClick={() => onSectionSelect(section.id)}
              className={`flex-1 text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                selectedSection === section.id && !selectedSubsection
                  ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              {section.title}
            </button>
            {section.subsections && section.subsections.length > 0 && (
              <button
                onClick={() => onToggleSection(section.id)}
                className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-110 transition-all duration-200"
              >
                <ChevronRightIcon 
                  className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${
                    expandedSections.includes(section.id) ? 'rotate-90' : 'rotate-0'
                  }`} 
                />
              </button>
            )}
          </div>
          
          {section.subsections && (
            <CollapsibleSubsections
              subsections={section.subsections}
              isExpanded={expandedSections.includes(section.id)}
              selectedSubsection={selectedSubsection}
              parentSectionId={section.id}
              onSubsectionSelect={onSubsectionSelect}
            />
          )}
        </div>
      ))}
    </nav>
  );
};