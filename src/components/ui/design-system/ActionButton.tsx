import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { LucideIcon, Loader2 } from 'lucide-react';
import { button as buttonTokens } from './tokens';

// =============================================================================
// ENHANCED ACTION BUTTON WITH DESIGN TOKENS
// =============================================================================

/**
 * Button variants using class-variance-authority and design tokens
 */
const actionButtonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
      },
      size: {
        default: 'h-10 py-2 px-4',
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-xs': 'h-7 w-7',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      loading: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
      loading: false,
    },
  }
);

// =============================================================================
// ENHANCED ACTION BUTTON INTERFACE
// =============================================================================

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionButtonVariants> {
  children?: React.ReactNode;
  
  // Icon props
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right' | 'only';
  iconSize?: 'xs' | 'sm' | 'md' | 'lg';
  
  // State props
  loading?: boolean;
  disabled?: boolean;
  
  // Layout props
  fullWidth?: boolean;
  
  // Additional props
  loadingText?: string;
  tooltip?: string;
  
  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ActionButton({
  children,
  className,
  variant,
  size,
  fullWidth,
  loading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  iconSize = 'sm',
  loadingText,
  tooltip,
  onClick,
  ...props
}: ActionButtonProps) {
  // Determine if this is an icon-only button
  const isIconOnly = iconPosition === 'only' || (!children && Icon);
  
  // Get icon size classes
  const iconSizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };
  
  const iconClassName = iconSizeClasses[iconSize];
  
  // Handle loading state
  const isLoading = loading;
  const isDisabled = disabled || isLoading;
  
  // Content rendering
  const renderIcon = (position: 'left' | 'right') => {
    if (!Icon || iconPosition !== position) return null;
    
    return (
      <Icon 
        className={cn(
          iconClassName,
          !isIconOnly && position === 'left' && 'mr-2',
          !isIconOnly && position === 'right' && 'ml-2'
        )} 
      />
    );
  };
  
  const renderLoadingIcon = () => (
    <Loader2 
      className={cn(
        iconClassName,
        'animate-spin',
        !isIconOnly && loadingText && 'mr-2'
      )} 
    />
  );
  
  const content = (
    <>
      {isLoading ? renderLoadingIcon() : renderIcon('left')}
      {!isIconOnly && (
        <span className={cn(isLoading && !loadingText && 'sr-only')}>
          {isLoading && loadingText ? loadingText : children}
        </span>
      )}
      {!isLoading && renderIcon('right')}
      {isIconOnly && Icon && <Icon className={iconClassName} />}
    </>
  );
  
  const buttonElement = (
    <button
      className={cn(
        actionButtonVariants({ 
          variant, 
          size: isIconOnly ? (size === 'xs' ? 'icon-xs' : size === 'sm' ? 'icon-sm' : 'icon') : size, 
          fullWidth, 
          loading: isLoading 
        }),
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      aria-label={isIconOnly ? (typeof children === 'string' ? children : 'Button') : undefined}
      {...props}
    >
      {content}
    </button>
  );
  
  // Wrap with tooltip if provided
  if (tooltip) {
    return (
      <div title={tooltip}>
        {buttonElement}
      </div>
    );
  }
  
  return buttonElement;
}

// =============================================================================
// PRESET ACTION BUTTON COMPONENTS
// =============================================================================

/**
 * IconButton - Button with only an icon
 */
interface IconButtonProps extends Omit<ActionButtonProps, 'children' | 'iconPosition'> {
  icon: LucideIcon;
  'aria-label': string;
}

export function IconButton({ icon, ...props }: IconButtonProps) {
  return (
    <ActionButton
      icon={icon}
      iconPosition="only"
      {...props}
    />
  );
}

/**
 * LoadingButton - Button that shows loading state
 */
interface LoadingButtonProps extends ActionButtonProps {
  isLoading?: boolean;
}

export function LoadingButton({ 
  isLoading = false, 
  loadingText = 'Loading...', 
  children,
  ...props 
}: LoadingButtonProps) {
  return (
    <ActionButton
      loading={isLoading}
      loadingText={loadingText}
      {...props}
    >
      {children}
    </ActionButton>
  );
}

/**
 * ConfirmButton - Button for destructive actions
 */
export function ConfirmButton(props: ActionButtonProps) {
  return (
    <ActionButton
      variant="destructive"
      {...props}
    />
  );
}

/**
 * SuccessButton - Button for success actions
 */
export function SuccessButton(props: ActionButtonProps) {
  return (
    <ActionButton
      variant="success"
      {...props}
    />
  );
}

/**
 * WarningButton - Button for warning actions
 */
export function WarningButton(props: ActionButtonProps) {
  return (
    <ActionButton
      variant="warning"
      {...props}
    />
  );
}

// =============================================================================
// BUTTON GROUP COMPONENT
// =============================================================================

/**
 * ButtonGroup - Group related buttons together
 */
interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md';
  className?: string;
}

export function ButtonGroup({ 
  children, 
  orientation = 'horizontal',
  spacing = 'sm',
  className 
}: ButtonGroupProps) {
  const spacingClasses = {
    none: '',
    sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
    md: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
  };
  
  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        spacingClasses[spacing],
        className
      )}
      role="group"
    >
      {children}
    </div>
  );
}

// =============================================================================
// CHROME EXTENSION OPTIMIZED BUTTONS
// =============================================================================

/**
 * ExtensionButton - Button optimized for Chrome extension constraints
 */
export function ExtensionButton(props: ActionButtonProps) {
  return (
    <ActionButton
      size="sm"
      className="max-w-full"
      {...props}
    />
  );
}

/**
 * CompactButton - Very compact button for dense layouts
 */
export function CompactButton(props: ActionButtonProps) {
  return (
    <ActionButton
      size="xs"
      className="max-w-full"
      {...props}
    />
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export { actionButtonVariants };
export type { ActionButtonProps, IconButtonProps };