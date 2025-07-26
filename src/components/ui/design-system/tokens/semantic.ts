/**
 * Semantic Design Tokens
 * 
 * These tokens have meaning and context.
 * They reference primitive tokens but add semantic intent.
 */

import * as primitive from './primitive';

// =============================================================================
// SPACING SEMANTIC TOKENS
// =============================================================================

/**
 * Component spacing tokens
 * Used for internal component spacing (padding, gaps)
 */
export const componentSpacing = {
  xs: primitive.spacing[1],  // 4px
  sm: primitive.spacing[2],  // 8px
  md: primitive.spacing[3],  // 12px
  lg: primitive.spacing[4],  // 16px
  xl: primitive.spacing[6],  // 24px
  xxl: primitive.spacing[8], // 32px
} as const;

/**
 * Layout spacing tokens
 * Used for spacing between components and sections
 */
export const layoutSpacing = {
  xs: primitive.spacing[2],   // 8px
  sm: primitive.spacing[3],   // 12px
  md: primitive.spacing[4],   // 16px
  lg: primitive.spacing[6],   // 24px
  xl: primitive.spacing[8],   // 32px
  xxl: primitive.spacing[12], // 48px
} as const;

/**
 * Container spacing tokens
 * Used for page and section containers
 */
export const containerSpacing = {
  sm: primitive.spacing[4],  // 16px
  md: primitive.spacing[6],  // 24px
  lg: primitive.spacing[8],  // 32px
  xl: primitive.spacing[12], // 48px
} as const;

// =============================================================================
// TYPOGRAPHY SEMANTIC TOKENS
// =============================================================================

/**
 * Heading typography tokens
 * Semantic heading sizes with consistent hierarchy
 */
export const headingTypography = {
  h1: {
    fontSize: primitive.fontSize['4xl'],
    fontWeight: primitive.fontWeight.extrabold,
    lineHeight: primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.tight,
  },
  h2: {
    fontSize: primitive.fontSize['3xl'],
    fontWeight: primitive.fontWeight.bold,
    lineHeight: primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.tight,
  },
  h3: {
    fontSize: primitive.fontSize['2xl'],
    fontWeight: primitive.fontWeight.semibold,
    lineHeight: primitive.lineHeight.tight,
    letterSpacing: primitive.letterSpacing.normal,
  },
  h4: {
    fontSize: primitive.fontSize.xl,
    fontWeight: primitive.fontWeight.semibold,
    lineHeight: primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
  },
  h5: {
    fontSize: primitive.fontSize.lg,
    fontWeight: primitive.fontWeight.semibold,
    lineHeight: primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
  },
  h6: {
    fontSize: primitive.fontSize.base,
    fontWeight: primitive.fontWeight.semibold,
    lineHeight: primitive.lineHeight.normal,
    letterSpacing: primitive.letterSpacing.normal,
  },
} as const;

/**
 * Body text typography tokens
 */
export const bodyTypography = {
  large: {
    fontSize: primitive.fontSize.lg,
    fontWeight: primitive.fontWeight.normal,
    lineHeight: primitive.lineHeight.relaxed,
  },
  medium: {
    fontSize: primitive.fontSize.base,
    fontWeight: primitive.fontWeight.normal,
    lineHeight: primitive.lineHeight.normal,
  },
  small: {
    fontSize: primitive.fontSize.sm,
    fontWeight: primitive.fontWeight.normal,
    lineHeight: primitive.lineHeight.normal,
  },
  tiny: {
    fontSize: primitive.fontSize.xs,
    fontWeight: primitive.fontWeight.normal,
    lineHeight: primitive.lineHeight.normal,
  },
} as const;

/**
 * UI element typography tokens
 */
export const uiTypography = {
  label: {
    fontSize: primitive.fontSize.sm,
    fontWeight: primitive.fontWeight.medium,
    lineHeight: primitive.lineHeight.normal,
  },
  caption: {
    fontSize: primitive.fontSize.xs,
    fontWeight: primitive.fontWeight.medium,
    lineHeight: primitive.lineHeight.normal,
  },
  button: {
    fontSize: primitive.fontSize.sm,
    fontWeight: primitive.fontWeight.medium,
    lineHeight: primitive.lineHeight.normal,
  },
  input: {
    fontSize: primitive.fontSize.sm,
    fontWeight: primitive.fontWeight.normal,
    lineHeight: primitive.lineHeight.normal,
  },
} as const;

/**
 * Metric display typography tokens
 */
