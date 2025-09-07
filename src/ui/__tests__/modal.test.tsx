import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../modal';

describe('Modal Component', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    document.body.style.overflow = 'unset';
  });

  it('renders nothing when closed', () => {
    render(<Modal isOpen={false} onClose={vi.fn()}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal when open', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test Modal">
        Content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} title="Test Modal">
        Content
      </Modal>
    );
    
    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>
    );
    
    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalledTimes(1);
    }
  });

  it('does not close when overlay click is disabled', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnOverlayClick={false}>
        Content
      </Modal>
    );
    
    const backdrop = document.querySelector('.fixed.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).not.toHaveBeenCalled();
    }
  });

  it('calls onClose when Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        Content
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on Escape when closeOnEscape is false', () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEscape={false}>
        Content
      </Modal>
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} title="Test" showCloseButton={false}>
        Content
      </Modal>
    );
    
    expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()} className="custom-modal">
        Content
      </Modal>
    );
    
    const modal = screen.getByTestId('modal-content');
    expect(modal).toHaveClass('custom-modal');
  });

  it('applies different size variants', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={vi.fn()} size="small">
        Content
      </Modal>
    );
    
    let modal = screen.getByTestId('modal-content');
    expect(modal?.className).toContain('max-w-sm');
    
    rerender(
      <Modal isOpen={true} onClose={vi.fn()} size="large">
        Content
      </Modal>
    );
    
    modal = screen.getByTestId('modal-content');
    expect(modal?.className).toContain('max-w-2xl');
  });

  it('prevents body scroll when open', () => {
    render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
    expect(document.body.style.overflow).toBe('hidden');
    
    rerender(<Modal isOpen={false} onClose={vi.fn()}>Content</Modal>);
    expect(document.body.style.overflow).toBe('unset');
  });

  it('manages focus correctly', async () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    button.focus();
    
    render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
    
    await waitFor(() => {
      const modal = screen.getByRole('dialog').querySelector('[tabindex="-1"]');
      expect(document.activeElement).toBe(modal);
    });
    
    document.body.removeChild(button);
  });

  it('applies aria attributes correctly', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={vi.fn()}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        Content
      </Modal>
    );
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-description');
  });
});

describe('ModalHeader Component', () => {
  it('renders children', () => {
    render(<ModalHeader>Header Content</ModalHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ModalHeader className="custom-header">Header</ModalHeader>);
    const header = screen.getByTestId('modal-header');
    expect(header).toHaveClass('custom-header');
  });
});

describe('ModalContent Component', () => {
  it('renders children', () => {
    render(<ModalContent>Body Content</ModalContent>);
    expect(screen.getByText('Body Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ModalContent className="custom-content">Content</ModalContent>);
    const content = screen.getByTestId('modal-body');
    expect(content).toHaveClass('custom-content');
  });
});

describe('ModalFooter Component', () => {
  it('renders children', () => {
    render(<ModalFooter>Footer Content</ModalFooter>);
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ModalFooter className="custom-footer">Footer</ModalFooter>);
    const footer = screen.getByTestId('modal-footer');
    expect(footer).toHaveClass('custom-footer');
  });
});