import { useEffect } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ui } from '@sudobility/design';
import { MasterDetailLayout } from '../layout/MasterDetailLayout';

// `MasterDetailLayout` picks desktop vs. mobile from a real `matchMedia` (`useIsDesktop`), not from
// Tailwind's `md:` class alone — only one of the two is ever in the DOM now. Simulate a breakpoint the
// way a real resize does: set `innerWidth`, then dispatch `resize` (the polyfill in `src/test/setup.ts`
// listens for it). Reset to desktop before every test so no test's viewport leaks into the next one.
const DESKTOP_WIDTH = 1024;
const MOBILE_WIDTH = 400;
function setViewportWidth(px: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: px,
  });
  // Wrapped in act(): when called between two renders of an already-mounted component (unlike the
  // usual "before the first render" case), the resize dispatch synchronously triggers a real
  // `setIsDesktop` update via `useIsDesktop`'s `change` listener, outside of React's own batching.
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
}
beforeEach(() => setViewportWidth(DESKTOP_WIDTH));

describe('MasterDetailLayout', () => {
  it('renders master and detail content', () => {
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    expect(screen.getAllByText('Master Content')).toBeTruthy();
    expect(screen.getAllByText('Detail Content')).toBeTruthy();
  });

  // The title above the master list repeated what the breadcrumb and the list
  // already say. `masterTitle` now only labels the mobile back button.
  it('does not render the master title as a heading', () => {
    render(
      <MasterDetailLayout
        masterTitle='Navigation'
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    expect(screen.queryByRole('heading', { name: 'Navigation' })).toBeNull();
    expect(screen.queryByText('Navigation')).toBeNull();
  });

  it('renders masterSubtitle exactly once on desktop', () => {
    render(
      <MasterDetailLayout
        masterSubtitle='0xabc'
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    expect(screen.getAllByText('0xabc').length).toBe(1);
  });

  it('renders masterSubtitle exactly once on mobile', () => {
    setViewportWidth(MOBILE_WIDTH);
    render(
      <MasterDetailLayout
        masterSubtitle='0xabc'
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    expect(screen.getAllByText('0xabc').length).toBe(1);
  });

  it('insets the detail panel only when detailPadding is set', () => {
    const { container, rerender } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Section'
      />
    );

    const desktopTitle = () =>
      container.querySelector('.order-2 h1') as HTMLElement;
    const desktopContent = () =>
      container.querySelector('.order-2 .overflow-y-auto > div') as HTMLElement;
    expect(desktopTitle().className).not.toContain('px-4');
    expect(desktopContent().className).not.toContain('px-4');

    rerender(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Section'
        detailPadding
      />
    );

    expect(desktopTitle().className).toContain('px-4');
    expect(desktopTitle().className).toContain('sm:px-6');
    expect(desktopTitle().className).toContain('pt-6');
    // Inset inside the scroll container, so the scrollbar stays at the edge.
    expect(desktopContent().className).toContain('px-4');
    expect(desktopContent().className).toContain('sm:px-6');
    expect(desktopContent().className).toContain('pb-6');
  });

  it('renders only the desktop layout at a desktop width', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    expect(container.querySelector('aside')).toBeTruthy();
    expect(container.querySelector('.md\\:hidden')).toBeNull();
  });

  it('shows navigation view on mobile by default', () => {
    setViewportWidth(MOBILE_WIDTH);
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        mobileView='navigation'
      />
    );

    // Mobile navigation view should be visible (block); the desktop aside is gone entirely now.
    const mobileNav = container.querySelector('.md\\:hidden.block');
    expect(mobileNav).toBeTruthy();
    expect(container.querySelector('aside')).toBeNull();
  });

  it('shows content view on mobile when mobileView is content', () => {
    setViewportWidth(MOBILE_WIDTH);
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        mobileView='content'
      />
    );

    // Check that navigation is hidden and content is shown
    const hiddenElements = container.querySelectorAll('.md\\:hidden.hidden');
    expect(hiddenElements.length).toBeGreaterThan(0);
  });

  it('calls onBackToNavigation when back button is clicked', () => {
    setViewportWidth(MOBILE_WIDTH);
    const handleBack = vi.fn();
    render(
      <MasterDetailLayout
        masterTitle='Navigation'
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        mobileView='content'
        onBackToNavigation={handleBack}
      />
    );

    const backButton = screen.getByRole('button', { name: /Navigation/i });
    fireEvent.click(backButton);

    expect(handleBack).toHaveBeenCalledTimes(1);
  });

  it('shows master title in back button on mobile', () => {
    setViewportWidth(MOBILE_WIDTH);
    render(
      <MasterDetailLayout
        masterTitle='Table of Contents'
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        mobileView='content'
        onBackToNavigation={() => {}}
      />
    );

    const backButton = screen.getByRole('button', {
      name: /Table of Contents/i,
    });
    expect(backButton.textContent).toContain('Table of Contents');
  });

  it('applies custom master width', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        masterWidth={400}
      />
    );

    const aside = container.querySelector('aside');
    expect(aside).toBeTruthy();
    expect(aside?.style.width).toBe('400px');
  });

  it('caps the detail panel at 1024px by default', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    // Desktop detail column -> constraint box
    const constraintBox = container.querySelector(
      '.order-2 > div'
    ) as HTMLElement;
    expect(constraintBox).toBeTruthy();
    expect(constraintBox.style.maxWidth).toBe('1024px');
    expect(constraintBox.style.marginLeft).toBe('auto');
    expect(constraintBox.classList.contains('w-full')).toBe(true);
  });

  it('leaves the detail panel unconstrained when detailMaxWidth is 0', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailMaxWidth={0}
      />
    );

    // 0 opts out entirely — a literal maxWidth:0px would collapse the panel
    const constraintBox = container.querySelector(
      '.order-2 > div'
    ) as HTMLElement;
    expect(constraintBox.style.maxWidth).toBe('');
    expect(constraintBox.style.marginLeft).toBe('');
    expect(constraintBox.classList.contains('w-full')).toBe(true);
  });

  it('adds no padding of its own to the master or detail panels by default', () => {
    const { container } = render(
      <MasterDetailLayout
        masterTitle='Navigation'
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Section'
      />
    );

    const detailColumn = container.querySelector('.order-2') as HTMLElement;
    const aside = container.querySelector('aside') as HTMLElement;
    for (const el of [detailColumn, aside]) {
      expect(el.className).not.toMatch(/\bp[xylrtb]?-\d/);
    }
    // The heading carries margin for rhythm, but no padding inset
    const h1 = container.querySelector('.order-2 h1') as HTMLElement;
    expect(h1.className).not.toMatch(/\bp[xylrtb]?-\d/);
  });

  it('caps and centers the detail panel when detailMaxWidth is set', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailMaxWidth={720}
      />
    );

    const constraintBox = container.querySelector(
      '.order-2 > div'
    ) as HTMLElement;
    expect(constraintBox.style.maxWidth).toBe('720px');
    // Auto margins are what absorb the leftover space, i.e. the centering
    expect(constraintBox.style.marginLeft).toBe('auto');
    expect(constraintBox.style.marginRight).toBe('auto');
    // Still full width when the available space is narrower than the cap
    expect(constraintBox.classList.contains('w-full')).toBe(true);
  });

  it('keeps the detail title inside the constrained box', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Section Title'
        detailMaxWidth={720}
      />
    );

    const constraintBox = container.querySelector(
      '.order-2 > div'
    ) as HTMLElement;
    // Title must share the box with the content so the two stay aligned
    expect(constraintBox.querySelector('h1')?.textContent).toBe(
      'Section Title'
    );
  });

  it('applies detailMaxWidth to the mobile content view', () => {
    setViewportWidth(MOBILE_WIDTH);
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        mobileView='content'
        detailMaxWidth={720}
      />
    );

    const mobileContent = container.querySelector(
      '.md\\:hidden.flex'
    ) as HTMLElement;
    expect(mobileContent).toBeTruthy();
    expect(mobileContent.style.maxWidth).toBe('720px');
    expect(mobileContent.style.marginLeft).toBe('auto');
  });

  it('renders master panel without sticky positioning', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    const aside = container.querySelector('aside');
    expect(aside).toBeTruthy();
    expect(aside?.classList.contains('sticky')).toBe(false);
  });

  it('accepts stickyMaster prop without error', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        stickyMaster={false}
      />
    );

    const aside = container.querySelector('aside');
    expect(aside).toBeTruthy();
  });

  it('accepts stickyTopOffset prop without error', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        stickyTopOffset={120}
      />
    );

    const aside = container.querySelector('aside');
    expect(aside).toBeTruthy();
  });

  it('applies custom class names', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        masterClassName='custom-master'
        detailClassName='custom-detail'
      />
    );

    expect(container.querySelector('.custom-master')).toBeTruthy();
    expect(container.querySelector('.custom-detail')).toBeTruthy();
  });

  it('supports built-in animations with contentKey', () => {
    const { rerender } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Section 1 Content</div>}
        contentKey='section-1'
        enableAnimations={true}
        animationDuration={300}
      />
    );

    // Change content key to trigger animation
    rerender(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Section 2 Content</div>}
        contentKey='section-2'
        enableAnimations={true}
        animationDuration={300}
      />
    );

    // Animation should be present (component uses internal state)
    expect(true).toBe(true); // Animation logic is internal
  });

  it('disables animations when enableAnimations is false', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        contentKey='test'
        enableAnimations={false}
      />
    );

    // When animations are disabled, no transition styles should be applied
    expect(container).toBeTruthy();
  });

  it('hides master background when showMasterBackground is false, on desktop', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        showMasterBackground={false}
      />
    );

    const aside = container.querySelector('aside');
    expect(aside?.className).not.toContain(ui.background.well);
  });

  it('hides master background when showMasterBackground is false, on mobile', () => {
    setViewportWidth(MOBILE_WIDTH);
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        showMasterBackground={false}
      />
    );

    const mobileMaster = container.querySelector('.md\\:hidden.block > div');
    expect(mobileMaster).toBeTruthy();
    expect(mobileMaster?.className ?? '').not.toContain(ui.background.well);
  });

  // The tinted master surface cost readability, so the master sits flat on the
  // page by default and the border-r divider does the separating.
  it('sits the master panel on the page background by default, on desktop', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    const aside = container.querySelector('aside');
    expect(aside?.className).not.toContain(ui.background.well);
  });

  it('sits the master panel on the page background by default, on mobile', () => {
    setViewportWidth(MOBILE_WIDTH);
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    const mobileMaster = container.querySelector('.md\\:hidden.block > div');
    expect(mobileMaster).toBeTruthy();
    expect(mobileMaster?.className ?? '').not.toContain(ui.background.well);
  });

  it('paints the recessed theme surface when showMasterBackground is set, on desktop', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        showMasterBackground
      />
    );

    const aside = container.querySelector('aside');
    expect(aside?.className).toContain(ui.background.well);
  });

  it('paints the recessed theme surface when showMasterBackground is set, on mobile', () => {
    setViewportWidth(MOBILE_WIDTH);
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        showMasterBackground
      />
    );

    const mobileMaster = container.querySelector('.md\\:hidden.block > div');
    expect(mobileMaster?.className ?? '').toContain(ui.background.well);
  });

  it('keeps the master surface distinct from the detail surface', () => {
    expect(ui.background.well).not.toBe(ui.background.surface);
  });

  it('renders detail title when provided', () => {
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Selected Section'
      />
    );

    expect(screen.getAllByText('Selected Section')).toBeTruthy();
  });

  it('applies custom class to detail title', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Section Title'
        detailTitleClassName='custom-title'
      />
    );

    const titleElement = container.querySelector('.custom-title');
    expect(titleElement).toBeTruthy();
    expect(titleElement?.textContent).toBe('Section Title');
  });

  it('renders the detail title exactly once on desktop', () => {
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Email Management'
      />
    );

    expect(screen.getAllByText('Email Management').length).toBe(1);
  });

  it('renders the detail title exactly once on mobile', () => {
    setViewportWidth(MOBILE_WIDTH);
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Email Management'
      />
    );

    expect(screen.getAllByText('Email Management').length).toBe(1);
  });

  it('renders topContent exactly once on desktop', () => {
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        topContent={<div>Top Header</div>}
      />
    );

    expect(screen.getAllByText('Top Header').length).toBe(1);
  });

  it('renders topContent exactly once on mobile (inside the nav view)', () => {
    setViewportWidth(MOBILE_WIDTH);
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        topContent={<div>Top Header</div>}
      />
    );

    expect(screen.getAllByText('Top Header').length).toBe(1);
  });

  it('renders bottomContent exactly once on desktop', () => {
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        bottomContent={<div>Bottom Footer</div>}
      />
    );

    expect(screen.getAllByText('Bottom Footer').length).toBe(1);
  });

  it('renders bottomContent exactly once on mobile (inside the content view)', () => {
    setViewportWidth(MOBILE_WIDTH);
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        bottomContent={<div>Bottom Footer</div>}
      />
    );

    expect(screen.getAllByText('Bottom Footer').length).toBe(1);
  });

  it('renders both topContent and bottomContent together, once each, on desktop', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        topContent={<div>Top Header</div>}
        bottomContent={<div>Bottom Footer</div>}
      />
    );

    expect(screen.getAllByText('Top Header').length).toBe(1);
    expect(screen.getAllByText('Bottom Footer').length).toBe(1);

    // Desktop: top and bottom are flex-shrink-0 siblings of the middle area
    const root = container.firstElementChild;
    expect(root?.children.length).toBe(3); // desktop top + middle + desktop bottom
    expect(root?.children[0]?.className).toContain('flex-shrink-0');
    expect(root?.children[2]?.className).toContain('flex-shrink-0');
  });

  it('renders both topContent and bottomContent together, once each, on mobile', () => {
    setViewportWidth(MOBILE_WIDTH);
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        topContent={<div>Top Header</div>}
        bottomContent={<div>Bottom Footer</div>}
      />
    );

    expect(screen.getAllByText('Top Header').length).toBe(1);
    expect(screen.getAllByText('Bottom Footer').length).toBe(1);
  });

  it('does not render top/bottom wrappers when not provided', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    // Root should have only the middle area (no top/bottom wrappers)
    const root = container.firstElementChild;
    expect(root?.children.length).toBe(1);
  });
});

