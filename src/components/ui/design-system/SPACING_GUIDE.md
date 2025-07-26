# Design System Spacing Standardization Guide

## 🎯 Overview

The Woozi design system now uses **standardized spacing tokens** instead of hardcoded Tailwind classes. This ensures consistency, maintainability, and adherence to design system principles.

## 📐 Spacing Token Architecture

### **1. Base Spacing Scale**
Maps directly to Tailwind's spacing scale:
```typescript
export const spacing = {
  0: '0',           // 0px
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  // ... continues to 32
} as const;
```

### **2. Semantic Spacing Tokens**

#### **Component Padding**
```typescript
export const componentPadding = {
  none: spacing[0],      // 0px
  xs: spacing[1],        // 4px
  sm: spacing[2],        // 8px
  md: spacing[3],        // 12px
  lg: spacing[4],        // 16px
  xl: spacing[6],        // 24px
  xxl: spacing[8],       // 32px
} as const;
```

#### **Component Gap**
```typescript
export const componentGap = {
  none: spacing[0],      // 0px
  xs: spacing[1],        // 4px
  sm: spacing[2],        // 8px
  md: spacing[3],        // 12px
  lg: spacing[4],        // 16px
  xl: spacing[6],        // 24px
  xxl: spacing[8],       // 32px
} as const;
```

#### **Chrome Extension Spacing**
```typescript
export const extensionSpacing = {
  none: spacing[0],      // 0px
  xs: spacing[1],        // 4px
  sm: spacing[2],        // 8px
  md: spacing[2.5],      // 10px - optimized for constraints
  lg: spacing[3],        // 12px
  xl: spacing[4],        // 16px
} as const;
```

## 🔧 Tailwind Class Mappings

### **Utility Functions**
Instead of hardcoding Tailwind classes, use utility functions:

```typescript
// ❌ Old way - hardcoded classes
<div className="p-3 space-y-2 gap-3">

// ✅ New way - design tokens
<div className={`${getPaddingClass(3)} ${getSpaceYClass(2)} ${getGapClass(3)}`}>

// 🎯 Even better - semantic tokens
<div className={`${extensionPatterns.compactCard.padding} ${extensionPatterns.compactCard.spacing}`}>
```

### **Available Utility Functions**
```typescript
// Padding classes
getPaddingClass(3) // Returns 'p-3'

// Margin classes  
getMarginClass(2) // Returns 'm-2'

// Gap classes
getGapClass(2) // Returns 'gap-2'

// Vertical spacing
getSpaceYClass(3) // Returns 'space-y-3'

// Horizontal spacing
getSpaceXClass(2) // Returns 'space-x-2'
```

## 🏗️ Extension Patterns

### **Pre-configured Patterns**
```typescript
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
    gap: getGapClass(2),              // gap-2
  },
} as const;
```

## 📋 Migration Examples

### **CollectionCard Migration**
```typescript
// ❌ Before - hardcoded spacing
<CardContent className="p-2.5 space-y-2">
  <div className="space-y-0.5 pr-8">
    <div className="grid grid-cols-3 gap-2 text-center">

// ✅ After - design tokens
<CardContent className={`${extensionPatterns.compactCard.padding} ${extensionPatterns.compactCard.spacing}`}>
  <div className={`${getSpaceYClass(0.5)} pr-8`}>
    <div className={`grid grid-cols-3 ${getGapClass(2)} text-center`}>
```

### **LeadsPage Migration**
```typescript
// ❌ Before - hardcoded spacing
<VStack gap="md" p="md">

// ✅ After - design tokens  
<VStack gap="md" className={extensionPatterns.pageContainer.padding}>
```

### **CollectionCardView Migration**
```typescript
// ❌ Before - hardcoded spacing
<div className="space-y-2">

// ✅ After - design tokens
<div className={getSpaceYClass(2)}>
```

## 🎨 Component Integration

### **MetricsTrio Components**
```typescript
// Updated interface to use semantic tokens
interface MetricsDuoProps {
  gap?: keyof typeof componentGap | string;
}

// Usage with tokens
<MetricsTrio
  metrics={metrics}
  gap="sm"  // Maps to componentGap.sm
  size="sm"
/>
```

### **Pagination Components**
```typescript
// Uses componentGap instead of hardcoded space
const containerGap = size === 'sm' ? componentGap.xs : componentGap.sm;

// Consistent spacing patterns
<div className={cn(getSpaceYClass(2), className)}>
```

## 🚀 Benefits Achieved

### **1. Consistency**
- **Unified spacing scale** across all components
- **No more arbitrary values** like `space-y-3` vs `space-y-4`
- **Semantic meaning** behind spacing choices

### **2. Maintainability**
- **Single source of truth** for spacing values
- **Easy global updates** by changing token values
- **Type safety** with TypeScript interfaces

### **3. Chrome Extension Optimization**
- **Extension-specific patterns** for space constraints
- **Responsive spacing** that adapts to container sizes
- **Compact variants** for dense layouts

### **4. Developer Experience**
- **Consistent API** across all components
- **Utility functions** for common patterns
- **IntelliSense support** for available tokens

## 📊 Implementation Status

### **✅ Completed Components**
- **CollectionCard** - Uses `extensionPatterns.compactCard`
- **LeadsPage** - Uses `extensionPatterns.pageContainer`
- **CollectionCardView** - Uses `getSpaceYClass(2)`
- **MetricsTrio** - Uses `componentGap` semantic tokens
- **Pagination** - Uses `componentGap` and `getSpaceYClass`

### **🔄 Token Coverage**
- **Base spacing scale**: 20+ values (0px to 128px)
- **Semantic tokens**: 7 levels each for padding/gap/layout
- **Extension patterns**: 5 pre-configured patterns
- **Utility functions**: 10+ mapping functions
- **Tailwind mappings**: Complete coverage for p-, m-, gap-, space-y-, space-x-

## 🎯 Next Steps

### **Remaining Components to Migrate**
Based on codebase analysis, the following still use hardcoded spacing:

1. **Authentication Components** (`auth/` directory)
   - `OTPInput.tsx` - Uses `p-6`, `space-y-6`, `gap-1.5`
   - `AuthContainer.tsx` - Uses `p-4`, `mb-4`, `p-3`

2. **Page Components** (`pages/` directory)
   - Multiple hardcoded `p-6`, `space-y-4`, `gap-4` values

3. **Lead Components** (`leads/` directory)
   - `BulkActionBar.tsx` - Uses `p-3`, `gap-4`, `px-3 py-1.5`

### **Migration Strategy**
1. **Import spacing utilities** in each component
2. **Replace hardcoded classes** with utility functions
3. **Use semantic patterns** where available
4. **Test spacing consistency** across components

## 📝 Usage Guidelines

### **When to Use Each Token Type**

#### **Extension Patterns** (Recommended)
Use for common component layouts:
```typescript
// Page containers
className={extensionPatterns.pageContainer.padding}

// Card content
className={extensionPatterns.compactCard.padding}
```

#### **Utility Functions** 
Use for specific spacing needs:
```typescript
// Custom spacing combinations
className={`${getPaddingClass(3)} ${getGapClass(2)}`}
```

#### **Semantic Tokens**
Use for component props:
```typescript
// Component interfaces
gap?: keyof typeof componentGap;
```

### **Naming Conventions**
- **componentPadding**: Internal component padding
- **componentGap**: Space between elements
- **layoutSpacing**: Section and container spacing
- **extensionSpacing**: Chrome extension optimized spacing

This standardization ensures that the Woozi design system maintains **visual consistency**, **developer efficiency**, and **long-term maintainability** across all components.