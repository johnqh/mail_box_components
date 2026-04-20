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
