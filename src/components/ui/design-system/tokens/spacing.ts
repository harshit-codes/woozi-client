/**
 * Standardized Spacing System
 * 
 * Comprehensive spacing tokens that map to Tailwind CSS classes
 * and provide consistent spacing throughout the application
 */

import * as primitive from './primitive';

// =============================================================================
// SPACING TOKEN MAPPINGS
// =============================================================================

/**
 * Direct mapping of design tokens to Tailwind spacing classes
 * This ensures consistent spacing across all components
 */

// Base spacing scale (maps to Tailwind spacing)
export const spacing = {
  0: '0',           // 0px
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
} as const;

// =============================================================================
// SEMANTIC SPACING SCALES
// =============================================================================

/**
 * Semantic spacing tokens for specific use cases
 */

// Component internal spacing (padding)
export const componentPadding = {
  none: spacing[0],      // 0px
  xs: spacing[1],        // 4px
  sm: spacing[2],        // 8px
  md: spacing[3],        // 12px
  lg: spacing[4],        // 16px
  xl: spacing[6],        // 24px
  xxl: spacing[8],       // 32px
} as const;

// Component spacing between elements (gaps, margins)
export const componentGap = {
  none: spacing[0],      // 0px
  xs: spacing[1],        // 4px
  sm: spacing[2],        // 8px
  md: spacing[3],        // 12px
  lg: spacing[4],        // 16px
  xl: spacing[6],        // 24px
  xxl: spacing[8],       // 32px
} as const;

// Layout spacing (sections, containers)
export const layoutSpacing = {
  none: spacing[0],      // 0px
  xs: spacing[2],        // 8px
  sm: spacing[3],        // 12px
  md: spacing[4],        // 16px
  lg: spacing[6],        // 24px
  xl: spacing[8],        // 32px
  xxl: spacing[12],      // 48px
  xxxl: spacing[16],     // 64px
} as const;

// Chrome extension specific spacing (optimized for constraints)
export const extensionSpacing = {
  none: spacing[0],      // 0px
  xs: spacing[1],        // 4px
  sm: spacing[2],        // 8px
  md: spacing[2.5],      // 10px
  lg: spacing[3],        // 12px
  xl: spacing[4],        // 16px
} as const;

// =============================================================================
// TAILWIND CLASS MAPPINGS
// =============================================================================

/**
 * Maps spacing tokens to Tailwind CSS classes
 * This provides a bridge between design tokens and Tailwind utilities
 */

// Padding classes
export const paddingClasses = {
  none: 'p-0',
  0.5: 'p-0.5',
  1: 'p-1',
  1.5: 'p-1.5',
  2: 'p-2',
  2.5: 'p-2.5',
  3: 'p-3',
  3.5: 'p-3.5',
  4: 'p-4',
  5: 'p-5',
  6: 'p-6',
  7: 'p-7',
  8: 'p-8',
} as const;

// Margin classes
export const marginClasses = {
  none: 'm-0',
  0.5: 'm-0.5',
  1: 'm-1',
  1.5: 'm-1.5',
  2: 'm-2',
  2.5: 'm-2.5',
  3: 'm-3',
  3.5: 'm-3.5',
  4: 'm-4',
  5: 'm-5',
  6: 'm-6',
  7: 'm-7',
  8: 'm-8',
} as const;

// Gap classes
export const gapClasses = {
  none: 'gap-0',
  0.5: 'gap-0.5',
  1: 'gap-1',
  1.5: 'gap-1.5',
  2: 'gap-2',
  2.5: 'gap-2.5',
  3: 'gap-3',
  3.5: 'gap-3.5',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
} as const;

// Space-y classes (vertical spacing)
export const spaceYClasses = {
  none: 'space-y-0',
  0.5: 'space-y-0.5',
  1: 'space-y-1',
  1.5: 'space-y-1.5',
  2: 'space-y-2',
  2.5: 'space-y-2.5',
  3: 'space-y-3',
  3.5: 'space-y-3.5',
  4: 'space-y-4',
  5: 'space-y-5',
  6: 'space-y-6',
  7: 'space-y-7',
  8: 'space-y-8',
} as const;

