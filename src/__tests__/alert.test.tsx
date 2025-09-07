import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

describe('Alert Component', () => {
  it('renders default alert', () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test description</AlertDescription>
      </Alert>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Alert variant="success">
        <AlertDescription>Success message</AlertDescription>
      </Alert>
    );
    
    expect(screen.getByText('Success message')).toBeInTheDocument();

    rerender(
      <Alert variant="error">
        <AlertDescription>Error message</AlertDescription>
      </Alert>
    );
    
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Alert className="custom-class">
        <AlertDescription>Test</AlertDescription>
      </Alert>
    );
    
    const alert = screen.getByText('Test').closest('[role="alert"]');
    expect(alert).toHaveClass('custom-class');
  });
});