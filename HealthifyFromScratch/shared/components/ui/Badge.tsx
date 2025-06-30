import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-800 hover:bg-primary-200",
        secondary: "bg-secondary-100 text-secondary-800 hover:bg-secondary-200",
        success: "bg-success-100 text-success-800 hover:bg-success-200",
        warning: "bg-warning-100 text-warning-800 hover:bg-warning-200",
        error: "bg-error-100 text-error-800 hover:bg-error-200",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        // Healthcare-specific variants
        patient: "bg-primary-100 text-primary-800",
        provider: "bg-secondary-100 text-secondary-800",
        emergency: "bg-error-500 text-white",
        critical: "bg-error-600 text-white animate-pulse",
        active: "bg-success-100 text-success-800",
        inactive: "bg-gray-100 text-gray-600",
        pending: "bg-warning-100 text-warning-800",
        cancelled: "bg-error-100 text-error-800",
        completed: "bg-success-100 text-success-800",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot, removable, onRemove, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
        )}
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-white"
            aria-label="Remove badge"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);
Badge.displayName = "Badge";

// Healthcare-specific badge components
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'active' | 'inactive' | 'pending' | 'cancelled' | 'completed';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, ...props }) => {
  const getVariant = () => {
    switch (status) {
      case 'active': return 'active';
      case 'inactive': return 'inactive';
      case 'pending': return 'pending';
      case 'cancelled': return 'cancelled';
      case 'completed': return 'completed';
      default: return 'default';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <Badge variant={getVariant()} dot {...props}>
      {getLabel()}
    </Badge>
  );
};

export interface UrgencyBadgeProps extends Omit<BadgeProps, 'variant'> {
  urgency: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
}

const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, ...props }) => {
  const getVariant = () => {
    switch (urgency) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'critical';
      case 'emergency': return 'emergency';
      default: return 'default';
    }
  };

  const getLabel = () => {
    switch (urgency) {
      case 'low': return 'Low Priority';
      case 'medium': return 'Medium Priority';
      case 'high': return 'High Priority';
      case 'critical': return 'Critical';
      case 'emergency': return 'Emergency';
      default: return urgency;
    }
  };

  return (
    <Badge variant={getVariant()} {...props}>
      {getLabel()}
    </Badge>
  );
};

export interface SubscriptionBadgeProps extends Omit<BadgeProps, 'variant'> {
  tier: 'starter' | 'boost' | 'pro';
}

const SubscriptionBadge: React.FC<SubscriptionBadgeProps> = ({ tier, ...props }) => {
  const getLabel = () => {
    switch (tier) {
      case 'starter': return 'Vital Starter';
      case 'boost': return 'Boost';
      case 'pro': return 'Pro';
      default: return tier;
    }
  };

  const getStyles = () => {
    switch (tier) {
      case 'starter': 
        return 'bg-green-100 text-green-800';
      case 'boost': 
        return 'bg-blue-100 text-blue-800';
      case 'pro': 
        return 'bg-purple-100 text-purple-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={clsx("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStyles())} {...props}>
      {getLabel()}
    </div>
  );
};

export { Badge, StatusBadge, UrgencyBadge, SubscriptionBadge, badgeVariants }; 