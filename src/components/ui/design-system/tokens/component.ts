/**
 * Component Design Tokens
 * 
 * Specific tokens for individual components.
 * These tokens reference semantic tokens and provide component-specific configurations.
 */

import * as semantic from './semantic';

// =============================================================================
// BUTTON COMPONENT TOKENS
// =============================================================================

export const button = {
  padding: {
    sm: `${semantic.componentSpacing.sm} ${semantic.componentSpacing.md}`, // 8px 12px
    md: `${semantic.componentSpacing.md} ${semantic.componentSpacing.lg}`, // 12px 16px
    lg: `${semantic.componentSpacing.lg} ${semantic.componentSpacing.xl}`, // 16px 24px
  },
  gap: semantic.componentSpacing.sm,
  borderRadius: semantic.borderRadius.medium,
  typography: {
    sm: semantic.uiTypography.button,
    md: semantic.uiTypography.button,
    lg: semantic.bodyTypography.medium,
  },
  elevation: {
    rest: semantic.elevation.none,
    hover: semantic.elevation.subtle,
    active: semantic.interactiveElevation.active,
    focus: semantic.interactiveElevation.focus,
  },
  animation: semantic.animation.interactive,
} as const;

// =============================================================================
// CARD COMPONENT TOKENS
// =============================================================================

export const card = {
  padding: {
    xs: semantic.componentSpacing.sm,   // 8px - very compact
    sm: semantic.componentSpacing.md,   // 12px
    md: semantic.componentSpacing.lg,   // 16px
    lg: semantic.componentSpacing.xl,   // 24px
    xl: semantic.componentSpacing.xxl,  // 32px
  },
  gap: {
    xs: semantic.componentSpacing.xs,   // 4px - very compact
    sm: semantic.componentSpacing.sm,   // 8px
    md: semantic.componentSpacing.md,   // 12px
    lg: semantic.componentSpacing.lg,   // 16px
  },
  borderRadius: semantic.borderRadius.large,
  elevation: {
    rest: semantic.elevation.low,
    hover: semantic.elevation.medium,
  },
  border: semantic.borderWidth.thin,
  animation: semantic.animation.interactive,
} as const;

// =============================================================================
// METRIC CARD COMPONENT TOKENS
// =============================================================================

export const metricCard = {
  padding: semantic.componentSpacing.lg,
  gap: semantic.componentSpacing.sm,
  borderRadius: semantic.borderRadius.medium,
  elevation: semantic.elevation.subtle,
  typography: {
    value: {
      sm: semantic.metricTypography.small,
      md: semantic.metricTypography.medium,
      lg: semantic.metricTypography.large,
    },
    label: semantic.uiTypography.caption,
  },
  animation: semantic.animation.interactive,
} as const;

// =============================================================================
// SECTION HEADER COMPONENT TOKENS
// =============================================================================

export const sectionHeader = {
  marginBottom: semantic.layoutSpacing.md,
  gap: semantic.componentSpacing.sm,
  typography: {
    title: semantic.headingTypography.h4,
    description: semantic.bodyTypography.small,
  },
  spacing: {
    vertical: semantic.layoutSpacing.md,
    horizontal: semantic.componentSpacing.lg,
  },
} as const;

// =============================================================================
// COLLECTION CARD COMPONENT TOKENS
// =============================================================================

export const collectionCard = {
  padding: semantic.componentSpacing.md,
  borderRadius: semantic.borderRadius.medium,
  elevation: semantic.elevation.low,
  gap: {
    section: semantic.componentSpacing.md,    // Between sections
    grid: semantic.componentSpacing.md,       // Grid gap
    button: semantic.componentSpacing.sm,     // Button gap
  },
  typography: {
    title: semantic.headingTypography.h5,
    description: semantic.bodyTypography.small,
    metricValue: semantic.metricTypography.small,
    metricLabel: semantic.uiTypography.caption,
  },
  grid: {
    columns: 3,
    gap: semantic.componentSpacing.md,
  },
  animation: semantic.animation.interactive,
} as const;

