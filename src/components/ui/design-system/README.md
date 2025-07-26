# Woozi Design System

A comprehensive design system built on **shadcn/ui** with modular design tokens optimized for Chrome extension development.

## 🚀 Quick Start

```typescript
import { 
  VStack, 
  ActionButton, 
  MetricCard, 
  Heading2,
  space,
  designSystem 
} from '@/components/ui/design-system';

function MyComponent() {
  return (
    <VStack gap="md" p="lg">
      <Heading2>Lead Collections</Heading2>
      <MetricCard value={24} label="Total Leads" />
      <ActionButton variant="success" size="sm" fullWidth>
        Launch Campaign
      </ActionButton>
    </VStack>
  );
}
```

## 📦 Design Token Architecture

### **3-Tier Token System**
```
tokens/
├── primitive.ts      # Base values (spacing, typography, colors)
├── semantic.ts       # Contextual tokens (componentSpacing, elevation)  
├── component.ts      # Component-specific tokens (button, card, etc.)
├── utils.ts         # Helper functions & validation
└── index.ts         # Centralized token API
```

### **Token Usage**
```typescript
// Direct token access
import { space, text, radius } from '@/components/ui/design-system';

// Component token access
import { getComponentToken } from '@/components/ui/design-system';
const buttonPadding = getComponentToken('button.padding.sm');

// Quick access patterns
const cardStyles = {
  padding: space.md,     // 12px
  fontSize: text.base,   // 16px
  borderRadius: radius.md, // 4px
};
```

## 🎨 Component Categories

### **Foundation Components** (Core Building Blocks)
- **Typography**: `Heading1-4`, `Text`, `Caption`, `MetricValue`
- **Layout**: `Box`, `VStack`, `HStack`, `Grid`, `SimpleGrid`
- **Structure**: `Spacer`, `Divider`, `StackWithDividers`

### **Enhanced Components** (Interactive Elements)  
- **Buttons**: `ActionButton`, `IconButton`, `LoadingButton`, `ButtonGroup`
- **Data Display**: `MetricCard`, `DataPointCard`, `StatusBadge`
- **Metrics**: `MetricsUno`, `MetricsDuo`, `MetricsTrio`, `LeadManagementTrio`
- **Layout**: `SectionHeader`, `ExtensionGrid`, `MetricsGrid`
- **Navigation**: `Pagination`, `CompactPagination`, `ConfigurablePagination`, `ShadcnPagination` (shadcn/ui)

### **Product Components** (Domain-Specific)
- **Lead Management**: `CollectionCard`, `LeadMetricsDisplay`
- **Authentication**: `AuthModal`, `UserProfileCard`

## 📐 Chrome Extension Optimizations

### **Spatial Constraints**
```typescript
chromeExtension: {
  maxWidth: '28rem',        // 448px optimal width
  compactSpacing: {
    xs: '0.25rem',         // 4px
    sm: '0.5rem',          // 8px  
    md: '0.75rem',         // 12px
  },
  components: {
    button: { height: '2rem', padding: '0.5rem 0.75rem' },
    input: { height: '2.25rem', padding: '0.5rem' },
    card: { padding: '0.75rem', borderRadius: '0.25rem' },
  }
}
```

### **Grid Systems**
```typescript
// Extension-optimized grids
<MetricsGrid>          {/* 3 columns, sm gap */}
<TwoColumnGrid>        {/* 2 columns, md gap */}  
<CardGrid>             {/* 1 column, md gap */}
```

### **Pagination Configuration**
```typescript
chromeExtension.pagination: {
  itemsPerPage: 3,        // Show only 3 cards for better UX
  maxVisiblePages: 3,     // Compact pagination: < 1 2 ... >
  showEllipsis: true,     // Show ... for better navigation context
  showInfo: false,        // Hide "Showing X-Y of Z" to save space
  size: 'sm',            // Small buttons for compact layout
  buttonHeight: '2rem',   // 32px - consistent with other extension buttons
  gap: space.xs,         // 4px gap between pagination buttons
}
```

## 🛠️ Development Utilities

### **Token Validation**
```typescript
// Development mode validation
designSystem.dev.validate.spacing('1rem');
designSystem.dev.validate.fontSize('0.875rem');
designSystem.dev.logTokens(); // Log all tokens to console
```

### **CSS Generation**
```typescript
// Generate CSS custom properties
import { generateCSSCustomProperties } from '@/components/ui/design-system';
const cssVars = generateCSSCustomProperties();
```

### **Responsive Helpers**
```typescript
// Chrome extension responsive utilities
import { getExtensionValue } from '@/components/ui/design-system';
const spacing = getExtensionValue('xs', 'sm', 'md'); // Returns 'xs' for extension
```

## 🎯 Usage Patterns