// Space-x classes (horizontal spacing)
export const spaceXClasses = {
  none: 'space-x-0',
  0.5: 'space-x-0.5',
  1: 'space-x-1',
  1.5: 'space-x-1.5',
  2: 'space-x-2',
  2.5: 'space-x-2.5',
  3: 'space-x-3',
  3.5: 'space-x-3.5',
  4: 'space-x-4',
  5: 'space-x-5',
  6: 'space-x-6',
  7: 'space-x-7',
  8: 'space-x-8',
} as const;

// =============================================================================
// SPACING UTILITIES
// =============================================================================

/**
 * Utility functions for working with spacing tokens
 */

// Get spacing value from token key
export function getSpacingValue(key: keyof typeof spacing): string {
  return spacing[key];
}

// Get Tailwind class for spacing
export function getPaddingClass(key: keyof typeof paddingClasses): string {
  return paddingClasses[key];
}

export function getMarginClass(key: keyof typeof marginClasses): string {
  return marginClasses[key];
}

export function getGapClass(key: keyof typeof gapClasses): string {
  return gapClasses[key];
}

export function getSpaceYClass(key: keyof typeof spaceYClasses): string {
  return spaceYClasses[key];
}

export function getSpaceXClass(key: keyof typeof spaceXClasses): string {
  return spaceXClasses[key];
}

// Get semantic spacing value
export function getComponentPadding(key: keyof typeof componentPadding): string {
  return componentPadding[key];
}

export function getComponentGap(key: keyof typeof componentGap): string {
  return componentGap[key];
}

export function getLayoutSpacing(key: keyof typeof layoutSpacing): string {
  return layoutSpacing[key];
}

export function getExtensionSpacing(key: keyof typeof extensionSpacing): string {
  return extensionSpacing[key];
}

// =============================================================================
// CHROME EXTENSION SPACING PRESETS
// =============================================================================

/**
 * Pre-configured spacing for common Chrome extension patterns
 */

export const extensionPatterns = {
  // Page container
  pageContainer: {
    padding: getPaddingClass(4),      // p-4
    spacing: getSpaceYClass(3),       // space-y-3
  },
  
  // Card content
  cardContent: {
    padding: getPaddingClass(3),      // p-3
    spacing: getSpaceYClass(2),       // space-y-2
  },
  
  // Compact card content
  compactCard: {
    padding: getPaddingClass(2.5),    // p-2.5
    spacing: getSpaceYClass(2),       // space-y-2
  },
  
  // Button groups
  buttonGroup: {
    gap: getGapClass(2),              // gap-2
  },
  
  // Metrics grid
  metricsGrid: {
    gap: getGapClass(2),              // gap-2 (sm)
  },
  
  // Form elements
  formElement: {
    spacing: getSpaceYClass(4),       // space-y-4
  },
  
  // Section spacing
  section: {
    spacing: getSpaceYClass(6),       // space-y-6
  },
} as const;

// =============================================================================
// RESPONSIVE SPACING
// =============================================================================

/**
 * Responsive spacing utilities for different screen sizes
 */

export const responsiveSpacing = {
  // Mobile-first spacing (Chrome extension default)
  mobile: {
    container: extensionSpacing.md,   // 10px
    section: extensionSpacing.sm,     // 8px
    component: extensionSpacing.xs,   // 4px
  },
  
  // Desktop spacing (if extension is ever used in larger contexts)
  desktop: {
    container: layoutSpacing.lg,      // 24px
    section: layoutSpacing.md,        // 16px
    component: componentGap.sm,       // 8px
  },
} as const;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type SpacingKey = keyof typeof spacing;
export type ComponentPaddingKey = keyof typeof componentPadding;
export type ComponentGapKey = keyof typeof componentGap;
export type LayoutSpacingKey = keyof typeof layoutSpacing;
export type ExtensionSpacingKey = keyof typeof extensionSpacing;
export type PaddingClassKey = keyof typeof paddingClasses;
export type MarginClassKey = keyof typeof marginClasses;
export type GapClassKey = keyof typeof gapClasses;
export type SpaceYClassKey = keyof typeof spaceYClasses;
export type SpaceXClassKey = keyof typeof spaceXClasses;