// =============================================================================
// INPUT COMPONENT TOKENS
// =============================================================================

export const input = {
  padding: `${semantic.componentSpacing.sm} ${semantic.componentSpacing.md}`, // 8px 12px
  borderRadius: semantic.borderRadius.medium,
  borderWidth: semantic.borderWidth.thin,
  typography: semantic.uiTypography.input,
  gap: semantic.componentSpacing.sm, // For input groups
  animation: semantic.animation.fast,
  elevation: {
    rest: semantic.elevation.none,
    focus: semantic.interactiveElevation.focus,
  },
} as const;

// =============================================================================
// MODAL COMPONENT TOKENS
// =============================================================================

export const modal = {
  padding: semantic.componentSpacing.xl,
  borderRadius: semantic.borderRadius.large,
  elevation: semantic.elevation.highest,
  backdrop: {
    opacity: '0.8',
    animation: semantic.animation.fadeIn,
  },
  content: {
    animation: semantic.animation.scaleIn,
    maxWidth: '32rem', // 512px
  },
  layer: semantic.layer.modal,
} as const;

// =============================================================================
// POPOVER COMPONENT TOKENS
// =============================================================================

export const popover = {
  padding: semantic.componentSpacing.md,
  borderRadius: semantic.borderRadius.medium,
  elevation: semantic.elevation.high,
  borderWidth: semantic.borderWidth.thin,
  animation: {
    enter: semantic.animation.scaleIn,
    exit: semantic.animation.scaleOut,
  },
  layer: semantic.layer.popover,
  arrow: {
    size: semantic.componentSpacing.sm,
  },
} as const;

// =============================================================================
// TOOLTIP COMPONENT TOKENS
// =============================================================================

export const tooltip = {
  padding: `${semantic.componentSpacing.xs} ${semantic.componentSpacing.sm}`, // 4px 8px
  borderRadius: semantic.borderRadius.small,
  typography: semantic.bodyTypography.tiny,
  layer: semantic.layer.tooltip,
  animation: {
    enter: semantic.animation.fadeIn,
    exit: semantic.animation.fadeOut,
  },
  arrow: {
    size: semantic.componentSpacing.xs,
  },
} as const;

// =============================================================================
// TOAST COMPONENT TOKENS
// =============================================================================

export const toast = {
  padding: semantic.componentSpacing.lg,
  borderRadius: semantic.borderRadius.medium,
  elevation: semantic.elevation.high,
  gap: semantic.componentSpacing.md,
  typography: {
    title: semantic.bodyTypography.medium,
    description: semantic.bodyTypography.small,
  },
  layer: semantic.layer.toast,
  animation: {
    enter: semantic.animation.slideIn,
    exit: semantic.animation.slideOut,
  },
  width: {
    min: '20rem', // 320px
    max: '28rem', // 448px
  },
} as const;

// =============================================================================
// PAGINATION COMPONENT TOKENS
// =============================================================================

export const pagination = {
  // Button configurations
  button: {
    size: {
      sm: '2rem',   // 32px - compact for Chrome extension
      md: '2.5rem', // 40px - standard
      lg: '3rem',   // 48px - large
    },
    padding: {
      sm: semantic.componentSpacing.xs,  // 4px
      md: semantic.componentSpacing.sm,  // 8px
      lg: semantic.componentSpacing.md,  // 12px
    },
    gap: {
      sm: semantic.componentSpacing.xs,  // 4px between buttons
      md: semantic.componentSpacing.sm,  // 8px between buttons
      lg: semantic.componentSpacing.md,  // 12px between buttons
    },
  },
  
  // Configuration presets
  presets: {
    // Chrome extension optimized - 3 cards per page
    extensionCompact: {
      itemsPerPage: 3,
      maxVisiblePages: 3,
      showEllipsis: true,
      showInfo: false,
      size: 'sm',
    },
    
    // Standard card view - 5 cards per page
    cardView: {
      itemsPerPage: 5,
      maxVisiblePages: 5,
      showEllipsis: true,
      showInfo: true,
      size: 'md',
    },
    
    // List view - 10 items per page
    listView: {
      itemsPerPage: 10,
      maxVisiblePages: 7,
      showEllipsis: true,
      showInfo: true,
      size: 'sm',
    },
    
    // Minimal pagination - for very limited space
    minimal: {
      itemsPerPage: 3,
      maxVisiblePages: 1, // Only show current page number
      showEllipsis: false,
      showInfo: false,
      size: 'sm',
    },
  },
  
  // Spacing configurations
  spacing: {
    container: semantic.componentSpacing.md,
    info: semantic.componentSpacing.sm,
  },
  
  // Typography
  typography: {
    button: semantic.uiTypography.button,
    info: semantic.bodyTypography.small,
  },
  
  // Visual configurations
  borderRadius: semantic.borderRadius.medium,
  elevation: {
    rest: semantic.elevation.none,
    hover: semantic.elevation.subtle,
  },
  animation: semantic.animation.interactive,
} as const;

