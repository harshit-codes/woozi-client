# Chrome Extension Spacing Guidelines

A comprehensive guide for consistent vertical and horizontal spacing in the Woozi Chrome Extension, following the 4px grid system.

## 🎯 **Overview**

This document defines the standardized spacing system optimized for Chrome extension constraints (400-450px width). All spacing values follow a strict 4px grid system for consistency and visual harmony.

## 📐 **Spacing Hierarchy**

### **3-Tier Spacing System**

```typescript
chromeExtension.spacing = {
  page: {
    container: '1rem',    // 16px - Page padding
    section: '1rem',      // 16px - Between major sections  
    bottom: '1rem',       // 16px - Bottom margins
  },
  layout: {
    component: '0.75rem', // 12px - Between cards/components
    group: '0.5rem',      // 8px - Related elements
    tight: '0.25rem',     // 4px - Minimal spacing
  },
  component: {
    card: {
      padding: '0.75rem', // 12px - Internal card padding
      gap: '0.5rem',      // 8px - Between card sections
      metric: '0.25rem',  // 4px - Metric elements
    },
    button: {
      group: '0.5rem',    // 8px - Between buttons
      internal: '0.25rem', // 4px - Icon to text
    },
    metrics: {
      trio: '0.5rem',     // 8px - Between metric cards
      internal: '0.25rem', // 4px - Within metric cards
    },
  },
}
```

## 🏗️ **Layout Patterns**

### **Page Structure Pattern**

```typescript
// ✅ CORRECT: Using standardized spacing tokens
<div style={{ padding: chromeExtension.spacing.page.container }}>
  <VStack style={{ gap: chromeExtension.spacing.page.section }}>
    {/* Metrics Section */}
    <LeadManagementTrio 
      style={{ gap: chromeExtension.spacing.component.metrics.trio }}
    />
    
    {/* CTA Section */}
    <HStack style={{ gap: chromeExtension.spacing.layout.group }}>
      <Button />
      <IconButton />
    </HStack>
    
    {/* Cards List */}
    <VStack style={{ gap: chromeExtension.spacing.layout.component }}>
      {cards.map(card => <Card key={card.id} />)}
    </VStack>
  </VStack>
  
  {/* Fixed Pagination */}
  <div style={{ paddingTop: chromeExtension.spacing.pagination.margin }}>
    <Pagination />
  </div>
</div>

// ❌ INCORRECT: Using hardcoded Tailwind classes
<div className="p-4">
  <VStack gap="md">
    <HStack gap="sm">
      {/* Inconsistent spacing values */}
    </HStack>
  </VStack>
</div>
```

### **Card Component Pattern**

```typescript
// ✅ CORRECT: Standardized card spacing
<Card style={{ 
  padding: chromeExtension.spacing.component.card.padding,
  gap: chromeExtension.spacing.component.card.gap 
}}>
  <CardHeader />
  <CardContent style={{ 
    gap: chromeExtension.spacing.component.card.metric 
  }}>
    <MetricValue />
    <MetricLabel />
  </CardContent>
  <CardActions style={{ 
    gap: chromeExtension.spacing.component.button.group 
  }}>
    <Button />
    <Button />
  </CardActions>
</Card>
```

## 📏 **Spacing Values Reference**

### **4px Grid System**
All spacing values must be divisible by 4px:

| Token | Value | Pixels | Use Case |
|-------|-------|--------|----------|
| `tight` | `0.25rem` | 4px | Minimal spacing, metric elements |
| `group` | `0.5rem` | 8px | Related elements, button groups |
| `component` | `0.75rem` | 12px | Between cards, internal padding |
| `section` | `1rem` | 16px | Major sections, page container |

### **Semantic Usage Guidelines**

#### **Page Level** (16px spacing)
- **Container padding**: Outer page margins
- **Section gaps**: Between metrics → CTA → cards
- **Bottom margins**: Pagination, modal spacing

#### **Layout Level** (4px - 12px spacing)
- **Component gaps**: Between cards in lists (12px)
- **Element groups**: Related buttons, form fields (8px)
- **Tight spacing**: Icon gaps, minimal layouts (4px)

#### **Component Level** (4px - 12px spacing)
- **Card padding**: Internal card content (12px)
- **Section gaps**: Within cards between elements (8px)
- **Metric spacing**: Between numbers and labels (4px)

## 🔧 **Implementation Guidelines**

### **1. Always Use Design Tokens**

