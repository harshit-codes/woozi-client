/**
 * Token Utilities
 * 
 * Helper functions for working with design tokens.
 * Includes utilities for CSS generation, token access, and validation.
 */

import * as primitive from './primitive';
import * as semantic from './semantic';
import * as component from './component';

// =============================================================================
// CSS CUSTOM PROPERTIES GENERATION
// =============================================================================

/**
 * Generate CSS custom properties from design tokens
 * This allows tokens to be used as CSS variables
 */
export function generateCSSCustomProperties(): string {
  const properties: string[] = [];

  // Primitive spacing tokens
  Object.entries(primitive.spacing).forEach(([key, value]) => {
    properties.push(`  --spacing-${key}: ${value};`);
  });

  // Primitive typography tokens
  Object.entries(primitive.fontSize).forEach(([key, value]) => {
    properties.push(`  --font-size-${key}: ${value};`);
  });

  Object.entries(primitive.fontWeight).forEach(([key, value]) => {
    properties.push(`  --font-weight-${key}: ${value};`);
  });

  Object.entries(primitive.lineHeight).forEach(([key, value]) => {
    properties.push(`  --line-height-${key}: ${value};`);
  });

  // Semantic spacing tokens
  Object.entries(semantic.componentSpacing).forEach(([key, value]) => {
    properties.push(`  --component-spacing-${key}: ${value};`);
  });

  Object.entries(semantic.layoutSpacing).forEach(([key, value]) => {
    properties.push(`  --layout-spacing-${key}: ${value};`);
  });

  // Border radius tokens
  Object.entries(semantic.borderRadius).forEach(([key, value]) => {
    properties.push(`  --border-radius-${key}: ${value};`);
  });

  // Elevation tokens
  Object.entries(semantic.elevation).forEach(([key, value]) => {
    properties.push(`  --elevation-${key}: ${value};`);
  });

  // Animation tokens
  Object.entries(semantic.animationDuration).forEach(([key, value]) => {
    properties.push(`  --duration-${key}: ${value};`);
  });

  return `:root {\n${properties.join('\n')}\n}`;
}

// =============================================================================
// TAILWIND CLASS UTILITIES
// =============================================================================

/**
 * Convert typography tokens to Tailwind classes
 */
export function getTypographyClasses(typography: {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}): string[] {
  const classes: string[] = [];

  // Font size mapping
  const fontSizeMap = Object.entries(primitive.fontSize).find(
    ([_, value]) => value === typography.fontSize
  );
  if (fontSizeMap) {
    classes.push(`text-${fontSizeMap[0]}`);
  }

  // Font weight mapping
  const fontWeightMap = Object.entries(primitive.fontWeight).find(
    ([_, value]) => value === typography.fontWeight
  );
  if (fontWeightMap) {
    classes.push(`font-${fontWeightMap[0]}`);
  }

  // Line height mapping
  const lineHeightMap = Object.entries(primitive.lineHeight).find(
    ([_, value]) => value === typography.lineHeight
  );
  if (lineHeightMap) {
    classes.push(`leading-${lineHeightMap[0]}`);
  }

  // Letter spacing mapping (if provided)
  if (typography.letterSpacing) {
    const letterSpacingMap = Object.entries(primitive.letterSpacing).find(
      ([_, value]) => value === typography.letterSpacing
    );
    if (letterSpacingMap) {
      classes.push(`tracking-${letterSpacingMap[0]}`);
    }
  }

  return classes;
}

/**
 * Convert spacing tokens to Tailwind spacing classes
 */
export function getSpacingClass(value: string, type: 'p' | 'm' | 'gap' = 'p'): string {
  const spacingMap = Object.entries(primitive.spacing).find(
    ([_, spacingValue]) => spacingValue === value
  );
  
  if (spacingMap) {
    return `${type}-${spacingMap[0]}`;
  }
  
  return '';
}

/**
 * Convert border radius tokens to Tailwind classes
 */
export function getBorderRadiusClass(value: string): string {
  const radiusMap = Object.entries(primitive.borderRadius).find(
    ([_, radiusValue]) => radiusValue === value
  );
  
  if (radiusMap) {
    const key = radiusMap[0];
    return key === 'default' ? 'rounded' : `rounded-${key}`;
  }
  
  return '';
}

// =============================================================================
// TOKEN ACCESS UTILITIES
// =============================================================================

/**
 * Get component token by path
 * Example: getComponentToken('button.padding.md')
 */
export function getComponentToken(path: string): string | object | undefined {
  const parts = path.split('.');
  let current: any = component;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  
  return current;
}

/**
 * Get semantic token by path
 * Example: getSemanticToken('componentSpacing.md')
 */
export function getSemanticToken(path: string): string | object | undefined {
  const parts = path.split('.');
  let current: any = semantic;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  
  return current;
}

/**
 * Get primitive token by path
 * Example: getPrimitiveToken('spacing.4')
 */
