/**
 * MasterDetailLayout Usage Examples
 *
 * This file demonstrates various ways to use the MasterDetailLayout component
 */

import React, { useState } from 'react';
import MasterDetailLayout from './MasterDetailLayout';

/**
 * Example 1: Basic Documentation Layout
 * Similar to the DocumentationPage pattern
 */
export const DocumentationExample = () => {
  const [mobileView, setMobileView] = useState<'navigation' | 'content'>(
    'navigation'
  );
  const [selectedSection, setSelectedSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: 'Introduction...',
    },
    { id: 'api', title: 'API Reference', content: 'API documentation...' },
    { id: 'guides', title: 'Guides', content: 'Step-by-step guides...' },
  ];

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
    setMobileView('content');
  };

  const masterContent = (
    <div className='space-y-0'>
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => handleSectionSelect(section.id)}
          className={`block w-full text-left px-3 py-4 ${
            selectedSection === section.id
              ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-700'
              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
          }`}
        >
          {section.title}
        </button>
      ))}
    </div>
  );

  const currentSection = sections.find(s => s.id === selectedSection);
  const detailContent = (
    <div>
      <h1 className='text-4xl font-bold mb-6'>{currentSection?.title}</h1>
      <div className='prose'>{currentSection?.content}</div>
    </div>
  );

  return (
    <MasterDetailLayout
      masterTitle='Table of Contents'
      masterContent={masterContent}
      detailContent={detailContent}
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
      backButtonAriaLabel='Back to navigation'
    />
  );
};

/**
 * Example 2: Settings Page Layout
 * Simpler layout without subsections
 */
export const SettingsExample = () => {
  const [mobileView, setMobileView] = useState<'navigation' | 'content'>(
    'navigation'
  );
  const [currentTab, setCurrentTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', label: 'Appearance' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
  ];

  const handleTabSelect = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileView('content');
  };

  const masterContent = (
    <nav className='space-y-1'>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => handleTabSelect(tab.id)}
          className={`block w-full text-left px-4 py-2 rounded-md ${
            currentTab === tab.id
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-gray-100'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );

  const detailContent = (
    <div>
      <h2 className='text-2xl font-bold mb-4'>
        {tabs.find(t => t.id === currentTab)?.label}
      </h2>
      <div>{/* Settings form content */}</div>
    </div>
  );

  return (
    <MasterDetailLayout
      masterTitle='Settings'
      masterContent={masterContent}
      detailContent={detailContent}
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
      masterWidth={280}
    />
  );
};

/**
 * Example 3: Custom Styling and Animations
 * Shows advanced usage with custom transitions
 */
export const AnimatedExample = () => {
  const [mobileView, setMobileView] = useState<'navigation' | 'content'>(
    'navigation'
  );
  const [contentHeight, setContentHeight] = useState<number | 'auto'>('auto');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const detailRef = React.useRef<HTMLDivElement>(null);

  const masterContent = <div>Navigation items...</div>;

  const detailStyle = {
    height: contentHeight === 'auto' ? 'auto' : `${contentHeight}px`,
    transition: 'height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: isTransitioning ? 'height' : 'auto',
  };

  const detailContent = (
    <div
      className={`${
        isTransitioning
          ? 'opacity-0 transform translate-y-2'
          : 'opacity-100 transform translate-y-0'
      }`}
      style={{
        transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
      }}
    >
      Content with smooth transitions
    </div>
  );

  return (
    <MasterDetailLayout
      masterTitle='Animated Layout'
      masterContent={masterContent}
      detailContent={detailContent}
      detailRef={detailRef}
      detailStyle={detailStyle}
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
      masterWidth={350}
      stickyTopOffset={120}
      desktopGap={40}
    />
  );
};

/**
 * Example 4: Non-sticky Master Panel
 * For pages where the master panel should scroll with content
 */
export const NonStickyExample = () => {
  const [mobileView, setMobileView] = useState<'navigation' | 'content'>(
    'navigation'
  );

  return (
    <MasterDetailLayout
      masterTitle='Scrollable Navigation'
      masterContent={<div>Long navigation list...</div>}
      detailContent={<div>Page content...</div>}
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
      stickyMaster={false}
    />
  );
};

/**
 * Example 5: Without Master Background on Mobile
 * Cleaner mobile appearance
 */
export const CleanMobileExample = () => {
  const [mobileView, setMobileView] = useState<'navigation' | 'content'>(
    'navigation'
  );

  return (
    <MasterDetailLayout
      masterContent={<div>Clean navigation...</div>}
      detailContent={<div>Content...</div>}
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
      showMasterBackground={false}
    />
  );
};
