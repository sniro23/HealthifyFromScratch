import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  variant?: 'default' | 'patient' | 'clinical' | 'emergency' | 'confirmation';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export interface ConfirmationModalProps extends Omit<ModalProps, 'variant'> {
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: 'danger' | 'warning' | 'success' | 'info';
  confirmLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  variant = 'default',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  children,
  footer,
  className = '',
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  React.useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-md';
      case 'md': return 'max-w-lg';
      case 'lg': return 'max-w-2xl';
      case 'xl': return 'max-w-4xl';
      case 'full': return 'max-w-full mx-4';
      default: return 'max-w-lg';
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'patient':
        return 'border-primary-200 bg-primary-50/30';
      case 'clinical':
        return 'border-secondary-200 bg-secondary-50/30';
      case 'emergency':
        return 'border-error-200 bg-error-50 shadow-xl';
      case 'confirmation':
        return 'border-warning-200 bg-warning-50/30';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const getTitleClasses = () => {
    switch (variant) {
      case 'patient': return 'text-primary-900';
      case 'clinical': return 'text-secondary-900';
      case 'emergency': return 'text-error-900';
      case 'confirmation': return 'text-warning-900';
      default: return 'text-gray-900';
    }
  };

  if (!mounted || !isOpen) {
    return null;
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={description ? 'modal-description' : undefined}
    >
      <div
        ref={modalRef}
        className={`w-full ${getSizeClasses()} ${getVariantClasses()} rounded-lg border shadow-lg focus:outline-none ${className}`}
        tabIndex={-1}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 pb-4">
            <div>
              {title && (
                <h2 
                  id="modal-title"
                  className={`text-lg font-semibold ${getTitleClasses()}`}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p 
                  id="modal-description"
                  className="mt-1 text-sm text-gray-600"
                >
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-2">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 pt-2 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'info',
  confirmLoading = false,
  ...modalProps
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      modalProps.onClose();
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case 'danger': return 'destructive';
      case 'warning': return 'warning';
      case 'success': return 'success';
      default: return 'primary';
    }
  };

  const footer = (
    <div className="flex justify-end space-x-3">
      <Button
        variant="outline"
        onClick={handleCancel}
        disabled={confirmLoading}
      >
        {cancelText}
      </Button>
      <Button
        variant={getConfirmButtonVariant()}
        onClick={onConfirm}
        loading={confirmLoading}
      >
        {confirmText}
      </Button>
    </div>
  );

  return (
    <Modal
      {...modalProps}
      variant="confirmation"
      footer={footer}
    />
  );
};

// Healthcare-specific modal hooks
export const usePatientModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [patientData, setPatientData] = React.useState<any>(null);

  const openModal = (patient?: any) => {
    setPatientData(patient);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPatientData(null);
  };

  return {
    isOpen,
    patientData,
    openModal,
    closeModal,
  };
};

export const useAppointmentModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [appointmentData, setAppointmentData] = React.useState<any>(null);

  const openModal = (appointment?: any) => {
    setAppointmentData(appointment);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setAppointmentData(null);
  };

  return {
    isOpen,
    appointmentData,
    openModal,
    closeModal,
  };
};

export { Modal, ConfirmationModal }; 