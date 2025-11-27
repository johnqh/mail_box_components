import React from 'react';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { Modal, ModalContent, ModalFooter } from '../ui/modal';
import { Button } from '@/ui';
import { variants } from '@sudobility/design';
import { textVariants } from '@sudobility/design';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loadingText?: string;
  variant?: 'default' | 'warning' | 'danger' | 'success' | 'info';
  isLoading?: boolean;
}

const iconMap = {
  default: InformationCircleIcon,
  warning: ExclamationTriangleIcon,
  danger: XCircleIcon,
  success: CheckCircleIcon,
  info: InformationCircleIcon,
};

const iconVariantMap = {
  default: () => variants.icon.variant.default.lg(),
  warning: () => variants.icon.variant.warning.lg(),
  danger: () => variants.icon.variant.error.lg(),
  success: () => variants.icon.variant.success.lg(),
  info: () => variants.icon.variant.default.lg(),
};

const buttonVariantMap = {
  default: 'default' as const,
  warning: 'default' as const,
  danger: 'destructive' as const,
  success: 'default' as const,
  info: 'default' as const,
};

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loadingText = 'Processing...',
  variant = 'default',
  isLoading = false,
}) => {
  const Icon = iconMap[variant];
  const iconVariant = iconVariantMap[variant];
  const buttonVariant = buttonVariantMap[variant];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size='small'
      variant='web3confirmation'
      aria-labelledby='confirmation-dialog-title'
      aria-describedby='confirmation-dialog-description'
    >
      <ModalContent variant='padded'>
        <div className='flex items-center gap-3 mb-4'>
          <Icon className={iconVariant()} />
          <h3
            id='confirmation-dialog-title'
            className={textVariants.heading.h4()}
          >
            {title}
          </h3>
        </div>
        <p
          id='confirmation-dialog-description'
          className={textVariants.body.md()}
        >
          {message}
        </p>
      </ModalContent>
      <ModalFooter>
        <Button variant='outline' onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          variant={buttonVariant}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? loadingText : confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
