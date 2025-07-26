/**
 * Design Tokens Index
 * 
 * Central export point for all design tokens.
 * This provides a clean API for consuming tokens throughout the application.
 */

// Re-export all token modules
export * as primitive from './primitive';
export * as semantic from './semantic';
export * as component from './component';
export * as spacing from './spacing';
export * from './utils';

// Export commonly used tokens for convenience
export {
  spacing as primitiveSpacing,
  fontSize,
  fontWeight,
  lineHeight,
  borderRadius,
  boxShadow,
  duration,
  easing,
} from './primitive';

// Export spacing utilities
export {
  componentPadding,
  componentGap,
  layoutSpacing as spacingLayoutSpacing,
  extensionSpacing,
  paddingClasses,
  marginClasses,
  gapClasses,
  spaceYClasses,
  spaceXClasses,
  extensionPatterns,
  responsiveSpacing,
  getSpacingValue,
  getPaddingClass,
  getMarginClass,
  getGapClass,
  getSpaceYClass,
  getSpaceXClass,
  getComponentPadding,
  getComponentGap,
  getLayoutSpacing,
  getExtensionSpacing,
} from './spacing';

export {
  componentSpacing,
  layoutSpacing,
  headingTypography,
  bodyTypography,
  metricTypography,
  elevation,
  borderRadius as semanticBorderRadius,
  animation,
} from './semantic';

export {
  button,
  card,
  metricCard,
  collectionCard,
  input,
  modal,
  pagination,
  layout,
} from './component';

// Export utility functions for easy access
export {
  generateCSSCustomProperties,
  getTypographyClasses,
  getSpacingClass,
  getBorderRadiusClass,
  getComponentToken,
  getSemanticToken,
  getPrimitiveToken,
  buildComponentStyles,
  getResponsiveSpacing,
  getResponsiveTypography,
  validateSpacingValue,
  validateChromeExtensionSpacing,
  logSpacingValidation,
} from './utils';

// =============================================================================
// QUICK ACCESS TOKENS
// =============================================================================

/**
 * Quick access to commonly used spacing values
 */
export const space = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '0.75rem',  // 12px
  lg: '1rem',     // 16px
  xl: '1.5rem',   // 24px
  xxl: '2rem',    // 32px
} as const;

/**
 * Quick access to commonly used typography scales
 */
export const text = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
} as const;

/**
 * Quick access to commonly used border radius values
 */
export const radius = {
  sm: '0.125rem',   // 2px
  md: '0.25rem',    // 4px
  lg: '0.375rem',   // 6px
  xl: '0.5rem',     // 8px
} as const;

/**
 * Quick access to commonly used shadow values
 */
export const shadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  lg: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
} as const;

// =============================================================================
// TOKEN PRESETS
// =============================================================================

/**
 * Common component size presets
 */
export const sizes = {
  button: {
    sm: { padding: space.sm, fontSize: text.sm },
    md: { padding: space.md, fontSize: text.base },
    lg: { padding: space.lg, fontSize: text.lg },
  },
  input: {
    sm: { padding: space.sm, fontSize: text.sm },
    md: { padding: space.md, fontSize: text.base },
    lg: { padding: space.lg, fontSize: text.lg },
  },
  card: {
    sm: { padding: space.md },
    md: { padding: space.lg },
    lg: { padding: space.xl },
  },
} as const;

/**
 * Typography presets for common use cases
 */
export const typography = {
  heading: {
    h1: { fontSize: text['3xl'], fontWeight: '800', lineHeight: '1.2' },
    h2: { fontSize: text['2xl'], fontWeight: '700', lineHeight: '1.3' },
    h3: { fontSize: text.xl, fontWeight: '600', lineHeight: '1.4' },
    h4: { fontSize: text.lg, fontWeight: '600', lineHeight: '1.5' },
  },
  body: {
    large: { fontSize: text.lg, fontWeight: '400', lineHeight: '1.7' },
    medium: { fontSize: text.base, fontWeight: '400', lineHeight: '1.6' },
    small: { fontSize: text.sm, fontWeight: '400', lineHeight: '1.5' },
  },
  ui: {
    button: { fontSize: text.sm, fontWeight: '500', lineHeight: '1.4' },
    label: { fontSize: text.sm, fontWeight: '500', lineHeight: '1.4' },
    caption: { fontSize: text.xs, fontWeight: '500', lineHeight: '1.3' },
  },
} as const;

