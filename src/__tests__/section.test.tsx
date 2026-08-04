import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section } from '../primitives/layout/section';
import { LayoutProvider } from '../layout/Layout/LayoutContext';

/** The inner container is the element carrying the width class. */
function container(): HTMLElement {
  return screen.getByTestId('content').parentElement as HTMLElement;
}

describe('Section width', () => {
  it('defaults to max-w-7xl outside a LayoutProvider', () => {
    // Backward compatibility: this was the hard-coded default before the
    // component read layout context at all.
    render(
      <Section>
        <div data-testid='content' />
      </Section>
    );
    expect(container()).toHaveClass('max-w-7xl');
  });

  it('follows the layout mode so it lines up with the topbar and footer', () => {
    render(
      <LayoutProvider mode='full'>
        <Section>
          <div data-testid='content' />
        </Section>
      </LayoutProvider>
    );
    expect(container()).toHaveClass('w-full');
    expect(container()).not.toHaveClass('max-w-7xl');
  });

  it('follows the wide mode too', () => {
    render(
      <LayoutProvider mode='wide'>
        <Section>
          <div data-testid='content' />
        </Section>
      </LayoutProvider>
    );
    expect(container()).toHaveClass('max-w-[1920px]');
  });

  it('an explicit maxWidth still wins over the layout mode', () => {
    // Deviating on purpose stays possible — a text-heavy section inside a
    // full-width page still wants a reading measure.
    render(
      <LayoutProvider mode='full'>
        <Section maxWidth='3xl'>
          <div data-testid='content' />
        </Section>
      </LayoutProvider>
    );
    expect(container()).toHaveClass('max-w-3xl');
    expect(container()).not.toHaveClass('w-full');
  });

  it('fullWidth drops the container entirely', () => {
    render(
      <LayoutProvider mode='standard'>
        <Section fullWidth>
          <div data-testid='content' />
        </Section>
      </LayoutProvider>
    );
    expect(container()).not.toHaveClass('max-w-7xl');
    expect(container().tagName).toBe('SECTION');
  });
});