```typescript
// ✅ GOOD: Using design tokens
style={{ gap: chromeExtension.spacing.layout.component }}

// ❌ BAD: Hardcoded values
className="gap-3"
style={{ gap: '12px' }}
```

### **2. Follow Hierarchy**

```typescript
// ✅ GOOD: Proper spacing hierarchy
<PageContainer>              {/* 16px padding */}
  <Section>                  {/* 16px gap */}
    <ComponentList>          {/* 12px gap between cards */}
      <Card>                 {/* 12px internal padding */}
        <CardContent>        {/* 8px gap between sections */}
          <Metric>           {/* 4px gap within metrics */}
```

### **3. Responsive Considerations**

```typescript
// Chrome extension has fixed width, but consider content density
const spacing = chromeExtension.spacing.layout.component; // Always 12px
```

## 🛠️ **Validation Tools**

### **Development Validation**

```typescript
import { validateChromeExtensionSpacing, logSpacingValidation } from './tokens/utils';

// Validate spacing in development
if (process.env.NODE_ENV === 'development') {
  logSpacingValidation(chromeExtension.spacing);
}

// Check individual values
const isValid = validateSpacingValue('0.75rem'); // true (12px)
const isInvalid = validateSpacingValue('0.625rem'); // false (10px - not 4px grid)
```

### **Manual Validation Checklist**

- [ ] All spacing values are divisible by 4px
- [ ] Page-level sections use 16px gaps
- [ ] Component lists use 12px gaps
- [ ] Button groups use 8px gaps
- [ ] Metrics use 4px internal spacing
- [ ] No hardcoded Tailwind spacing classes
- [ ] Consistent spacing token usage

## 📱 **Chrome Extension Specific Optimizations**

### **Width Constraints**
- **Maximum width**: 28rem (448px)
- **Typical width**: 400px side panel
- **Minimum content width**: After 16px padding = 368px

### **Vertical Rhythm**
- **Section rhythm**: 16px creates clear visual separation
- **Component rhythm**: 12px provides balanced list spacing  
- **Element rhythm**: 8px groups related items
- **Detail rhythm**: 4px for fine-grained spacing

### **Visual Hierarchy**
```
Page Container (16px padding)
├── Metrics Section
│   └── Metric Cards (8px gap)
├── CTA Section (16px from metrics)
│   └── Buttons (8px gap)
├── Cards List (16px from CTA)
│   └── Collection Cards (12px gap)
└── Pagination (16px from cards)
```

## 🎨 **Before/After Examples**

### **Before: Inconsistent Spacing**
```typescript
<div className="p-4">                    // 16px ✓
  <VStack gap="md">                      // 12px ✓
    <MetricsTrio gap="sm" />             // 8px ✓
    <HStack gap="sm">                    // 8px ✓
      <Button />
    </HStack>
    <VStack gap="sm">                    // 8px ❌ (should be 12px)
      {cards}
    </VStack>
  </VStack>
  <div className="mt-auto pt-4">        // 16px ✓
    <Pagination />
  </div>
</div>
```

### **After: Standardized Spacing**
```typescript
<div style={{ padding: chromeExtension.spacing.page.container }}>
  <VStack style={{ gap: chromeExtension.spacing.page.section }}>
    <MetricsTrio style={{ gap: chromeExtension.spacing.component.metrics.trio }} />
    <HStack style={{ gap: chromeExtension.spacing.layout.group }}>
      <Button />
    </HStack>
    <VStack style={{ gap: chromeExtension.spacing.layout.component }}>
      {cards}
    </VStack>
  </VStack>
  <div style={{ paddingTop: chromeExtension.spacing.pagination.margin }}>
    <Pagination />
  </div>
</div>
```

## 📚 **Related Documentation**

- **[Design System README](./README.md)** - Complete design system overview
- **[Component Library](./COMPONENT_LIBRARY.md)** - All available components
- **[Design Guidelines](./DESIGN_GUIDELINES.md)** - General design principles
- **[Token Architecture](./tokens/README.md)** - Design token system

## 🚀 **Migration Checklist**

When updating existing components to use standardized spacing:

1. **Identify current spacing patterns**
2. **Map to appropriate spacing tokens**
3. **Replace hardcoded values with tokens**
4. **Validate with spacing utilities**
5. **Test visual hierarchy**
6. **Update component documentation**

---

*This spacing system ensures consistent, professional layouts optimized for Chrome extension constraints while maintaining excellent readability and visual hierarchy.*