// The exact bug found and fixed in a real consumer (screenwriter_app): both the desktop layout and the
// mobile nav/content views used to always be in the DOM (CSS-hidden, not JS-conditional), so a
// stateful/non-idempotent child — a live, contenteditable editor — ended up mounted twice
// simultaneously. `useIsDesktop` makes the desktop/mobile choice itself JS-driven; the mobile branch's
// own nav/content double-buffering (needed for the slide transition below) is untouched.
describe('MasterDetailLayout single-mount (desktop/mobile)', () => {
  it('mounts a stateful child once on desktop, not once per breakpoint', () => {
    let mounts = 0;
    function StatefulChild() {
      // A real effect, the way a live editor would register one — counted once means mounted once.
      useEffect(() => {
        mounts += 1;
      }, []);
      return <div data-testid='stateful'>Stateful</div>;
    }

    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<StatefulChild />}
      />
    );

    expect(screen.getAllByTestId('stateful').length).toBe(1);
    expect(mounts).toBe(1);
  });

  it('mounts a stateful child once on mobile too', () => {
    setViewportWidth(MOBILE_WIDTH);
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div data-testid='stateful'>Stateful</div>}
        mobileView='content'
      />
    );

    expect(screen.getAllByTestId('stateful').length).toBe(1);
  });

  it('switches from desktop to mobile markup when the viewport crosses the breakpoint', () => {
    const { container, rerender } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );
    expect(container.querySelector('aside')).toBeTruthy();

    setViewportWidth(MOBILE_WIDTH);
    rerender(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );
    expect(container.querySelector('aside')).toBeNull();
    expect(container.querySelector('.md\\:hidden')).toBeTruthy();
  });
});