### **Card Layout Pattern**
```typescript
<Card p="md" borderRadius="md">
  <VStack gap="sm">
    <Heading3>Collection Name</Heading3>
    <MetricCard value={24} label="Total Leads" />
    <HStack gap="sm" justify="end">
      <ActionButton variant="outline" size="sm">Edit</ActionButton>
      <ActionButton variant="success" size="sm">Campaign</ActionButton>
    </HStack>
  </VStack>
</Card>
```

### **Pagination Configuration Pattern**
```typescript
// Shadcn/UI Pagination (Recommended - 3 cards per page)
<CompactShadcnPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  itemsPerPage={3}
  totalItems={totalItems}
  itemName="collections"
  showInfo={false}
/>

// Basic Shadcn Pagination
<ShadcnPagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  maxVisiblePages={3}
  showEllipsis={true}
/>

// Legacy Custom Configuration (Deprecated - use shadcn instead)
<ConfigurablePagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  onPageChange={setCurrentPage}
  preset="extensionCompact"
  itemName="collections"
/>

// Migration Path: Custom → Shadcn
// ✅ shadcn/ui components with better accessibility
// ✅ Consistent with shadcn design system
// ✅ Better browser compatibility
// ✅ More maintainable codebase
```

### **Metrics Display Pattern**
```typescript
// Individual metrics
<MetricsGrid>
  <MetricCard value={156} label="Total" color="blue" />
  <MetricCard value={89} label="Active" color="green" />
  <MetricCard value={12} label="Pending" color="yellow" />
</MetricsGrid>

// Standardized metric groups with equal sizing
<LeadManagementTrio 
  totalCollections={3}
  totalLeads={87}
  totalWon={24}
  gap="sm"
  size="sm"
/>

// Flexible metric layouts with equal width
<MetricsDuo 
  metrics={[
    { value: 156, label: "Collections", color: "info" },
    { value: 89, label: "Leads", color: "success" }
  ]}
  equalWidth={true}
  gap="sm"
/>

// Compact variants with guaranteed equal sizing
<CompactMetricsTrio 
  metrics={[
    { value: 3, label: "Collections", color: "info" },
    { value: 87, label: "Leads", color: "success" },
    { value: 24, label: "Won", color: "warning" }
  ]}
/>
```

### **Section Layout Pattern**
```typescript
<VStack gap="lg">
  <SectionHeader 
    title="Lead Collections" 
    description="Manage your Instagram lead collections"
    action={<ActionButton>Create New</ActionButton>}
  />
  <CardGrid gap="md">
    {collections.map(collection => (
      <CollectionCard key={collection.id} {...collection} />
    ))}
  </CardGrid>
</VStack>
```

## 🎨 Design Principles

### **Consistency**
- Unified spacing scale (4px base unit)
- Consistent color usage across components
- Standardized typography hierarchy

### **Efficiency**  
- Optimized for Chrome extension constraints
- Minimal bundle size through tree-shaking
- Performance-optimized component variants

### **Accessibility**
- WCAG AA compliant contrast ratios
- Comprehensive ARIA support
- Keyboard navigation standards

## 📊 Component Statistics

- **55+ Design Tokens** across 3 architectural layers including pagination configurations
- **15+ Typography Variants** with semantic naming
- **40+ Layout Props** in Box primitive component  
- **8 Button Variants** with proper state handling
- **12 Layout Components** (Box, Stack, Grid variations)
- **16 Enhanced Components** with Chrome extension optimization
- **4 Pagination Presets** (extensionCompact, cardView, listView, minimal)
- **3-Card Layout Optimization** for Chrome extension constraints

## 🔗 Integration

### **Tailwind CSS Integration**
The design system integrates seamlessly with Tailwind through utility classes and custom token generation.

### **shadcn/ui Compatibility**
Built on top of shadcn/ui patterns ensuring compatibility with the broader shadcn ecosystem.

### **TypeScript Support**
Full TypeScript integration with exported token types and component prop validation.

## 📚 Documentation

- **[COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md)** - Complete component reference
- **[DESIGN_GUIDELINES.md](./DESIGN_GUIDELINES.md)** - Design principles and usage guidelines
- **[tokens/README.md](./tokens/README.md)** - Design token documentation

## 🚀 Getting Started

1. **Import the design system**:
   ```typescript
   import { VStack, ActionButton } from '@/components/ui/design-system';
   ```

2. **Use design tokens**:
   ```typescript
   import { space, text } from '@/components/ui/design-system';
   ```

3. **Follow component patterns**:
   ```typescript
   <VStack gap="md">
     <ActionButton variant="success">Save</ActionButton>
   </VStack>
   ```

4. **Leverage Chrome extension optimizations**:
   ```typescript
   <ExtensionGrid variant="metrics">
     <MetricCard value={24} label="Leads" />
   </ExtensionGrid>
   ```

---

Built with ❤️ for the Woozi Chrome Extension using modern design system principles.