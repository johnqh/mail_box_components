import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders card with children', () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );

      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with different variants', () => {
      const { rerender } = render(<Card variant='default'>Default</Card>);
      expect(screen.getByText('Default')).toBeInTheDocument();

      rerender(<Card variant='bordered'>Bordered</Card>);
      expect(screen.getByText('Bordered')).toBeInTheDocument();

      rerender(<Card variant='elevated'>Elevated</Card>);
      expect(screen.getByText('Elevated')).toBeInTheDocument();
    });

    it('renders with different padding', () => {
      const { rerender } = render(<Card padding='sm'>Small padding</Card>);
      expect(screen.getByText('Small padding')).toBeInTheDocument();

      rerender(<Card padding='md'>Medium padding</Card>);
      expect(screen.getByText('Medium padding')).toBeInTheDocument();

      rerender(<Card padding='lg'>Large padding</Card>);
      expect(screen.getByText('Large padding')).toBeInTheDocument();
    });
  });

  describe('CardHeader', () => {
    it('renders with title and description', () => {
      render(<CardHeader title='Card Title' description='Card description' />);

      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card description')).toBeInTheDocument();
    });

    it('renders with custom children', () => {
      render(
        <CardHeader>
          <div>Custom header content</div>
        </CardHeader>
      );

      expect(screen.getByText('Custom header content')).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('renders content', () => {
      render(
        <CardContent>
          <div>Card body content</div>
        </CardContent>
      );

      expect(screen.getByText('Card body content')).toBeInTheDocument();
    });
  });

  describe('CardFooter', () => {
    it('renders footer', () => {
      render(
        <CardFooter>
          <div>Footer content</div>
        </CardFooter>
      );

      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });
  });
});
