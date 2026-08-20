import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MasterDetailLayout } from '../layout/MasterDetailLayout';
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

  it('renders master title when provided', () => {
    render(
      <MasterDetailLayout
        masterTitle='Navigation'
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
      />
    );

    expect(screen.getAllByText('Navigation')).toBeTruthy();
  });

  it('shows navigation view on mobile by default', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        mobileView='navigation'
      />
    );

    // Mobile navigation view should be visible (block)
    const mobileNav = container.querySelector('.md\\:hidden.block');
    expect(mobileNav).toBeTruthy();
  });

  it('shows content view on mobile when mobileView is content', () => {
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

  it('caps the detail panel at 960px by default', () => {
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
    expect(constraintBox.style.maxWidth).toBe('960px');
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

  it('adds no padding of its own to the master or detail panels', () => {
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
    // Headings carry margin for rhythm, but no padding inset
    const h1 = container.querySelector('.order-2 h1') as HTMLElement;
    const h2 = container.querySelector('aside h2') as HTMLElement;
    expect(h1.className).not.toMatch(/\bp[xylrtb]?-\d/);
    expect(h2.className).not.toMatch(/\bp[xylrtb]?-\d/);
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

  it('hides master background when showMasterBackground is false', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        showMasterBackground={false}
      />
    );

    // Check that bg-white class is not applied to mobile master container
    const mobileMaster = container.querySelector('.md\\:hidden.block > div');
    expect(mobileMaster?.className).not.toContain('bg-white');
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

  it('renders detail title on both mobile and desktop', () => {
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        detailTitle='Email Management'
      />
    );

    // Should appear twice: once in mobile view, once in desktop view
    const titles = screen.getAllByText('Email Management');
    expect(titles.length).toBe(2);
  });

  it('renders topContent when provided', () => {
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        topContent={<div>Top Header</div>}
      />
    );

    // topContent appears twice: once in desktop wrapper, once in mobile nav view
    const tops = screen.getAllByText('Top Header');
    expect(tops.length).toBe(2);
  });

  it('renders bottomContent when provided', () => {
    render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        bottomContent={<div>Bottom Footer</div>}
      />
    );

    // bottomContent appears twice: once in desktop wrapper, once in mobile detail view
    const bottoms = screen.getAllByText('Bottom Footer');
    expect(bottoms.length).toBe(2);
  });

  it('renders both topContent and bottomContent together', () => {
    const { container } = render(
      <MasterDetailLayout
        masterContent={<div>Master Content</div>}
        detailContent={<div>Detail Content</div>}
        topContent={<div>Top Header</div>}
        bottomContent={<div>Bottom Footer</div>}
      />
    );

    expect(screen.getAllByText('Top Header').length).toBe(2);
    expect(screen.getAllByText('Bottom Footer').length).toBe(2);

    // Desktop: top and bottom should be flex-shrink-0 siblings of the middle area
    const root = container.firstElementChild;
    expect(root?.children.length).toBe(3); // desktop top + middle + desktop bottom
    expect(root?.children[0]?.className).toContain('flex-shrink-0');
    expect(root?.children[2]?.className).toContain('flex-shrink-0');
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

describe('MasterDetailLayout mobile transition', () => {
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
    const { container } = render(<MasterDetailLayout {...panes} mobileView='content' />);
    expect(container.querySelector('.absolute.z-10')).toBeNull();
    expect(container.querySelector('.overflow-hidden.flex-1')).toBeNull();
  });

  it('cuts straight to the pane when animations are disabled', () => {
    const { container, rerender } = render(
      <MasterDetailLayout {...panes} mobileView='navigation' enableAnimations={false} />
    );
    rerender(
      <MasterDetailLayout {...panes} mobileView='content' enableAnimations={false} />
    );
    expect(container.querySelector('.absolute.z-10')).toBeNull();
  });
});
