import React from 'react';
import { cn } from '../../../lib/utils';
import { Box } from './Box';
import { space } from './tokens';

// =============================================================================
// GRID COMPONENT
// =============================================================================

/**
 * Grid is a layout component that creates CSS Grid layouts with consistent spacing.
 * It's built on top of Box and provides convenient props for common grid patterns.
 */

interface GridProps {
  children: React.ReactNode;
  
  // Grid structure
  columns?: number | string;
  rows?: number | string;
  gap?: keyof typeof space | string;
  columnGap?: keyof typeof space | string;
  rowGap?: keyof typeof space | string;
  
  // Grid template areas
  areas?: string[];
  
  // Auto sizing
  autoColumns?: string;
  autoRows?: string;
  autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
  
  // Alignment
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  alignContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly';
  justifyContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around' | 'evenly';
  
  // Responsive
  responsive?: boolean;
  minColumnWidth?: string;
  
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

export function Grid({
  children,
  columns,
  rows,
  gap = 'md',
  columnGap,
  rowGap,
  areas,
  autoColumns,
  autoRows,
  autoFlow,
  alignItems,
  justifyItems,
  alignContent,
  justifyContent,
  responsive = false,
  minColumnWidth = '200px',
  className,
  as = 'div',
  ...boxProps
}: GridProps & React.HTMLAttributes<HTMLElement>) {
  // Build grid template columns
  let gridTemplateColumns: string | undefined;
  if (responsive && columns) {
    // Create responsive grid with minmax
    gridTemplateColumns = `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;
  } else if (typeof columns === 'number') {
    gridTemplateColumns = `repeat(${columns}, 1fr)`;
  } else if (typeof columns === 'string') {
    gridTemplateColumns = columns;
  }
  
  // Build grid template rows
  let gridTemplateRows: string | undefined;
  if (typeof rows === 'number') {
    gridTemplateRows = `repeat(${rows}, 1fr)`;
  } else if (typeof rows === 'string') {
    gridTemplateRows = rows;
  }
  
  // Build grid template areas
  const gridTemplateAreas = areas ? areas.map(area => `"${area}"`).join(' ') : undefined;
  
  // Build style object
  const gridStyle: React.CSSProperties = {};
  
  if (gridTemplateColumns) gridStyle.gridTemplateColumns = gridTemplateColumns;
  if (gridTemplateRows) gridStyle.gridTemplateRows = gridTemplateRows;
  if (gridTemplateAreas) gridStyle.gridTemplateAreas = gridTemplateAreas;
  if (autoColumns) gridStyle.gridAutoColumns = autoColumns;
  if (autoRows) gridStyle.gridAutoRows = autoRows;
  if (autoFlow) gridStyle.gridAutoFlow = autoFlow;
  
  // Gap styles
  if (gap) {
    const gapValue = space[gap as keyof typeof space] || gap;
    gridStyle.gap = gapValue;
  }
  if (columnGap) {
    const gapValue = space[columnGap as keyof typeof space] || columnGap;
    gridStyle.columnGap = gapValue;
  }
  if (rowGap) {
    const gapValue = space[rowGap as keyof typeof space] || rowGap;
    gridStyle.rowGap = gapValue;
  }
  
  // Alignment styles
  if (alignItems) {
    gridStyle.alignItems = alignItems === 'start' ? 'start' : alignItems === 'end' ? 'end' : alignItems;
  }
  if (justifyItems) {
    gridStyle.justifyItems = justifyItems === 'start' ? 'start' : justifyItems === 'end' ? 'end' : justifyItems;
  }
  if (alignContent) {
    const alignMap = {
      start: 'start',
      end: 'end',
      center: 'center',
      stretch: 'stretch',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    gridStyle.alignContent = alignMap[alignContent];
  }
  if (justifyContent) {
    const justifyMap = {
      start: 'start',
      end: 'end',
      center: 'center',
      stretch: 'stretch',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    gridStyle.justifyContent = justifyMap[justifyContent];
  }
  
  return (
    <Box
      as={as}
      display="grid"
      className={cn(className)}
      style={gridStyle}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

// =============================================================================
// GRID ITEM COMPONENT
// =============================================================================

/**
 * GridItem - Individual grid item with positioning props
 */
interface GridItemProps {
  children: React.ReactNode;
  
  // Grid positioning
  column?: string | number;
  row?: string | number;
  columnSpan?: number;
  rowSpan?: number;
  area?: string;
  
  // Item alignment
  alignSelf?: 'auto' | 'start' | 'center' | 'end' | 'stretch';
  justifySelf?: 'auto' | 'start' | 'center' | 'end' | 'stretch';
  
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  
  // Pass through Box props
  p?: keyof typeof space | string;
  px?: keyof typeof space | string;
  py?: keyof typeof space | string;
  bg?: string;
  borderRadius?: string;
  shadow?: string;
}

export function GridItem({
  children,
  column,
  row,
  columnSpan,
  rowSpan,
  area,
  alignSelf,
  justifySelf,
  className,
  as = 'div',
  ...boxProps
}: GridItemProps & React.HTMLAttributes<HTMLElement>) {
  const gridStyle: React.CSSProperties = {};
  
  // Grid positioning
  if (column) {
    if (typeof column === 'number') {
      gridStyle.gridColumn = columnSpan ? `${column} / span ${columnSpan}` : column.toString();
    } else {
      gridStyle.gridColumn = column;
    }
  } else if (columnSpan) {
    gridStyle.gridColumn = `span ${columnSpan}`;
  }
  
  if (row) {
    if (typeof row === 'number') {
      gridStyle.gridRow = rowSpan ? `${row} / span ${rowSpan}` : row.toString();
    } else {
      gridStyle.gridRow = row;
    }
  } else if (rowSpan) {
    gridStyle.gridRow = `span ${rowSpan}`;
  }
  
  if (area) {
    gridStyle.gridArea = area;
  }
  
  // Alignment
  if (alignSelf) {
    gridStyle.alignSelf = alignSelf === 'start' ? 'start' : alignSelf === 'end' ? 'end' : alignSelf;
  }
  if (justifySelf) {
    gridStyle.justifySelf = justifySelf === 'start' ? 'start' : justifySelf === 'end' ? 'end' : justifySelf;
  }
  
  return (
    <Box
      as={as}
      className={cn(className)}
      style={gridStyle}
      {...boxProps}
    >
      {children}
    </Box>
  );
}

// =============================================================================
// PRESET GRID COMPONENTS
// =============================================================================

/**
 * SimpleGrid - Auto-responsive grid with equal columns
 */
interface SimpleGridProps extends Omit<GridProps, 'columns' | 'responsive'> {
  columns?: number;
  minChildWidth?: string;
}

export function SimpleGrid({
  columns = 1,
  minChildWidth = '200px',
  ...gridProps
}: SimpleGridProps) {
  return (
    <Grid
      columns={columns}
      responsive={true}
      minColumnWidth={minChildWidth}
      {...gridProps}
    />
  );
}

/**
 * TwoColumnGrid - Simple two-column layout
 */
export function TwoColumnGrid(props: Omit<GridProps, 'columns'>) {
  return <Grid columns={2} {...props} />;
}

/**
 * ThreeColumnGrid - Simple three-column layout
 */
export function ThreeColumnGrid(props: Omit<GridProps, 'columns'>) {
  return <Grid columns={3} {...props} />;
}

/**
 * FourColumnGrid - Simple four-column layout
 */
export function FourColumnGrid(props: Omit<GridProps, 'columns'>) {
  return <Grid columns={4} {...props} />;
}

// =============================================================================
// CHROME EXTENSION OPTIMIZED GRIDS
// =============================================================================

/**
 * ExtensionGrid - Grid optimized for Chrome extension constraints
 */
interface ExtensionGridProps extends GridProps {
  variant?: 'metrics' | 'cards' | 'compact';
}

export function ExtensionGrid({
  variant = 'cards',
  className,
  ...gridProps
}: ExtensionGridProps) {
  const variantProps = {
    metrics: {
      columns: 3,
      gap: 'sm' as keyof typeof space,
      responsive: false,
    },
    cards: {
      columns: 1,
      gap: 'md' as keyof typeof space,
      responsive: false,
    },
    compact: {
      columns: 2,
      gap: 'xs' as keyof typeof space,
      responsive: false,
    },
  };
  
  return (
    <Grid
      maxWidth="28rem" // Chrome extension optimal width
      className={cn('w-full', className)}
      {...variantProps[variant]}
      {...gridProps}
    />
  );
}

/**
 * MetricsGrid - Specialized grid for displaying metrics (3 columns)
 */
export function MetricsGrid(props: Omit<GridProps, 'columns'>) {
  return (
    <ExtensionGrid
      variant="metrics"
      columns={3}
      gap="sm"
      {...props}
    />
  );
}

/**
 * CardGrid - Specialized grid for displaying cards (single column)
 */
export function CardGrid(props: Omit<GridProps, 'columns'>) {
  return (
    <ExtensionGrid
      variant="cards"
      columns={1}
      gap="md"
      {...props}
    />
  );
}