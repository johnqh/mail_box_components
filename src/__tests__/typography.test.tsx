import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageTitle, SectionTitle, BodyText, TextLink } from '../ui/typography';

describe('Typography Components', () => {
  describe('PageTitle', () => {
    it('renders page title', () => {
      render(<PageTitle>Main Title</PageTitle>);
      expect(screen.getByText('Main Title')).toBeInTheDocument();
    });

    it('renders with different variants', () => {
      const { rerender } = render(<PageTitle variant="hero">Hero Title</PageTitle>);
      expect(screen.getByText('Hero Title')).toBeInTheDocument();

      rerender(<PageTitle variant="display">Display Title</PageTitle>);
      expect(screen.getByText('Display Title')).toBeInTheDocument();

      rerender(<PageTitle variant="h1">H1 Title</PageTitle>);
      expect(screen.getByText('H1 Title')).toBeInTheDocument();
    });

    it('renders with custom HTML element', () => {
      render(<PageTitle as="h2">Custom H2</PageTitle>);
      const title = screen.getByText('Custom H2');
      expect(title.tagName).toBe('H2');
    });

    it('renders with different alignments', () => {
      const { rerender } = render(<PageTitle align="center">Centered</PageTitle>);
      expect(screen.getByText('Centered')).toBeInTheDocument();

      rerender(<PageTitle align="right">Right Aligned</PageTitle>);
      expect(screen.getByText('Right Aligned')).toBeInTheDocument();
    });
  });

  describe('SectionTitle', () => {
    it('renders section title', () => {
      render(<SectionTitle>Section Title</SectionTitle>);
      expect(screen.getByText('Section Title')).toBeInTheDocument();
    });

    it('renders with different variants', () => {
      const { rerender } = render(<SectionTitle variant="h2">H2 Section</SectionTitle>);
      expect(screen.getByText('H2 Section')).toBeInTheDocument();

      rerender(<SectionTitle variant="h3">H3 Section</SectionTitle>);
      expect(screen.getByText('H3 Section')).toBeInTheDocument();
    });
  });

  describe('BodyText', () => {
    it('renders body text', () => {
      render(<BodyText>Body content</BodyText>);
      expect(screen.getByText('Body content')).toBeInTheDocument();
    });

    it('renders with different variants', () => {
      const { rerender } = render(<BodyText variant="lead">Lead text</BodyText>);
      expect(screen.getByText('Lead text')).toBeInTheDocument();

      rerender(<BodyText variant="small">Small text</BodyText>);
      expect(screen.getByText('Small text')).toBeInTheDocument();

      rerender(<BodyText variant="caption">Caption text</BodyText>);
      expect(screen.getByText('Caption text')).toBeInTheDocument();
    });

    it('renders with different colors', () => {
      const { rerender } = render(<BodyText color="muted">Muted text</BodyText>);
      expect(screen.getByText('Muted text')).toBeInTheDocument();

      rerender(<BodyText color="primary">Primary text</BodyText>);
      expect(screen.getByText('Primary text')).toBeInTheDocument();
    });
  });

  describe('TextLink', () => {
    it('renders text link', () => {
      render(<TextLink href="/test">Link text</TextLink>);
      const link = screen.getByRole('link', { name: 'Link text' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
    });

    it('renders external link', () => {
      render(<TextLink href="https://example.com" external>External link</TextLink>);
      const link = screen.getByRole('link', { name: /External link/ });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders with different variants', () => {
      const { rerender } = render(<TextLink href="/test" variant="subtle">Subtle link</TextLink>);
      expect(screen.getByRole('link', { name: 'Subtle link' })).toBeInTheDocument();

      rerender(<TextLink href="/test" variant="muted">Muted link</TextLink>);
      expect(screen.getByRole('link', { name: 'Muted link' })).toBeInTheDocument();
    });
  });
});