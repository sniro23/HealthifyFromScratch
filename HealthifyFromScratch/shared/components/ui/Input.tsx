import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const inputVariants = cva(
  "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  {
    variants: {
      variant: {
        default: "border-gray-300 focus:border-primary-500",
        error: "border-error-500 focus:border-error-600 focus-visible:ring-error-500",
        success: "border-success-500 focus:border-success-600 focus-visible:ring-success-500",
        warning: "border-warning-500 focus:border-warning-600 focus-visible:ring-warning-500",
      },
      size: {
        sm: "h-9 px-2 text-xs",
        default: "h-10 px-3",
        lg: "h-11 px-4 text-base",
        xl: "h-12 px-4 text-base",
        touch: "h-12 px-4 text-base", // Optimized for mobile touch
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    variant,
    size,
    type = "text",
    label,
    helperText,
    errorMessage,
    successMessage,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    containerClassName,
    required,
    disabled,
    id,
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [internalId] = React.useState(() => id || `input-${Math.random().toString(36).slice(2)}`);

    const inputType = showPasswordToggle && type === "password" 
      ? (showPassword ? "text" : "password")
      : type;

    const currentVariant = errorMessage ? "error" 
      : successMessage ? "success" 
      : variant;

    return (
      <div className={clsx("space-y-2", containerClassName)}>
        {label && (
          <label 
            htmlFor={internalId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            type={inputType}
            className={clsx(
              inputVariants({ variant: currentVariant, size, className }),
              leftIcon && "pl-10",
              (rightIcon || showPasswordToggle || errorMessage) && "pr-10"
            )}
            ref={ref}
            id={internalId}
            disabled={disabled}
            required={required}
            aria-invalid={errorMessage ? 'true' : 'false'}
            {...props}
          />
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {errorMessage && (
              <AlertCircle className="h-4 w-4 text-error-500" />
            )}
            
            {showPasswordToggle && type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
            
            {rightIcon && !errorMessage && (
              <div className="text-gray-400">{rightIcon}</div>
            )}
          </div>
        </div>

        {helperText && !errorMessage && !successMessage && (
          <p className="text-xs text-gray-600">{helperText}</p>
        )}
        
        {errorMessage && (
          <p className="text-xs text-error-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errorMessage}
          </p>
        )}
        
        {successMessage && !errorMessage && (
          <p className="text-xs text-success-600">{successMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants }; 