/**
 * Woozi Chrome Extension Design System
 * 
 * A comprehensive design system built on top of shadcn/ui with:
 * - Modular design tokens (primitive, semantic, component)
 * - Typography system following shadcn patterns
 * - Layout primitives (Box, Stack, Grid)
 * - Enhanced components with proper variant systems
 * - Chrome extension optimizations
 */

// =============================================================================
// DESIGN TOKENS
// =============================================================================

export * from './tokens';

// =============================================================================
// TYPOGRAPHY SYSTEM
// =============================================================================

export * from './Typography';

// =============================================================================
// LAYOUT PRIMITIVES
// =============================================================================

export * from './Box';
export * from './Stack';
export * from './Grid';

// =============================================================================
// ENHANCED COMPONENTS
// =============================================================================

export * from './ActionButton';
export * from './MetricCard';
export * from './DataPointCard';
export * from './StatusBadge';
export * from './SectionHeader';
export * from './CollectionCard';
export * from './Pagination';
export * from './MetricsTrio';

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

// Typography shortcuts
export {
  Typography,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Text,
  Lead,
  Large,
  Small,
  Muted,
  Caption,
  Label,
  MetricValue,
  InlineCode,
  Kbd,
} from './Typography';

// Layout shortcuts
export {
  Box,
} from './Box';

export {
  Stack,
  VStack,
  HStack,
  Spacer,
  Divider,
  StackWithDividers,
  ResponsiveStack,
  ExtensionStack,
  CompactStack,
} from './Stack';

export {
  Grid,
  GridItem,
  SimpleGrid,
  TwoColumnGrid,
  ThreeColumnGrid,
  FourColumnGrid,
  ExtensionGrid,
  MetricsGrid,
  CardGrid,
} from './Grid';

// Pagination shortcuts
export {
  Pagination,
  PaginationInfo,
  CompactPagination,
  ConfigurablePagination,
  usePagination,
  getPaginationConfig,
} from './Pagination';

// Metrics shortcuts
export {
  MetricsUno,
  MetricsDuo,
  MetricsTrio,
  CompactMetricsUno,
  CompactMetricsDuo,
  CompactMetricsTrio,
  LeadManagementTrio,
  CampaignTrio,
  CollectionOverviewDuo,
  ResponsiveMetrics,
} from './MetricsTrio';

// Button shortcuts
export {
  ActionButton,
  IconButton,
  LoadingButton,
  ConfirmButton,
  SuccessButton,
  WarningButton,
  ButtonGroup,
  ExtensionButton,
  CompactButton,
} from './ActionButton';

// =============================================================================
// DESIGN SYSTEM UTILITIES
// =============================================================================

/**
 * Design system configuration and utilities
 */
export const designSystem = {
  // Version
  version: '1.0.0',
  
  // Chrome extension constraints
  constraints: {
    maxWidth: '28rem', // 448px
    optimizedWidths: ['20rem', '24rem', '28rem'], // 320px, 384px, 448px
  },
  
  // Token access
  tokens: {
    // Quick access to commonly used values
    space: {
      xs: '0.25rem',  // 4px
      sm: '0.5rem',   // 8px  
      md: '0.75rem',  // 12px
      lg: '1rem',     // 16px
      xl: '1.5rem',   // 24px
      xxl: '2rem',    // 32px
    },
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
    },
    borderRadius: {
      sm: '0.125rem',   // 2px
      md: '0.25rem',    // 4px  
      lg: '0.375rem',   // 6px
      xl: '0.5rem',     // 8px
    },
  },
  
  // Component presets
  presets: {
    chromeExtension: {
      button: { size: 'sm', className: 'max-w-full' },
      card: { padding: 'md', borderRadius: 'md' },
      text: { size: 'sm' },
      spacing: { default: 'sm', section: 'md' },
    },
    compact: {
      button: { size: 'xs', className: 'max-w-full' },
      card: { padding: 'sm', borderRadius: 'sm' },
      text: { size: 'xs' },
      spacing: { default: 'xs', section: 'sm' },
    },
  },
  
  // Grid presets
  grids: {
    metrics: { columns: 3, gap: 'sm' },
    cards: { columns: 1, gap: 'md' },
    twoColumn: { columns: 2, gap: 'md' },
    compact: { columns: 2, gap: 'xs' },
  },
  
  // Typography presets
  typography: {
    pageTitle: { variant: 'headingMedium', as: 'h1' },
    sectionTitle: { variant: 'headingSmall', as: 'h2' },
    cardTitle: { variant: 'bodyLarge', as: 'h3' },
    body: { variant: 'bodyMedium' },
    caption: { variant: 'caption' },
    metric: { variant: 'metricSmall' },
  },
} as const;

// =============================================================================
// THEME UTILITIES
// =============================================================================

/**
 * Generate CSS custom properties for design tokens
 */
export { generateCSSCustomProperties } from './tokens';

/**
 * Helper to get responsive values for Chrome extension
 */
export function getExtensionValue<T>(compact: T, regular: T, large?: T): T {
  // For Chrome extension, we typically prefer compact values
  // This could be extended to detect actual extension width
  return compact;
}

/**
 * Helper to create component class combinations
 */
export function createComponentClasses(
  baseClasses: string,
  variantClasses?: string,
  sizeClasses?: string,
  additionalClasses?: string
): string {
  return [baseClasses, variantClasses, sizeClasses, additionalClasses]
    .filter(Boolean)
    .join(' ');
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

// Token types
export type {
  PrimitiveTokens,
  SemanticTokens, 
  ComponentTokens,
  Space,
  Text,
  Radius,
  Shadow,
  Typography as TypographyTokens,
  ChromeExtension,
} from './tokens';

// Component types
export type { TypographyVariant } from './Typography';
export type { ActionButtonProps } from './ActionButton';

// Common types
export type { LucideIcon } from 'lucide-react';

// =============================================================================
// DEVELOPMENT UTILITIES
// =============================================================================

/**
 * Development mode utilities (only available in development)
 */
export const dev = {
  /**
   * Log all design tokens to console
   */
  logTokens: () => {
    if (process.env.NODE_ENV === 'development') {
      import('./tokens/utils').then(({ logAllTokens }) => {
        logAllTokens();
      });
    }
  },
  
  /**
   * Validate design system usage
   */
  validate: {
    spacing: (value: string) => {
      const validSpacing = Object.values(designSystem.tokens.space);
      return validSpacing.includes(value);
    },
    fontSize: (value: string) => {
      const validSizes = Object.values(designSystem.tokens.fontSize);
      return validSizes.includes(value);
    },
  },
} as const;

// =============================================================================
// DESIGN SYSTEM PROVIDER (Future Enhancement)
// =============================================================================

/**
 * Context for design system configuration
 * This can be extended in the future for theme switching, etc.
 */
export interface DesignSystemConfig {
  theme?: 'light' | 'dark' | 'auto';
  density?: 'compact' | 'comfortable' | 'spacious';
  accentColor?: string;
  borderRadius?: 'none' | 'small' | 'medium' | 'large';
}

export const defaultDesignSystemConfig: DesignSystemConfig = {
  theme: 'light',
  density: 'compact', // Default to compact for Chrome extension
  borderRadius: 'medium',
} as const;