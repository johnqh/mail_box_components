import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalFooter } from './modal';
import { Button } from './button';
import { Input } from './input';
import { textVariants } from '@sudobility/design';

export interface TextInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void | Promise<void>;
  title: string;
  description: string;
  placeholder?: string;
  initialValue?: string;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  loadingText?: string;
  maxLength?: number;
  required?: boolean;
  validate?: (value: string) => string | null; // Returns error message or null
}

export const TextInputModal: React.FC<TextInputModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  placeholder = '',
  initialValue = '',
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  isLoading = false,
  loadingText = 'Processing...',
  maxLength,
  required = true,
  validate,
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  // Reset value when modal opens with new initialValue
  useEffect(() => {
    if (isOpen) {
      setValue(initialValue);
      setError(null);
    }
  }, [isOpen, initialValue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setError(null);

    // Validate required
    if (required && !value.trim()) {
      setError('This field is required');
      return;
    }

    // Custom validation
    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Submit
    try {
      await onSubmit(value.trim());
    } catch (err) {
      // If onSubmit throws, keep modal open and show error
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setError(null);
    onClose();
  };

  const canSubmit = required ? value.trim().length > 0 : true;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      size='small'
      aria-labelledby='text-input-modal-title'
      aria-describedby='text-input-modal-description'
      closeOnEscape={!isLoading}
      closeOnOverlayClick={!isLoading}
    >
      <form onSubmit={handleSubmit}>
        <ModalContent variant='padded'>
          <h3 id='text-input-modal-title' className={textVariants.heading.h4()}>
            {title}
          </h3>
          <p
            id='text-input-modal-description'
            className={`${textVariants.body.md()} mt-2 mb-4`}
          >
            {description}
          </p>
          <Input
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={isLoading}
            autoFocus
            aria-invalid={!!error}
            aria-describedby={error ? 'text-input-error' : undefined}
          />
          {error && (
            <p
              id='text-input-error'
              className={`${textVariants.body.sm()} text-red-600 dark:text-red-400 mt-2`}
              role='alert'
            >
              {error}
            </p>
          )}
        </ModalContent>
        <ModalFooter>
          <Button
            type='button'
            variant='outline'
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            type='submit'
            variant='default'
            disabled={!canSubmit || isLoading}
          >
            {isLoading ? loadingText : confirmText}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
