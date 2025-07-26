import React from 'react';
import { cn } from '../../../lib/utils';
import { Box } from './Box';
import { space } from './tokens';

// =============================================================================
// STACK COMPONENT
// =============================================================================

/**
 * Stack is a layout component that arranges children in a vertical or horizontal line
 * with consistent spacing between them. It's built on top of Box.
 */

interface StackProps {
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal';
  gap?: keyof typeof space | string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  
  // Pass through Box props
  p?: keyof typeof space | string;
  px?: keyof typeof space | string;
  py?: keyof typeof space | string;
  m?: keyof typeof space | string;
  mx?: keyof typeof space | string;
  my?: keyof typeof space | string;
  bg?: string;
  borderRadius?: string;
  shadow?: string;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
}

export function Stack({
  children,
  direction = 'vertical',
  gap = 'md',
  align,
  justify,
  wrap = false,
  className,
  as = 'div',
  ...boxProps
}: StackProps & React.HTMLAttributes<HTMLElement>) {
  const flexDirection = direction === 'vertical' ? 'column' : 'row';
  const alignItems = align;
  const justifyContent = justify;
  
  return (
    <Box
      as={as}
      display="flex"
      flexDirection={flexDirection}
      alignItems={alignItems}
      justifyContent={justifyContent}
      gap={gap}
      className={cn(
        wrap && 'flex-wrap',
        className
      )}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

// =============================================================================
// CONVENIENCE COMPONENTS
// =============================================================================

/**
 * VStack - Vertical stack with common defaults
 */
export function VStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="vertical" {...props} />;
}

/**
 * HStack - Horizontal stack with common defaults
 */
export function HStack(props: Omit<StackProps, 'direction'>) {
  return <Stack direction="horizontal" {...props} />;
}

// =============================================================================
// SPECIALIZED STACK COMPONENTS
// =============================================================================

/**
 * Spacer - Takes up available space in a stack
 */
export function Spacer({ className, ...props }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn('flex-1', className)} 
      {...props} 
    />
  );
}

/**
 * Divider - Visual separator in stacks
 */
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  thickness?: string;
  color?: string;
  length?: string;
}

export function Divider({
  orientation = 'horizontal',
  className,
  thickness = '1px',
  color = 'currentColor',
  length = '100%',
  ...props
}: DividerProps & React.HTMLAttributes<HTMLDivElement>) {
  const style: React.CSSProperties = {
    opacity: 0.2,
    backgroundColor: color,
  };
  
  if (orientation === 'horizontal') {
    style.width = length;
    style.height = thickness;
    style.minHeight = thickness;
  } else {
    style.height = length;
    style.width = thickness;
    style.minWidth = thickness;
  }
  
  return (
    <div
      role="separator"
      className={cn(
        'shrink-0',
        orientation === 'horizontal' ? 'w-full' : 'h-full',
        className
      )}
      style={style}
      {...props}
    />
  );
}

// =============================================================================
// STACK WITH DIVIDERS
// =============================================================================

/**
 * StackWithDividers - Stack that automatically adds dividers between children
 */
interface StackWithDividersProps extends StackProps {
  dividerProps?: Omit<DividerProps, 'orientation'>;
}

export function StackWithDividers({
  children,
  direction = 'vertical',
  dividerProps,
  ...stackProps
}: StackWithDividersProps) {
  const childrenArray = React.Children.toArray(children);
  const dividerOrientation = direction === 'vertical' ? 'horizontal' : 'vertical';
  
  return (
    <Stack direction={direction} gap="0" {...stackProps}>
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < childrenArray.length - 1 && (
            <Divider 
              orientation={dividerOrientation} 
              {...dividerProps} 
            />
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
}

// =============================================================================
// RESPONSIVE STACK
// =============================================================================

/**
 * ResponsiveStack - Stack that changes direction based on screen size
 */
interface ResponsiveStackProps extends Omit<StackProps, 'direction'> {
  mobileDirection?: 'vertical' | 'horizontal';
  desktopDirection?: 'vertical' | 'horizontal';
  breakpoint?: 'sm' | 'md' | 'lg';
}

export function ResponsiveStack({
  mobileDirection = 'vertical',
  desktopDirection = 'horizontal',
  breakpoint = 'md',
  className,
  ...stackProps
}: ResponsiveStackProps) {
  const mobileClass = mobileDirection === 'vertical' ? 'flex-col' : 'flex-row';
  const desktopClass = desktopDirection === 'vertical' ? 'flex-col' : 'flex-row';
  const breakpointClass = `${breakpoint}:${desktopClass}`;
  
  return (
    <Stack
      direction={mobileDirection}
      className={cn(
        mobileClass,
        breakpointClass,
        className
      )}
      {...stackProps}
    />
  );
}

// =============================================================================
// CHROME EXTENSION OPTIMIZED STACKS
// =============================================================================

/**
 * ExtensionStack - Stack optimized for Chrome extension constraints
 */
export function ExtensionStack({
  gap = 'sm',
  className,
  ...stackProps
}: StackProps) {
  return (
    <Stack
      gap={gap}
      maxWidth="28rem" // Chrome extension optimal width
      className={cn('w-full', className)}
      {...stackProps}
    />
  );
}

/**
 * CompactStack - Very compact stack for dense layouts
 */
export function CompactStack({
  gap = 'xs',
  className,
  ...stackProps
}: StackProps) {
  return (
    <Stack
      gap={gap}
      className={cn(className)}
      {...stackProps}
    />
  );
}