// =============================================================================
// CHROME EXTENSION SPECIFIC TOKENS
// =============================================================================

/**
 * Chrome extension specific constraints and optimizations
 */
export const chromeExtension = {
  // Maximum width for optimal display in side panel
  maxWidth: '28rem', // 448px
  
  // Hierarchical spacing system following 4px grid
  spacing: {
    // Page level spacing (between major sections)
    page: {
      container: space.lg,    // 16px - page padding
      section: space.lg,      // 16px - between major sections (metrics → CTA → cards)
      bottom: space.lg,       // 16px - bottom margin for pagination
    },
    
    // Layout level spacing (between components)
    layout: {
      component: space.md,    // 12px - between cards in list
      group: space.sm,        // 8px - between related elements
      tight: space.xs,        // 4px - minimal spacing
    },
    
    // Component level spacing (internal to components)
    component: {
      card: {
        padding: space.md,    // 12px - card internal padding
        gap: space.sm,        // 8px - between card sections
        metric: space.xs,     // 4px - between metric elements
      },
      button: {
        group: space.sm,      // 8px - between buttons
        internal: space.xs,   // 4px - icon to text gap
      },
      metrics: {
        trio: space.sm,       // 8px - between metric cards
        internal: space.xs,   // 4px - within metric cards
      },
    },
  },
  
  // Legacy compact spacing for backward compatibility
  compactSpacing: {
    xs: space.xs,
    sm: space.sm,
    md: space.md,
  },
  
  // Optimized typography for readability in small spaces
  compactTypography: {
    title: typography.heading.h4,
    subtitle: typography.body.medium,
    body: typography.body.small,
    caption: typography.ui.caption,
  },
  
  // Grid systems optimized for extension width
  grid: {
    twoColumn: { columns: 2, gap: space.md },
    threeColumn: { columns: 3, gap: space.sm },
  },
  
  // Component sizes optimized for extension
  components: {
    button: { height: '2rem', padding: `${space.sm} ${space.md}` },
    input: { height: '2.25rem', padding: space.sm },
    card: { padding: space.md, borderRadius: radius.md },
  },
  
  // Pagination optimized for Chrome extension
  pagination: {
    itemsPerPage: 3,        // Show only 3 cards for better UX
    maxVisiblePages: 3,     // Compact pagination: < 1 2 ... >
    showEllipsis: true,     // Show ... for better navigation context
    showInfo: false,        // Hide "Showing X-Y of Z" to save space
    size: 'sm',            // Small buttons for compact layout
    buttonHeight: '2rem',   // 32px - consistent with other extension buttons
    gap: space.xs,         // 4px gap between pagination buttons
    margin: space.lg,      // 16px margin from content above
  },

  // Standardized component sizes for Chrome extension
  sizes: {
    button: {
      primary: 'h-10',      // 40px - main CTAs (default size)
      secondary: 'h-8',     // 32px - secondary actions
      compact: 'h-7',       // 28px - small buttons
    },
    icon: {
      primary: 'h-5 w-5',   // 20px - main icons (logos, primary actions)
      secondary: 'h-4 w-4', // 16px - standard UI icons
      small: 'h-3.5 w-3.5', // 14px - minimal icons in cards
      display: 'h-6 w-6',   // 24px - feature illustration icons
    },
    navigation: {
      height: 'h-12',       // 48px - bottom navigation tabs
      icon: 'h-4 w-4',      // 16px - navigation icons
    },
    card: {
      actionIcon: 'h-4 w-4', // 16px - action icons in cards
      displayIcon: 'h-6 w-6', // 24px - main card icons
    }
  },
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type Space = typeof space;
export type Text = typeof text;
export type Radius = typeof radius;
export type Shadow = typeof shadow;
export type Sizes = typeof sizes;
export type Typography = typeof typography;
export type ChromeExtension = typeof chromeExtension;