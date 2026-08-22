import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../layout/Footer/Footer';
import {
  FooterCompact,
  FooterCompactLeft,
  FooterCompactRight,
  FooterCopyright,
  FooterVersion,
} from '../layout/Footer/FooterSlots';

const renderCompactFooter = () =>
  render(
    <Footer variant='compact' sticky>
      <FooterCompact>
        <FooterCompactLeft>
          <FooterVersion version='1.0.0' />
          <FooterCopyright
            year='2026'
            companyName='Sudobility'
            rightsText='All rights reserved'
          />
        </FooterCompactLeft>
        <FooterCompactRight>
          <a href='/privacy'>Privacy</a>
        </FooterCompactRight>
      </FooterCompact>
    </Footer>
  );

describe('Footer', () => {
  it('renders compact footer content', () => {
    renderCompactFooter();

    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
  });

  describe('compact variant mobile sizing', () => {
    it('uses tighter vertical padding below the sm breakpoint', () => {
      const { container } = renderCompactFooter();
      const footer = container.querySelector('footer');

      expect(footer).toHaveClass('py-2');
      expect(footer).toHaveClass('sm:py-4');
    });

    it('keeps the full footer padding for the full variant', () => {
      const { container } = render(<Footer variant='full'>content</Footer>);

      expect(container.querySelector('footer')).toHaveClass('py-12');
    });

    it('lays the compact row out left-aligned on mobile and split from sm up', () => {
      const { container } = renderCompactFooter();
      const row = container.querySelector('footer > div > div');

      // One line on every width - no stacking on mobile.
      expect(row).toHaveClass('flex-row');
      expect(row).not.toHaveClass('flex-col');
      expect(row).toHaveClass('justify-start');
      expect(row).toHaveClass('sm:justify-between');
    });

    it('scales the compact type down on mobile', () => {
      const { container } = renderCompactFooter();

      expect(container.querySelector('footer > div > div > div')).toHaveClass(
        'text-[11px]',
        'sm:text-sm'
      );
      expect(screen.getByText(/All rights reserved/)).toHaveClass(
        'text-[11px]',
        'sm:text-xs'
      );
    });
  });
});
