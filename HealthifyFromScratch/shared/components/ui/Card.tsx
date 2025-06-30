import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

const cardVariants = cva(
  "rounded-lg border bg-white text-gray-950 shadow transition-shadow",
  {
    variants: {
      variant: {
        default: "border-gray-200 shadow-soft",
        elevated: "border-gray-200 shadow-medium hover:shadow-large",
        outlined: "border-gray-300 shadow-none",
        patient: "border-primary-200 bg-primary-50/30 shadow-soft",
        clinical: "border-secondary-200 bg-secondary-50/30 shadow-soft",
        emergency: "border-error-200 bg-error-50 shadow-medium",
        success: "border-success-200 bg-success-50/30 shadow-soft",
        warning: "border-warning-200 bg-warning-50/30 shadow-soft",
      },
      size: {
        sm: "p-3",
        default: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  }
);

const cardHeaderVariants = cva(
  "flex flex-col space-y-1.5",
  {
    variants: {
      variant: {
        default: "",
        patient: "text-primary-900",
        clinical: "text-secondary-900", 
        emergency: "text-error-900",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, interactive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div";
    
    if (asChild) {
      return <React.Fragment {...props} />;
    }

    return (
      <Comp
        ref={ref}
        className={clsx(cardVariants({ variant, size, interactive }), className)}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(cardHeaderVariants({ variant }), className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, level = 3, children, ...props }, ref) => {
    const Heading = `h${level}` as keyof JSX.IntrinsicElements;
    
    return (
      <Heading
        ref={ref}
        className={clsx(
          "text-lg font-semibold leading-none tracking-tight",
          level === 1 && "text-2xl",
          level === 2 && "text-xl", 
          level === 3 && "text-lg",
          level === 4 && "text-base",
          level === 5 && "text-sm",
          level === 6 && "text-xs",
          className
        )}
        {...props}
      >
        {children}
      </Heading>
    );
  }
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={clsx("text-sm text-gray-600", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div 
      ref={ref} 
      className={clsx("pt-0", className)} 
      {...props} 
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx("flex items-center pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// Healthcare-specific card variants
export interface PatientCardProps extends Omit<CardProps, 'variant'> {
  patientName?: string;
  patientId?: string;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  status?: 'active' | 'waiting' | 'completed' | 'cancelled';
}

const PatientCard = React.forwardRef<HTMLDivElement, PatientCardProps>(
  ({ className, patientName, patientId, urgency, status, children, ...props }, ref) => {
    const getUrgencyVariant = () => {
      switch (urgency) {
        case 'critical': return 'emergency';
        case 'high': return 'warning';
        case 'medium': return 'clinical';
        default: return 'patient';
      }
    };

    return (
      <Card
        ref={ref}
        variant={getUrgencyVariant()}
        className={clsx("space-y-3", className)}
        {...props}
      >
        {(patientName || patientId) && (
          <CardHeader variant={getUrgencyVariant()}>
            {patientName && (
              <CardTitle level={4}>{patientName}</CardTitle>
            )}
            {patientId && (
              <CardDescription>Patient ID: {patientId}</CardDescription>
            )}
            {status && (
              <div className="flex items-center gap-2">
                <div className={clsx(
                  "w-2 h-2 rounded-full",
                  status === 'active' && "bg-success-500",
                  status === 'waiting' && "bg-warning-500",
                  status === 'completed' && "bg-primary-500",
                  status === 'cancelled' && "bg-error-500"
                )} />
                <span className="text-xs font-medium capitalize">{status}</span>
              </div>
            )}
          </CardHeader>
        )}
        <CardContent>
          {children}
        </CardContent>
      </Card>
    );
  }
);
PatientCard.displayName = "PatientCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  PatientCard,
  cardVariants,
}; 