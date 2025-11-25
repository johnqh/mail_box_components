import React from 'react';
import { Button, type ButtonProps } from './button';
import { Spinner } from './spinner';

export interface ActionButtonProps extends Omit<ButtonProps, 'children'> {
  /** Button text */
  children: React.ReactNode;
  /** Loading state */
  isLoading?: boolean;
  /** Text to show when loading (defaults to "Loading...") */
  loadingText?: string;
  /** Whether to show spinner icon when loading */
  showSpinner?: boolean;
}

/**
 * ActionButton Component
 *
 * Enhanced Button component with built-in loading state management.
 * Automatically shows loading text/spinner and disables interaction when loading.
 * Commonly used for form submissions, save actions, and async operations.
 *
 * @example
 * ```tsx
 * <ActionButton
 *   onClick={handleSave}
 *   isLoading={isSaving}
 *   loadingText="Saving..."
 *   variant="default"
 * >
 *   Save Changes
 * </ActionButton>
 * ```
 */
export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  isLoading = false,
  loadingText = 'Loading...',
  showSpinner = true,
  disabled,
  ...buttonProps
}) => {
  return (
    <Button
      {...buttonProps}
      disabled={disabled || isLoading}
      className={buttonProps.className}
    >
      {isLoading ? (
        <span className='flex items-center gap-2'>
          {showSpinner && <Spinner size='small' />}
          <span>{loadingText}</span>
        </span>
      ) : (
        children
      )}
    </Button>
  );
};
