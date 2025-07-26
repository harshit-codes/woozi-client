# Woozi Design System - Standard Component Library

## 🎯 Component Organization Strategy

### **Tier 1: Foundation Components** (Core Building Blocks)
Essential primitives that form the basis of all other components.

#### Typography System
- **Typography** - Base typography component with 15+ variants
- **Heading1-4** - Semantic heading components  
- **Text** - Body text with size variants
- **Caption, Label, MetricValue** - Specialized text components
- **InlineCode, Kbd** - Code and keyboard display

#### Layout Primitives
- **Box** - Universal layout primitive (40+ props)
- **VStack, HStack** - Vertical/horizontal stacking
- **Stack** - Generic stack with direction control
- **Grid** - CSS Grid wrapper with responsive props
- **SimpleGrid, TwoColumnGrid** - Preset grid layouts

#### Spacing & Structure
- **Spacer** - Flexible space allocation
- **Divider** - Visual separators
- **StackWithDividers** - Auto-divider insertion

---

### **Tier 2: Enhanced Components** (Interactive Elements)
Components with enhanced functionality and state management.

#### Buttons & Actions
- **ActionButton** - Primary button with 8 variants
- **IconButton** - Icon-only buttons
- **LoadingButton** - Buttons with loading states
- **ConfirmButton, SuccessButton, WarningButton** - Semantic presets
- **ButtonGroup** - Grouped button layouts

#### Data Display
- **MetricCard** - Single metric display with color coding
- **DataPointCard** - Multi-metric cards (1-3 data points)
- **StatusBadge** - Status indicators with color coding
- **Card** - Generic content container

#### Layout Components
- **SectionHeader** - Page section headers (vertical/horizontal)
- **ExtensionGrid, MetricsGrid, CardGrid** - Chrome extension optimized grids
- **ExtensionStack, CompactStack** - Space-optimized stacks

---

### **Tier 3: Product Components** (Domain-Specific)
Components specific to the Instagram lead management domain.

#### Lead Management
- **CollectionCard** - Instagram lead collection display
- **LeadMetricsDisplay** - Lead analytics visualization
- **CampaignStatusCard** - Campaign status and progress
- **LeadFilterPanel** - Lead filtering interface

#### Authentication & User
- **AuthModal** - Authentication container
- **UserProfileCard** - User profile display
- **NotificationBanner** - User notifications

---

## 🎨 Chrome Extension Optimizations

### **Spacing Constraints**
```typescript
// Maximum width for side panel
maxWidth: '28rem' // 448px

// Compact spacing scale
compactSpacing: {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px  
  md: '0.75rem',  // 12px
}
```

### **Component Size Presets**
```typescript
chromeExtension: {
  button: { height: '2rem', padding: '0.5rem 0.75rem' },
  input: { height: '2.25rem', padding: '0.5rem' },
  card: { padding: '0.75rem', borderRadius: '0.25rem' },
}
```

### **Grid Systems**
```typescript
// Optimized for extension width
twoColumn: { columns: 2, gap: '0.75rem' },
threeColumn: { columns: 3, gap: '0.5rem' },
```

---

## 📱 Responsive Design Strategy

### **Breakpoint Strategy**
Chrome extensions typically don't need traditional responsive breakpoints. Instead:

1. **Fixed Width Optimization** - Design for 400-448px width
2. **Vertical Scrolling** - Optimize for vertical content flow  
3. **Compact Density** - Prioritize information density
4. **Touch-Friendly** - Minimum 44px touch targets

### **Component Density Levels**
```typescript
density: {
  compact: {
    spacing: 'xs',    // 4px
    fontSize: 'sm',   // 14px
    padding: 'sm',    // 8px
  },
  comfortable: {
    spacing: 'sm',    // 8px
    fontSize: 'base', // 16px
    padding: 'md',    // 12px
  }
}
```

---

## 🛠️ Usage Patterns & Standards

### **Import Strategy**
```typescript
// Single import for all design system components
import { 
  VStack, 
  ActionButton, 
  MetricCard, 
  Heading2,
  space,
  designSystem 
} from '@/components/ui/design-system';
```

### **Component Composition Patterns**

#### **1. Card Layout Pattern**
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

#### **2. Metrics Grid Pattern**
```typescript
<MetricsGrid>
  <MetricCard value={156} label="Total" color="blue" />
  <MetricCard value={89} label="Active" color="green" />
  <MetricCard value={12} label="Pending" color="yellow" />
</MetricsGrid>
```

#### **3. Section Layout Pattern**
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

---

## ♿ Accessibility Standards

### **ARIA Support**
- All interactive components include proper ARIA labels
- Icon-only buttons include `aria-label` attributes
- Grid and list structures use semantic HTML

### **Keyboard Navigation**
- Tab order follows logical content flow
- Focus indicators use consistent ring styling
- Button groups support arrow key navigation

### **Color & Contrast**
- All text meets WCAG AA contrast requirements
- Status colors include non-color indicators
- Focus states are clearly visible

---

## 📊 Performance Considerations

### **Bundle Size Optimization**
- Tree-shakable exports from design system index
- Component-level imports to reduce bundle size
- Shared utility functions to prevent duplication

### **Runtime Performance**
- Memoized component variants using CVA
- Optimized re-renders with React.memo where appropriate
- Minimal DOM manipulation through CSS-based styling

---

## 🔧 Development Standards

### **TypeScript Integration**
- Full type safety for all component props
- Design token types exported for external usage
- Strict prop validation with discriminated unions

### **Testing Strategy**
- Unit tests for component behavior
- Visual regression tests for design consistency
- Accessibility tests for compliance

### **Documentation Standards**
- JSDoc comments for all public APIs
- Storybook stories for visual documentation
- Usage examples in component files

---

## 🚀 Future Enhancements

### **Planned Additions**
- **Form Components** - Input, Select, Checkbox, Radio
- **Navigation Components** - Tabs, Breadcrumbs, Pagination
- **Feedback Components** - Toast, Alert, Progress
- **Overlay Components** - Modal, Tooltip, Popover

### **Theme System**
- Light/dark mode support
- Brand color customization
- Density controls (compact/comfortable/spacious)

### **Advanced Features**
- Animation system integration
- Virtual scrolling for large lists
- Advanced grid layouts with CSS Grid