export function getPrimitiveToken(path: string): string | object | undefined {
  const parts = path.split('.');
  let current: any = primitive;
  
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  
  return current;
}

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

/**
 * Validate if a value is a valid spacing token
 */
export function isValidSpacingToken(value: string): boolean {
  return Object.values(primitive.spacing).includes(value as any);
}

/**
 * Validate if a value is a valid font size token
 */
export function isValidFontSizeToken(value: string): boolean {
  return Object.values(primitive.fontSize).includes(value as any);
}

/**
 * Validate if a value is a valid border radius token
 */
export function isValidBorderRadiusToken(value: string): boolean {
  return Object.values(primitive.borderRadius).includes(value as any);
}

// =============================================================================
// RESPONSIVE UTILITIES
// =============================================================================

/**
 * Get responsive spacing based on screen size
 * Useful for Chrome extension constraints
 */
export function getResponsiveSpacing(
  base: keyof typeof semantic.componentSpacing,
  compact?: keyof typeof semantic.componentSpacing
): string {
  const baseValue = semantic.componentSpacing[base];
  const compactValue = compact ? semantic.componentSpacing[compact] : baseValue;
  
  // For Chrome extension, we typically want more compact spacing
  return `${compactValue}`;
}

/**
 * Validates if a spacing value follows the 4px grid system
 */
export function validateSpacingValue(value: string): boolean {
  // Convert rem to px (assuming 1rem = 16px)
  const pxValue = value.includes('rem') 
    ? parseFloat(value) * 16 
    : parseFloat(value);
  
  // Check if it's divisible by 4
  return pxValue % 4 === 0;
}

/**
 * Validates Chrome extension spacing consistency
 */
export function validateChromeExtensionSpacing(spacingObject: Record<string, any>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  const validateObject = (obj: any, path: string = '') => {
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;
      
      if (typeof value === 'string' && (value.includes('rem') || value.includes('px'))) {
        if (!validateSpacingValue(value)) {
          errors.push(`${currentPath}: "${value}" does not follow 4px grid system`);
        }
      } else if (typeof value === 'object' && value !== null) {
        validateObject(value, currentPath);
      }
    }
  };
  
  validateObject(spacingObject);
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Development utility to log spacing validation results
 */
export function logSpacingValidation(spacingObject: Record<string, any>) {
  if (process.env.NODE_ENV === 'development') {
    const validation = validateChromeExtensionSpacing(spacingObject);
    
    if (validation.isValid) {
      console.log('✅ Chrome Extension Spacing: All values follow 4px grid system');
    } else {
      console.warn('⚠️ Chrome Extension Spacing Issues:');
      validation.errors.forEach(error => console.warn(`  - ${error}`));
    }
  }
}

/**
 * Get responsive typography based on context
 */
export function getResponsiveTypography(
  base: keyof typeof semantic.bodyTypography,
  compact?: keyof typeof semantic.bodyTypography
) {
  const baseTypography = semantic.bodyTypography[base];
  const compactTypography = compact ? semantic.bodyTypography[compact] : baseTypography;
  
  // For Chrome extension, prefer compact typography
  return compactTypography;
}

// =============================================================================
// COMPONENT BUILDER UTILITIES
// =============================================================================

/**
 * Build component styles from tokens
 */
export function buildComponentStyles(componentName: keyof typeof component) {
  const componentTokens = component[componentName];
  
  if (!componentTokens) {
    throw new Error(`Component tokens not found for: ${componentName}`);
  }
  
  return componentTokens;
}

/**
 * Merge component variants with base tokens
 */
export function mergeComponentVariant<T extends Record<string, any>>(
  baseTokens: T,
  variantTokens: Partial<T>
): T {
  return {
    ...baseTokens,
    ...variantTokens,
  };
}

// =============================================================================
// DEBUGGING UTILITIES
// =============================================================================

/**
 * Log all available tokens (for debugging)
 */
export function logAllTokens(): void {
  console.group('🎨 Design Tokens');
  
  console.group('Primitive Tokens');
  console.log('Spacing:', primitive.spacing);
  console.log('Typography:', {
    fontSize: primitive.fontSize,
    fontWeight: primitive.fontWeight,
    lineHeight: primitive.lineHeight,
  });
  console.log('Border Radius:', primitive.borderRadius);
  console.log('Shadows:', primitive.boxShadow);
  console.groupEnd();
  
  console.group('Semantic Tokens');
  console.log('Component Spacing:', semantic.componentSpacing);
  console.log('Layout Spacing:', semantic.layoutSpacing);
  console.log('Typography:', semantic.bodyTypography);
  console.log('Elevation:', semantic.elevation);
  console.groupEnd();
  
  console.group('Component Tokens');
  Object.entries(component).forEach(([name, tokens]) => {
    console.log(`${name}:`, tokens);
  });
  console.groupEnd();
  
  console.groupEnd();
}

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export type TokenPath = string;
export type TokenValue = string | number | object;

export interface TypographyToken {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
}