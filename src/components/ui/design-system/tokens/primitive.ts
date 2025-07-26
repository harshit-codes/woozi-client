/**
 * Primitive Design Tokens
 * 
 * Base values that don't have semantic meaning.
 * These are the raw values that semantic tokens reference.
 */

// =============================================================================
// SPACING PRIMITIVE TOKENS
// =============================================================================

/**
 * Base spacing scale using 4px as the base unit
 * Following the 8px grid system but with 4px granularity
 */
export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem',  // 8px
  3: '0.75rem', // 12px
  4: '1rem',    // 16px
  5: '1.25rem', // 20px
  6: '1.5rem',  // 24px
  8: '2rem',    // 32px
  10: '2.5rem', // 40px
  12: '3rem',   // 48px
  16: '4rem',   // 64px
  20: '5rem',   // 80px
  24: '6rem',   // 96px
} as const;

// =============================================================================
// TYPOGRAPHY PRIMITIVE TOKENS
// =============================================================================

/**
 * Font size scale following a modular scale approach
 * Base size is 16px (1rem) with ratios for scaling
 */
export const fontSize = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
} as const;

/**
 * Font weight values
 * Using numeric values for better control
 */
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

/**
 * Line height values
 * Relative values that work well with different font sizes
 */
export const lineHeight = {
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.75',
  loose: '2',
} as const;

/**
 * Letter spacing values
 * Useful for headings and emphasis
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// =============================================================================
// BORDER PRIMITIVE TOKENS
// =============================================================================

/**
 * Border radius values
 * From sharp to fully rounded
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  default: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

/**
 * Border width values
 */
export const borderWidth = {
  0: '0',
  default: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

// =============================================================================
// SHADOW PRIMITIVE TOKENS
// =============================================================================

/**
 * Box shadow values
 * From subtle to dramatic elevation
 */
export const boxShadow = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
} as const;

/**
 * Inset shadows for pressed states
 */
export const insetShadow = {
  sm: 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
  default: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
} as const;

// =============================================================================
// ANIMATION PRIMITIVE TOKENS
// =============================================================================

/**
 * Animation duration values
 * For consistent timing across interactions
 */
export const duration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

/**
 * Animation easing functions
 * For natural motion
 */
export const easing = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// =============================================================================
// Z-INDEX PRIMITIVE TOKENS
// =============================================================================

/**
 * Z-index scale for layering
 * Semantic naming for better understanding
 */
export const zIndex = {
  auto: 'auto',
  base: '0',
  docked: '10',
  dropdown: '1000',
  sticky: '1100',
  banner: '1200',
  overlay: '1300',
  modal: '1400',
  popover: '1500',
  skipLink: '1600',
  toast: '1700',
  tooltip: '1800',
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type SpacingScale = typeof spacing;
export type FontSizeScale = typeof fontSize;
export type FontWeightScale = typeof fontWeight;
export type LineHeightScale = typeof lineHeight;
export type LetterSpacingScale = typeof letterSpacing;
export type BorderRadiusScale = typeof borderRadius;
export type BorderWidthScale = typeof borderWidth;
export type BoxShadowScale = typeof boxShadow;
export type InsetShadowScale = typeof insetShadow;
export type DurationScale = typeof duration;
export type EasingScale = typeof easing;
export type ZIndexScale = typeof zIndex;