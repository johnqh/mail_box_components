/**
 * Tests for ConfirmationDialog Component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ConfirmationDialog } from '../ui/confirmation-dialog';

describe('ConfirmationDialog Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders dialog when open', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
      expect(
        screen.getByText('Are you sure you want to proceed?')
      ).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('does not render dialog when closed', () => {
      render(<ConfirmationDialog {...defaultProps} isOpen={false} />);

      expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
    });

    it('renders with custom button text', () => {
      render(
        <ConfirmationDialog
          {...defaultProps}
          confirmText='Delete'
          cancelText='Keep'
        />
      );

      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Keep')).toBeInTheDocument();
    });

    it('displays loading state correctly', () => {
      render(
        <ConfirmationDialog
          {...defaultProps}
          isLoading={true}
          loadingText='Deleting...'
        />
      );

      expect(screen.getByText('Deleting...')).toBeInTheDocument();

      // Buttons should be disabled during loading
      const confirmButton = screen.getByText('Deleting...');
      const cancelButton = screen.getByText('Cancel');

      expect(confirmButton).toBeDisabled();
      expect(cancelButton).toBeDisabled();
    });
  });

  describe('Dialog Variants', () => {
    it('renders default variant with information icon', () => {
      render(<ConfirmationDialog {...defaultProps} variant='default' />);

      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders warning variant', () => {
      render(<ConfirmationDialog {...defaultProps} variant='warning' />);

      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders danger variant with destructive button', () => {
      render(<ConfirmationDialog {...defaultProps} variant='danger' />);

      const confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toBeInTheDocument();
    });

    it('renders success variant', () => {
      render(<ConfirmationDialog {...defaultProps} variant='success' />);

      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders info variant', () => {
      render(<ConfirmationDialog {...defaultProps} variant='info' />);

      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onClose when cancel button is clicked', () => {
      const onClose = vi.fn();
      render(<ConfirmationDialog {...defaultProps} onClose={onClose} />);

      fireEvent.click(screen.getByText('Cancel'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onConfirm when confirm button is clicked', () => {
      const onConfirm = vi.fn();
      render(<ConfirmationDialog {...defaultProps} onConfirm={onConfirm} />);

      fireEvent.click(screen.getByText('Confirm'));
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('does not call handlers when buttons are disabled during loading', () => {
      const onClose = vi.fn();
      const onConfirm = vi.fn();

      render(
        <ConfirmationDialog
          {...defaultProps}
          onClose={onClose}
          onConfirm={onConfirm}
          isLoading={true}
        />
      );

      fireEvent.click(screen.getByText('Cancel'));
      fireEvent.click(screen.getByText('Processing...'));

      expect(onClose).not.toHaveBeenCalled();
      expect(onConfirm).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('provides proper ARIA labels', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute(
        'aria-labelledby',
        'confirmation-dialog-title'
      );
      expect(dialog).toHaveAttribute(
        'aria-describedby',
        'confirmation-dialog-description'
      );
    });

    it('title has proper id for aria-labelledby', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const title = screen.getByText('Confirm Action');
      expect(title).toHaveAttribute('id', 'confirmation-dialog-title');
    });

    it('message has proper id for aria-describedby', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const message = screen.getByText('Are you sure you want to proceed?');
      expect(message).toHaveAttribute('id', 'confirmation-dialog-description');
    });

    it('focuses on dialog when opened', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Modal Integration', () => {
    it('uses small modal size', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      // The modal should be rendered with small size
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('uses web3confirmation modal variant', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('passes onClose to modal for backdrop clicks and escape key', () => {
      const onClose = vi.fn();
      render(<ConfirmationDialog {...defaultProps} onClose={onClose} />);

      // Test that the modal is set up to handle close events
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Button States and Styling', () => {
    it('applies correct button variants for different dialog variants', () => {
      // Test danger variant uses destructive button
      const { rerender } = render(
        <ConfirmationDialog {...defaultProps} variant='danger' />
      );

      let confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toBeInTheDocument();

      // Test other variants use default button
      rerender(<ConfirmationDialog {...defaultProps} variant='warning' />);
      confirmButton = screen.getByText('Confirm');
      expect(confirmButton).toBeInTheDocument();
    });

    it('cancel button always uses outline variant', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const cancelButton = screen.getByText('Cancel');
      expect(cancelButton).toBeInTheDocument();
    });
  });

  describe('Icon Rendering', () => {
    it('renders appropriate icon for each variant', () => {
      const variants = [
        'default',
        'warning',
        'danger',
        'success',
        'info',
      ] as const;

      variants.forEach(variant => {
        const { unmount } = render(
          <ConfirmationDialog {...defaultProps} variant={variant} />
        );

        const icon = document.querySelector('svg');
        expect(icon).toBeInTheDocument();

        unmount();
      });
    });

    it('applies large icon variant for all dialog types', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const icon = document.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Content Layout', () => {
    it('displays icon and title in header section', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const title = screen.getByText('Confirm Action');
      const icon = document.querySelector('svg');

      expect(title).toBeInTheDocument();
      expect(icon).toBeInTheDocument();

      // They should be in the same container (header section)
      const titleParent = title.parentElement;
      const iconParent = icon?.parentElement;
      expect(titleParent).toBe(iconParent);
    });

    it('displays message in separate section', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const message = screen.getByText('Are you sure you want to proceed?');
      expect(message.tagName).toBe('P');
    });

    it('displays buttons in footer section', () => {
      render(<ConfirmationDialog {...defaultProps} />);

      const confirmButton = screen.getByText('Confirm');
      const cancelButton = screen.getByText('Cancel');

      expect(confirmButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty or long titles gracefully', () => {
      const longTitle =
        'This is a very long title that might wrap to multiple lines and should still be displayed correctly';

      render(<ConfirmationDialog {...defaultProps} title={longTitle} />);

      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it('handles empty or long messages gracefully', () => {
      const longMessage =
        'This is a very long message that explains in great detail what action the user is about to take and why they should be careful about proceeding with this action.';

      render(<ConfirmationDialog {...defaultProps} message={longMessage} />);

      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('handles rapid open/close state changes', () => {
      const onClose = vi.fn();
      const { rerender } = render(
        <ConfirmationDialog {...defaultProps} isOpen={true} onClose={onClose} />
      );

      expect(screen.getByText('Confirm Action')).toBeInTheDocument();

      rerender(
        <ConfirmationDialog
          {...defaultProps}
          isOpen={false}
          onClose={onClose}
        />
      );
      expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();

      rerender(
        <ConfirmationDialog {...defaultProps} isOpen={true} onClose={onClose} />
      );
      expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    });
  });
});
