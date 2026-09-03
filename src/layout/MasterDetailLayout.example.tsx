/**
 * MasterDetailLayout Usage Examples
 *
 * This file demonstrates various ways to use the MasterDetailLayout component
 */

import { useRef, useState } from 'react';
import { MasterDetailLayout } from './MasterDetailLayout';

/**
 * Example 1: Basic Documentation Layout
 * Similar to the DocumentationPage pattern
 *
 * `detailTitle` renders the heading for the detail panel, so the content itself
 * does not need to repeat it.
 *
 * `detailMaxWidth` caps the detail panel at a comfortable reading measure: it
 * stays full width on narrower screens and centers itself in the leftover space
 * on wide ones. Omit it to inherit the 1024px default; pass 0 to let the detail
 * panel fill all the space the master panel does not use.
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
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-accent'
          }`}
        >
          {section.title}
        </button>
      ))}
    </div>
  );

  const currentSection = sections.find(s => s.id === selectedSection);

  return (
    <MasterDetailLayout
      masterTitle='Table of Contents'
      backButtonText='Documentation'
      masterContent={masterContent}
      detailContent={<div className='prose'>{currentSection?.content}</div>}
      detailTitle={currentSection?.title}
      detailMaxWidth={720}
      contentKey={selectedSection}
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
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
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-accent'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );

  return (
    <MasterDetailLayout
      masterTitle='Settings'
      masterContent={masterContent}
      detailContent={<div>{/* Settings form content */}</div>}
      detailTitle={tabs.find(t => t.id === currentTab)?.label}
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
      masterWidth={280}
    />
  );
};

/**
 * Example 3: Coordinated Transitions
 *
 * The layout owns the fade/height animation. Pass an `animationRef` and it is
 * populated with a `triggerTransition` function: call it with the state change
 * as a callback and the layout fades the old content out, applies the change at
 * the midpoint, then animates to the new height.
 */
export const AnimatedExample = () => {
  const [mobileView, setMobileView] = useState<'navigation' | 'content'>(
    'navigation'
  );
  const [selectedId, setSelectedId] = useState('overview');

  const animationRef = useRef<{
    triggerTransition: (onContentChange: () => void) => void;
  } | null>(null);

  const items = [
    { id: 'overview', label: 'Overview', body: 'Overview content...' },
    { id: 'activity', label: 'Activity', body: 'Activity content...' },
  ];

  const handleSelect = (id: string) => {
    setMobileView('content');
    // Route the state change through the layout so it can animate around it.
    if (animationRef.current) {
      animationRef.current.triggerTransition(() => setSelectedId(id));
    } else {
      setSelectedId(id);
    }
  };

  const masterContent = (
    <nav className='space-y-1'>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => handleSelect(item.id)}
          className={`block w-full text-left px-4 py-2 rounded-md ${
            selectedId === item.id
              ? 'bg-primary/10 text-primary'
              : 'hover:bg-accent'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );

  const currentItem = items.find(item => item.id === selectedId);

  return (
    <MasterDetailLayout
      masterTitle='Animated Layout'
      masterContent={masterContent}
      detailContent={<div>{currentItem?.body}</div>}
      detailTitle={currentItem?.label}
      contentKey={selectedId}
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
      masterWidth={350}
      animationRef={animationRef}
      enableAnimations={true}
      animationDuration={300}
    />
  );
};

/**
 * Example 4: Pinned Top and Bottom Content
 *
 * `topContent` and `bottomContent` are pinned outside the scrolling panels on
 * desktop. On mobile they render inline instead — `topContent` inside the
 * navigation view, `bottomContent` below the detail view.
 */
export const PinnedContentExample = () => {
  const [mobileView, setMobileView] = useState<'navigation' | 'content'>(
    'navigation'
  );

  return (
    <MasterDetailLayout
      masterTitle='Inbox'
      masterSubtitle='0x1234...abcd'
      masterContent={<div>Long navigation list...</div>}
      detailContent={<div>Page content...</div>}
      topContent={
        <div className='p-4'>
          <input
            type='search'
            placeholder='Search'
            className='w-full rounded-md border px-3 py-2'
          />
        </div>
      }
      bottomContent={
        <div className='px-4 py-2 text-xs text-muted-foreground'>
          Synced a moment ago
        </div>
      }
      mobileView={mobileView}
      onBackToNavigation={() => setMobileView('navigation')}
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
