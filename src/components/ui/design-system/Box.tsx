import React from 'react';
import { cn } from '../../../lib/utils';
import { space, radius, shadow } from './tokens';

// =============================================================================
// BOX COMPONENT
// =============================================================================

/**
 * Box is a primitive layout component that provides consistent spacing,
 * sizing, and styling properties. It's the foundation for building other components.
 */

interface BoxProps {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  
  // Spacing props
  p?: keyof typeof space | string;
  px?: keyof typeof space | string;
  py?: keyof typeof space | string;
  pt?: keyof typeof space | string;
  pr?: keyof typeof space | string;
  pb?: keyof typeof space | string;
  pl?: keyof typeof space | string;
  
  m?: keyof typeof space | string;
  mx?: keyof typeof space | string;
  my?: keyof typeof space | string;
  mt?: keyof typeof space | string;
  mr?: keyof typeof space | string;
  mb?: keyof typeof space | string;
  ml?: keyof typeof space | string;
  
  // Border props
  borderRadius?: keyof typeof radius | string;
  border?: boolean | string;
  borderTop?: boolean | string;
  borderRight?: boolean | string;
  borderBottom?: boolean | string;
  borderLeft?: boolean | string;
  
  // Shadow props
  shadow?: keyof typeof shadow | string;
  
  // Background props
  bg?: string;
  
  // Size props
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  
  // Flex props (when used as flex container)
  display?: 'block' | 'inline' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: keyof typeof space | string;
  
  // Grid props (when used as grid container)
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridColumn?: string;
  gridRow?: string;
  
  // Position props
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  
  // Overflow props
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto';
}

export function Box({
  children,
  as: Component = 'div',
  className,
  
  // Spacing
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  
  // Border
  borderRadius,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  
  // Shadow
  shadow: shadowProp,
  
  // Background
  bg,
  
  // Size
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  
  // Flex
  display,
  flexDirection,
  alignItems,
  justifyContent,
  gap,
  
  // Grid
  gridTemplateColumns,
  gridTemplateRows,
  gridColumn,
  gridRow,
  
  // Position
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  
  // Overflow
  overflow,
  overflowX,
  overflowY,
  
  ...props
}: BoxProps & React.HTMLAttributes<HTMLElement>) {
  // Build style object from props
  const style: React.CSSProperties = {};
  
  // Spacing styles
  if (p) style.padding = space[p as keyof typeof space] || p;
  if (px) {
    const value = space[px as keyof typeof space] || px;
    style.paddingLeft = value;
    style.paddingRight = value;
  }
  if (py) {
    const value = space[py as keyof typeof space] || py;
    style.paddingTop = value;
    style.paddingBottom = value;
  }
  if (pt) style.paddingTop = space[pt as keyof typeof space] || pt;
  if (pr) style.paddingRight = space[pr as keyof typeof space] || pr;
  if (pb) style.paddingBottom = space[pb as keyof typeof space] || pb;
  if (pl) style.paddingLeft = space[pl as keyof typeof space] || pl;
  
  if (m) style.margin = space[m as keyof typeof space] || m;
  if (mx) {
    const value = space[mx as keyof typeof space] || mx;
    style.marginLeft = value;
    style.marginRight = value;
  }
  if (my) {
    const value = space[my as keyof typeof space] || my;
    style.marginTop = value;
    style.marginBottom = value;
  }
  if (mt) style.marginTop = space[mt as keyof typeof space] || mt;
  if (mr) style.marginRight = space[mr as keyof typeof space] || mr;
  if (mb) style.marginBottom = space[mb as keyof typeof space] || mb;
  if (ml) style.marginLeft = space[ml as keyof typeof space] || ml;
  
  // Border styles
  if (borderRadius) {
    style.borderRadius = radius[borderRadius as keyof typeof radius] || borderRadius;
  }
  if (border) {
    style.border = typeof border === 'boolean' ? '1px solid' : border;
  }
  if (borderTop) {
    style.borderTop = typeof borderTop === 'boolean' ? '1px solid' : borderTop;
  }
  if (borderRight) {
    style.borderRight = typeof borderRight === 'boolean' ? '1px solid' : borderRight;
  }
  if (borderBottom) {
    style.borderBottom = typeof borderBottom === 'boolean' ? '1px solid' : borderBottom;
  }
  if (borderLeft) {
    style.borderLeft = typeof borderLeft === 'boolean' ? '1px solid' : borderLeft;
  }
  
  // Shadow styles
  if (shadowProp) {
    style.boxShadow = shadow[shadowProp as keyof typeof shadow] || shadowProp;
  }
  
  // Background styles
  if (bg) style.backgroundColor = bg;
  
  // Size styles
  if (width) style.width = width;
  if (height) style.height = height;
  if (minWidth) style.minWidth = minWidth;
  if (minHeight) style.minHeight = minHeight;
  if (maxWidth) style.maxWidth = maxWidth;
  if (maxHeight) style.maxHeight = maxHeight;
  
  // Display styles
  if (display) style.display = display;
  
  // Flex styles
  if (flexDirection) style.flexDirection = flexDirection;
  if (alignItems) style.alignItems = alignItems === 'start' ? 'flex-start' : alignItems === 'end' ? 'flex-end' : alignItems;
  if (justifyContent) {
    const justifyMap = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    style.justifyContent = justifyMap[justifyContent];
  }
  if (gap) style.gap = space[gap as keyof typeof space] || gap;
  
  // Grid styles
  if (gridTemplateColumns) style.gridTemplateColumns = gridTemplateColumns;
  if (gridTemplateRows) style.gridTemplateRows = gridTemplateRows;
  if (gridColumn) style.gridColumn = gridColumn;
  if (gridRow) style.gridRow = gridRow;
  
  // Position styles
  if (position) style.position = position;
  if (top) style.top = top;
  if (right) style.right = right;
  if (bottom) style.bottom = bottom;
  if (left) style.left = left;
  if (zIndex) style.zIndex = zIndex;
  
  // Overflow styles
  if (overflow) style.overflow = overflow;
  if (overflowX) style.overflowX = overflowX;
  if (overflowY) style.overflowY = overflowY;
  
  return (
    <Component 
      className={cn(className)} 
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
}