// =============================================================================
// NAVIGATION COMPONENT TOKENS
// =============================================================================

export const navigation = {
  padding: semantic.componentSpacing.sm,
  gap: semantic.componentSpacing.xs,
  typography: semantic.uiTypography.button,
  borderRadius: semantic.borderRadius.medium,
  animation: semantic.animation.interactive,
  item: {
    padding: `${semantic.componentSpacing.sm} ${semantic.componentSpacing.md}`,
    borderRadius: semantic.borderRadius.small,
  },
} as const;

// =============================================================================
// TABLE COMPONENT TOKENS
// =============================================================================

export const table = {
  padding: {
    cell: semantic.componentSpacing.md,
    header: semantic.componentSpacing.lg,
  },
  borderWidth: semantic.borderWidth.thin,
  typography: {
    header: semantic.uiTypography.label,
    cell: semantic.bodyTypography.small,
  },
  row: {
    height: {
      sm: '2.5rem', // 40px
      md: '3rem',   // 48px
      lg: '3.5rem', // 56px
    },
  },
  animation: semantic.animation.interactive,
} as const;

// =============================================================================
// FORM COMPONENT TOKENS
// =============================================================================

export const form = {
  gap: {
    field: semantic.layoutSpacing.md,     // Between form fields
    section: semantic.layoutSpacing.lg,   // Between form sections
    group: semantic.componentSpacing.sm,  // Within field groups
  },
  label: {
    typography: semantic.uiTypography.label,
    marginBottom: semantic.componentSpacing.xs,
  },
  error: {
    typography: semantic.bodyTypography.tiny,
    marginTop: semantic.componentSpacing.xs,
  },
  help: {
    typography: semantic.bodyTypography.tiny,
    marginTop: semantic.componentSpacing.xs,
  },
} as const;

// =============================================================================
// LAYOUT COMPONENT TOKENS
// =============================================================================

export const layout = {
  container: {
    padding: semantic.containerSpacing.md,
    maxWidth: '28rem', // 448px - optimized for Chrome extension
  },
  section: {
    gap: semantic.layoutSpacing.lg,
    padding: semantic.layoutSpacing.md,
  },
  stack: {
    gap: {
      sm: semantic.layoutSpacing.sm,
      md: semantic.layoutSpacing.md,
      lg: semantic.layoutSpacing.lg,
    },
  },
  grid: {
    gap: {
      sm: semantic.componentSpacing.sm,
      md: semantic.componentSpacing.md,
      lg: semantic.componentSpacing.lg,
    },
  },
} as const;

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type Button = typeof button;
export type Card = typeof card;
export type MetricCard = typeof metricCard;
export type SectionHeader = typeof sectionHeader;
export type CollectionCard = typeof collectionCard;
export type Input = typeof input;
export type Modal = typeof modal;
export type Popover = typeof popover;
export type Tooltip = typeof tooltip;
export type Toast = typeof toast;
export type Pagination = typeof pagination;
export type Navigation = typeof navigation;
export type Table = typeof table;
export type Form = typeof form;
export type Layout = typeof layout;