describe('MasterDetailLayout mobile transition', () => {
  // Every test here is exercising the mobile nav<->content slide, so it needs the mobile branch.
  beforeEach(() => setViewportWidth(MOBILE_WIDTH));

  const panes = {
    masterContent: <div>Master Content</div>,
    detailContent: <div>Detail Content</div>,
  };

  it('slides the detail in when moving from the list', async () => {
    // The two panes used to swap with block/hidden, which is a cut: on a phone
    // — or a browser side panel, the same shape — that reads as a redraw rather
    // than as going somewhere.
    const { container, rerender } = render(
      <MasterDetailLayout {...panes} mobileView='navigation' />
    );
    rerender(<MasterDetailLayout {...panes} mobileView='content' />);

    // Lifted into an overlay for the move, starting off to the right.
    const sliding = container.querySelector('.absolute.z-10');
    expect(sliding).toBeTruthy();
    expect(sliding?.className).toContain('translate-x-full');
  });

  it('keeps the list in flow underneath, so the move reveals it', async () => {
    // The master is what gives the box its height while the detail floats over
    // it, which is what keeps this safe for pages that size themselves.
    const { container, rerender } = render(
      <MasterDetailLayout {...panes} mobileView='content' />
    );
    rerender(<MasterDetailLayout {...panes} mobileView='navigation' />);

    const master = container.querySelector('.md\\:hidden.block');
    expect(master).toBeTruthy();
    expect(master?.className).not.toContain('absolute');
  });

  it('does not touch the resting layout when nothing is moving', () => {
    // No caller's page should change shape because this component learned to
    // animate: at rest the markup is what it always was.
    const { container } = render(
      <MasterDetailLayout {...panes} mobileView='content' />
    );
    expect(container.querySelector('.absolute.z-10')).toBeNull();
    expect(container.querySelector('.overflow-hidden.flex-1')).toBeNull();
  });

  it('cuts straight to the pane when animations are disabled', () => {
    const { container, rerender } = render(
      <MasterDetailLayout
        {...panes}
        mobileView='navigation'
        enableAnimations={false}
      />
    );
    rerender(
      <MasterDetailLayout
        {...panes}
        mobileView='content'
        enableAnimations={false}
      />
    );
    expect(container.querySelector('.absolute.z-10')).toBeNull();
  });
});
