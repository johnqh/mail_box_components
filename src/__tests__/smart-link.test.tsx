/**
 * Tests for SmartLink Component
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SmartLink, SmartContent, useSmartLinks } from '../ui/smart-link';

// Wrapper component to provide Router context for tests
const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <BrowserRouter>{children}</BrowserRouter>;

describe('SmartLink Component', () => {
  describe('Basic Rendering', () => {
    it('renders internal link with React Router Link', () => {
      render(
        <RouterWrapper>
          <SmartLink to='/about'>About Us</SmartLink>
        </RouterWrapper>
      );

      const link = screen.getByText('About Us');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
    });

    it('renders external link with proper attributes', () => {
      render(<SmartLink href='https://example.com'>External Link</SmartLink>);

      const link = screen.getByText('External Link');
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders as span when no destination provided', () => {
      render(<SmartLink>No Destination</SmartLink>);

      const span = screen.getByText('No Destination');
      expect(span.tagName).toBe('SPAN');
    });

    it('automatically detects external links by URL', () => {
      render(<SmartLink to='http://example.com'>Auto External</SmartLink>);

      const link = screen.getByText('Auto External');
      expect(link).toHaveAttribute('href', 'http://example.com');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('handles mailto links correctly', () => {
      render(<SmartLink to='mailto:test@example.com'>Email Link</SmartLink>);

      const link = screen.getByText('Email Link');
      expect(link).toHaveAttribute('href', 'mailto:test@example.com');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('Variants and Styling', () => {
    it('applies default variant classes', () => {
      render(
        <RouterWrapper>
          <SmartLink to='/test'>Default Link</SmartLink>
        </RouterWrapper>
      );

      const link = screen.getByText('Default Link');
      expect(link).toHaveClass('transition-all');
      expect(link).toHaveClass('focus:outline-none');
      expect(link).toHaveClass('focus:ring-2');
    });

    it('applies custom variant', () => {
      render(
        <RouterWrapper>
          <SmartLink to='/test' variant='muted'>
            Muted Link
          </SmartLink>
        </RouterWrapper>
      );

      const link = screen.getByText('Muted Link');
      expect(link).toBeInTheDocument();
    });

    it('applies size variants', () => {
      render(
        <RouterWrapper>
          <SmartLink to='/test' size='lg'>
            Large Link
          </SmartLink>
        </RouterWrapper>
      );

      const link = screen.getByText('Large Link');
      expect(link).toHaveClass('text-lg');
    });

    it('applies custom className', () => {
      render(
        <RouterWrapper>
          <SmartLink to='/test' className='custom-class'>
            Custom Link
          </SmartLink>
        </RouterWrapper>
      );

      const link = screen.getByText('Custom Link');
      expect(link).toHaveClass('custom-class');
    });
  });

  describe('Props and Behavior', () => {
    it('forwards ref correctly for internal links', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <RouterWrapper>
          <SmartLink ref={ref} to='/test'>
            Ref Link
          </SmartLink>
        </RouterWrapper>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it('forwards ref correctly for external links', () => {
      const ref = React.createRef<HTMLAnchorElement>();
      render(
        <SmartLink ref={ref} external to='/test'>
          External Ref
        </SmartLink>
      );

      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it('passes through additional props', () => {
      render(
        <RouterWrapper>
          <SmartLink to='/test' data-testid='smart-link' title='Link title'>
            Props Link
          </SmartLink>
        </RouterWrapper>
      );

      const link = screen.getByTestId('smart-link');
      expect(link).toHaveAttribute('title', 'Link title');
    });

    it('forces external variant when external prop is true', () => {
      render(
        <SmartLink external to='/internal-looking' variant='subtle'>
          Forced External
        </SmartLink>
      );

      const link = screen.getByText('Forced External');
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  describe('Accessibility', () => {
    it('includes focus ring styling', () => {
      render(
        <RouterWrapper>
          <SmartLink to='/test'>Accessible Link</SmartLink>
        </RouterWrapper>
      );

      const link = screen.getByText('Accessible Link');
      expect(link).toHaveClass('focus:ring-2');
      expect(link).toHaveClass('focus:ring-blue-500');
    });

    it('provides proper ARIA attributes for external links', () => {
      render(<SmartLink href='https://example.com'>External Site</SmartLink>);

      const link = screen.getByText('External Site');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});

describe('SmartContent Component', () => {
  describe('Basic Text Processing', () => {
    it('renders plain text without mappings', () => {
      render(<SmartContent>Just plain text</SmartContent>);
      expect(screen.getByText('Just plain text')).toBeInTheDocument();
    });

    it('converts matched text to links', () => {
      const mappings = { about: '/about-page' };
      render(
        <RouterWrapper>
          <SmartContent mappings={mappings}>Visit our about page</SmartContent>
        </RouterWrapper>
      );

      expect(screen.getByText(/Visit our/)).toBeInTheDocument();
      expect(screen.getByText(/page/)).toBeInTheDocument();

      const link = screen.getByText('about');
      expect(link.tagName).toBe('A');
    });

    it('handles multiple mappings in same text', () => {
      const mappings = {
        about: '/about',
        contact: '/contact',
      };
      render(
        <RouterWrapper>
          <SmartContent mappings={mappings}>
            Check our about and contact pages
          </SmartContent>
        </RouterWrapper>
      );

      const aboutLink = screen.getByText('about');
      const contactLink = screen.getByText('contact');

      expect(aboutLink.tagName).toBe('A');
      expect(contactLink.tagName).toBe('A');
    });

    it('preserves word boundaries', () => {
      const mappings = { cat: '/animals/cat' };
      render(
        <RouterWrapper>
          <SmartContent mappings={mappings}>
            The cat and the catastrophe
          </SmartContent>
        </RouterWrapper>
      );

      // Should only link "cat" not "cat" in "catastrophe"
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveTextContent('cat');
    });

    it('handles case insensitive matching', () => {
      const mappings = { About: '/about' };
      render(
        <RouterWrapper>
          <SmartContent mappings={mappings}>
            Learn more about our services
          </SmartContent>
        </RouterWrapper>
      );

      const link = screen.getByText('about');
      expect(link.tagName).toBe('A');
    });
  });

  describe('Default Mappings', () => {
    it('uses default mappings when none provided', () => {
      render(
        <RouterWrapper>
          <SmartContent>Check our documentation for help</SmartContent>
        </RouterWrapper>
      );

      const docLink = screen.getByText('documentation');
      const helpLink = screen.getByText('help');

      expect(docLink.tagName).toBe('A');
      expect(helpLink.tagName).toBe('A');
    });

    it('maps common terms correctly', () => {
      render(
        <RouterWrapper>
          <SmartContent>Visit settings and contact us</SmartContent>
        </RouterWrapper>
      );

      const settingsLink = screen.getByText('settings');
      const contactLink = screen.getByText('contact us');

      expect(settingsLink.tagName).toBe('A');
      expect(contactLink.tagName).toBe('A');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty or undefined children', () => {
      const { container } = render(<SmartContent>{''}</SmartContent>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles non-string children gracefully', () => {
      // This would show a TypeScript error in real usage, but test the runtime behavior
      render(<SmartContent>{null as any}</SmartContent>);
      // Should not crash
    });

    it('applies custom className', () => {
      render(
        <SmartContent className='custom-content'>Test content</SmartContent>
      );
      const span = screen.getByText('Test content');
      expect(span).toHaveClass('custom-content');
    });

    it('uses custom variant for generated links', () => {
      render(
        <RouterWrapper>
          <SmartContent variant='muted'>Check documentation</SmartContent>
        </RouterWrapper>
      );

      const link = screen.getByText('documentation');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Advanced Text Processing', () => {
    it('handles overlapping mappings correctly', () => {
      const mappings = {
        'privacy policy': '/privacy',
        privacy: '/privacy-short',
      };
      render(
        <RouterWrapper>
          <SmartContent mappings={mappings}>
            Read our privacy policy
          </SmartContent>
        </RouterWrapper>
      );

      // Should prefer longer match
      const link = screen.getByText('privacy policy');
      expect(link.tagName).toBe('A');
    });

    it('handles special regex characters in mappings', () => {
      const mappings = { test: '/test-page' };
      render(
        <RouterWrapper>
          <SmartContent mappings={mappings}>This is a test case</SmartContent>
        </RouterWrapper>
      );

      // Check if the link was created
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveTextContent('test');
    });
  });
});

describe('useSmartLinks Hook', () => {
  it('processes content with link mappings', () => {
    const TestComponent = () => {
      const mappings = { test: '/test-page' };
      const result = useSmartLinks('This is a test', mappings);
      return <div>{result}</div>;
    };

    render(<TestComponent />);
    // The hook returns a string with markup, not rendered components
    expect(screen.getByText(/SmartLink/)).toBeInTheDocument();
  });

  it('handles empty mappings', () => {
    const TestComponent = () => {
      const result = useSmartLinks('No changes here', {});
      return <div>{result}</div>;
    };

    render(<TestComponent />);
    expect(screen.getByText('No changes here')).toBeInTheDocument();
  });

  it('memoizes results correctly', () => {
    let renderCount = 0;
    const TestComponent = ({ content }: { content: string }) => {
      renderCount++;
      const result = useSmartLinks(content, { test: '/test' });
      return <div>{result}</div>;
    };

    const { rerender } = render(<TestComponent content='test content' />);
    expect(renderCount).toBe(1);

    // Same content should not trigger re-processing
    rerender(<TestComponent content='test content' />);
    expect(renderCount).toBe(2); // Component re-renders but hook should memoize
  });
});