export const metricTypography = {
  hero: {
    fontSize: primitive.fontSize['5xl'],
    fontWeight: primitive.fontWeight.bold,
    lineHeight: primitive.lineHeight.tight,
  },
  large: {
    fontSize: primitive.fontSize['3xl'],
    fontWeight: primitive.fontWeight.bold,
    lineHeight: primitive.lineHeight.tight,
  },
  medium: {
    fontSize: primitive.fontSize['2xl'],
    fontWeight: primitive.fontWeight.bold,
    lineHeight: primitive.lineHeight.tight,
  },
  small: {
    fontSize: primitive.fontSize.lg,
    fontWeight: primitive.fontWeight.bold,
    lineHeight: primitive.lineHeight.tight,
  },
} as const;

// =============================================================================
// ELEVATION SEMANTIC TOKENS
// =============================================================================

/**
 * Elevation levels for creating depth hierarchy
 */
export const elevation = {
  none: primitive.boxShadow.none,
  subtle: primitive.boxShadow.sm,
  low: primitive.boxShadow.default,
  medium: primitive.boxShadow.md,
  high: primitive.boxShadow.lg,
  highest: primitive.boxShadow.xl,
} as const;

/**
 * Interactive state elevations
 */
export const interactiveElevation = {
  rest: elevation.low,
  hover: elevation.medium,
  active: primitive.insetShadow.default,
  focus: '0 0 0 2px rgb(59 130 246 / 0.5)', // Focus ring
} as const;

// =============================================================================
// BORDER SEMANTIC TOKENS
// =============================================================================

/**
 * Border radius for different component types
 */
export const borderRadius = {
  none: primitive.borderRadius.none,
  small: primitive.borderRadius.sm,
  medium: primitive.borderRadius.default,
  large: primitive.borderRadius.md,
  pill: primitive.borderRadius.full,
} as const;

/**
 * Border width for different contexts
 */
export const borderWidth = {
  none: primitive.borderWidth[0],
  thin: primitive.borderWidth.default,
  thick: primitive.borderWidth[2],
} as const;

// =============================================================================
// ANIMATION SEMANTIC TOKENS
// =============================================================================

/**
 * Animation durations for different interaction types
 */
export const animationDuration = {
  instant: primitive.duration[75],
  fast: primitive.duration[150],
  normal: primitive.duration[200],
  slow: primitive.duration[300],
  slower: primitive.duration[500],
} as const;

/**
 * Animation easings for different contexts
 */
export const animationEasing = {
  linear: primitive.easing.linear,
  enter: primitive.easing.out,
  exit: primitive.easing.in,
  interactive: primitive.easing.inOut,
} as const;

/**
 * Common animation configurations
 */
export const animation = {
  fadeIn: `opacity ${animationDuration.normal} ${animationEasing.enter}`,
  fadeOut: `opacity ${animationDuration.fast} ${animationEasing.exit}`,
  slideIn: `transform ${animationDuration.normal} ${animationEasing.enter}`,
  slideOut: `transform ${animationDuration.fast} ${animationEasing.exit}`,
  scaleIn: `transform ${animationDuration.fast} ${animationEasing.enter}`,
  scaleOut: `transform ${animationDuration.fast} ${animationEasing.exit}`,
  interactive: `all ${animationDuration.fast} ${animationEasing.interactive}`,
} as const;

// =============================================================================
// LAYERING SEMANTIC TOKENS
// =============================================================================

/**
 * Z-index values for different UI layers
 */
export const layer = {
  base: primitive.zIndex.base,
  raised: primitive.zIndex.docked,
  overlay: primitive.zIndex.overlay,
  modal: primitive.zIndex.modal,
  popover: primitive.zIndex.popover,
  tooltip: primitive.zIndex.tooltip,
  toast: primitive.zIndex.toast,
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type ComponentSpacing = typeof componentSpacing;
export type LayoutSpacing = typeof layoutSpacing;
export type ContainerSpacing = typeof containerSpacing;
export type HeadingTypography = typeof headingTypography;
export type BodyTypography = typeof bodyTypography;
export type UITypography = typeof uiTypography;
export type MetricTypography = typeof metricTypography;
export type Elevation = typeof elevation;
export type InteractiveElevation = typeof interactiveElevation;
export type BorderRadius = typeof borderRadius;
export type BorderWidth = typeof borderWidth;
export type AnimationDuration = typeof animationDuration;
export type AnimationEasing = typeof animationEasing;
export type Animation = typeof animation;
export type Layer = typeof layer;