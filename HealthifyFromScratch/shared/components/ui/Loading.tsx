import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Loader2, Heart, Activity } from 'lucide-react';

const spinnerVariants = cva(
  "animate-spin flex-shrink-0",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        default: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
        "2xl": "h-12 w-12",
      },
      variant: {
        default: "text-primary-500",
        patient: "text-primary-600",
        clinical: "text-secondary-600",
        emergency: "text-error-600",
        success: "text-success-600",
        muted: "text-gray-400",
      }
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const containerVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      fullScreen: {
        true: "fixed inset-0 bg-white/80 backdrop-blur-sm z-50",
        false: "",
      },
      overlay: {
        true: "absolute inset-0 bg-white/90 backdrop-blur-sm",
        false: "",
      }
    },
    defaultVariants: {
      fullScreen: false,
      overlay: false,
    },
  }
);

export interface LoadingProps extends VariantProps<typeof spinnerVariants> {
  text?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  icon?: 'spinner' | 'heart' | 'activity';
  className?: string;
  textClassName?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size,
  variant,
  text,
  fullScreen = false,
  overlay = false,
  icon = 'spinner',
  className = '',
  textClassName = '',
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'heart':
        return <Heart className={spinnerVariants({ size, variant })} />;
      case 'activity':
        return <Activity className={spinnerVariants({ size, variant })} />;
      default:
        return <Loader2 className={spinnerVariants({ size, variant })} />;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'xs': return 'text-xs';
      case 'sm': return 'text-sm';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      case '2xl': return 'text-2xl';
      default: return 'text-base';
    }
  };

  const content = (
    <div className={clsx("flex flex-col items-center space-y-2", className)}>
      {getIcon()}
      {text && (
        <p 
          className={clsx(
            "text-gray-600 font-medium text-center",
            getTextSize(),
            textClassName
          )}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen || overlay) {
    return (
      <div className={containerVariants({ fullScreen, overlay })}>
        {content}
      </div>
    );
  }

  return content;
};

// Healthcare-specific loading components
export const PatientLoading: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
  <Loading {...props} variant="patient" text={props.text || "Loading your health information..."} />
);

export const ClinicalLoading: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
  <Loading {...props} variant="clinical" text={props.text || "Processing clinical data..."} />
);

export const EmergencyLoading: React.FC<Omit<LoadingProps, 'variant'>> = (props) => (
  <Loading {...props} variant="emergency" text={props.text || "Processing urgent request..."} />
);

// Loading skeleton component
export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  lines?: number;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  width,
  height,
  lines = 1,
  variant = 'rectangular',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full';
      case 'text':
        return 'rounded h-4';
      default:
        return 'rounded-md';
    }
  };

  const baseClasses = "animate-pulse bg-gray-200";

  if (lines > 1) {
    return (
      <div className={clsx("space-y-2", className)}>
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className={clsx(baseClasses, getVariantClasses())}
            style={{
              width: i === lines - 1 ? '75%' : width || '100%',
              height: height || '1rem',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={clsx(baseClasses, getVariantClasses(), className)}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
    />
  );
};

// Healthcare-specific loading states
export const PatientCardSkeleton: React.FC = () => (
  <div className="border border-primary-200 bg-primary-50/30 rounded-lg p-4 space-y-3">
    <div className="flex items-center space-x-3">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <Skeleton width="60%" height={16} />
        <Skeleton width="40%" height={12} className="mt-1" />
      </div>
    </div>
    <Skeleton lines={2} />
  </div>
);

export const AppointmentCardSkeleton: React.FC = () => (
  <div className="border border-gray-200 rounded-lg p-4 space-y-3">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <Skeleton width="70%" height={16} />
        <Skeleton width="50%" height={12} className="mt-1" />
      </div>
      <Skeleton width={60} height={20} />
    </div>
    <Skeleton lines={1} />
    <div className="flex space-x-2">
      <Skeleton width={80} height={32} />
      <Skeleton width={80} height={32} />
    </div>
  </div>
);

export { Loading, spinnerVariants }; 