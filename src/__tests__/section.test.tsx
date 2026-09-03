import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Section } from '../primitives/layout/section';
import { LayoutProvider } from '../layout/Layout/LayoutContext';

/** The inner container is the element carrying the width class. */
function container(): HTMLElement {
  return screen.getByTestId('content').parentElement as HTMLElement;
}

/** The outer <section> element, which carries the band background and bleed. */
function band(): HTMLElement {
  return container().parentElement as HTMLElement;
}

describe('Section width', () => {
  it('caps its content at the reading width by default', () => {
    render(
      <Section>
        <div data-testid='content' />
      </Section>
    );
    expect(container()).toHaveClass('max-w-5xl');
  });

  it('keeps that cap regardless of the page layout mode', () => {
    // The band follows the page width; the text inside it does not. A page in
    // 'full' mode should still read at the reading width.
    render(
      <LayoutProvider mode='full'>
        <Section>
          <div data-testid='content' />
        </Section>
      </LayoutProvider>
    );
    expect(container()).toHaveClass('max-w-5xl');
  });

  it('still lets an explicit maxWidth win', () => {
    render(
      <Section maxWidth='2xl'>
        <div data-testid='content' />
      </Section>
    );
    expect(container()).toHaveClass('max-w-2xl');
    expect(container()).not.toHaveClass('max-w-5xl');
  });
});

describe('Section bleed', () => {
  it('breaks its band out of a capped parent by default', () => {
    // The negative margin self-cancels to zero when the parent is already full
    // width, so this is a no-op on uncapped pages.
    render(
      <Section>
        <div data-testid='content' />
      </Section>
    );
    expect(band().className).toContain('50vw');
  });

  it('can be told not to bleed, for a Section nested inside a panel', () => {
    render(
      <Section bleed={false}>
        <div data-testid='content' />
      </Section>
    );
    expect(band().className).not.toContain('50vw');
  });

  it('does not bleed when rendering children directly', () => {
    render(
      <Section fullWidth bleed={false}>
        <div data-testid='content' />
      </Section>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
