# Woozi Chrome Extension Design System

## Design Philosophy

### Core Principles
1. **Vertical Stack First**: All components should be designed to stack vertically for optimal Chrome extension width constraints
2. **Consistency**: Standardized components for buttons, titles, descriptions, and metrics
3. **Responsive**: Graceful degradation for different screen sizes
4. **Accessible**: Built on top of Shadcn/ui for accessibility best practices

### Layout Rules
- **NO TABLES**: Avoid tabular layouts that require horizontal scrolling
- **Card-Based**: Use cards for all content sections with consistent spacing
- **Stackable Components**: Everything should work in a vertical scroll layout

## Component Library

### 1. MetricCard
**Purpose**: Display single metric values with optional icons
```tsx
<MetricCard 
  value={24} 
  label="Total Leads" 
  color="success" 
  size="sm" 
/>
```
**Sizes**: `sm`, `md`, `lg`  
**Colors**: `default`, `success`, `warning`, `danger`, `info`

### 2. DataPointCard
**Purpose**: Display multiple related metrics in a single card
```tsx
<DataPointCard
  title="Tech Founders"
  description="Instagram profiles of startup founders"
  dataPoints={[
    { value: 24, label: "Leads" },
    { value: "63%", label: "Quality", color: "success" },
    { value: "3.1%", label: "Engagement" }
  ]}
/>
```
**Grid Options**: Automatically adjusts for 1-3 data points

### 3. ActionButton
**Purpose**: Standardized buttons with consistent styling
```tsx
<ActionButton
  variant="default"
  size="sm"
  icon={Plus}
  onClick={handleClick}
>
  Create New
</ActionButton>
```
**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`  
**Sizes**: `default`, `sm`, `lg`, `icon`

### 4. SectionHeader
**Purpose**: Consistent section headers with optional actions
```tsx
<SectionHeader
  title="Lead Collections"
  description="Manage your Instagram leads"
  icon={FolderPlus}
  action={{
    label: "Create",
    onClick: handleCreate,
    icon: Plus
  }}
/>
```

### 5. StatusBadge
**Purpose**: Color-coded status indicators
```tsx
<StatusBadge status="success" icon={CheckCircle}>
  High Quality
</StatusBadge>
```
**Statuses**: `success`, `warning`, `danger`, `info`, `neutral`

### 6. CollectionCard
**Purpose**: Simplified card for displaying essential collection information
```tsx
<CollectionCard
  title="Tech Founders"
  description="Instagram profiles of startup founders"
  leadCount={24}
  lastUpdated={new Date()}
  onEdit={handleEdit}
  onLaunchCampaign={handleLaunchCampaign}
/>
```
**Data Points**: Only 4 essential items - title, description, lead count, last updated
**Actions**: Campaign and Edit buttons only

## Layout Patterns

### Standard Page Layout
```tsx
<div className="p-4 space-y-3">
  <SectionHeader layout="vertical" /> {/* Main section */}
  <div className="grid grid-cols-3 gap-3">
    <MetricCard />
    <MetricCard />
    <MetricCard />
  </div>
  <div className="space-y-3">
    <SectionHeader layout="horizontal" /> {/* Sub-section */}
    <div className="space-y-2">
      <CollectionCard />
      <CollectionCard />
    </div>
  </div>
</div>
```

### Responsive Grid Guidelines
- **3 columns max** for metrics on mobile/extension width
- **Single column** for cards and content
- **Consistent spacing**: Use `space-y-3` or `space-y-4` for vertical spacing
- **Consistent padding**: Use `p-4` for page containers

## Color System

### Status Colors
- **Success**: Green (`text-green-600`, `bg-green-100`)
- **Warning**: Yellow (`text-yellow-600`, `bg-yellow-100`)
- **Danger**: Red (`text-red-600`, `bg-red-100`)
- **Info**: Blue (`text-blue-600`, `bg-blue-100`)
- **Neutral**: Gray (`text-gray-600`, `bg-gray-100`)

### Text Hierarchy
- **Primary**: `text-foreground` - Main headings and important text
- **Secondary**: `text-muted-foreground` - Descriptions and supporting text
- **Accent**: Use color classes for emphasis (`text-primary`, status colors)

## Typography Scale

### Headings
- **Page Title**: `text-lg font-semibold`
- **Section Title**: `text-base font-semibold`
- **Card Title**: `text-sm font-semibold`

### Body Text
- **Primary**: `text-sm`
- **Secondary**: `text-xs text-muted-foreground`
- **Caption**: `text-xs`

### Metrics
- **Large**: `text-3xl font-bold` (lg MetricCard)
- **Medium**: `text-2xl font-bold` (md MetricCard)
- **Small**: `text-lg font-bold` (sm MetricCard)

## Spacing System

### Padding
- **Page Container**: `p-4`
- **Card Content**: `p-4`
- **Small Components**: `p-2` or `p-3`

### Margins
- **Section Spacing**: `space-y-4` or `space-y-6`
- **Card Spacing**: `space-y-3`
- **Element Spacing**: `space-y-2`

### Gaps
- **Grid Gaps**: `gap-3` or `gap-4`
- **Flex Gaps**: `gap-2` or `gap-3`

## Animation Guidelines

### Transitions
- **Hover Effects**: `transition-colors duration-200`
- **Transform Effects**: `transition-all duration-200`
- **Loading States**: `animate-spin` for spinners

### Hover States
- **Cards**: `hover:shadow-md hover:bg-muted/50`
- **Buttons**: Built into ActionButton component
- **Interactive Elements**: `hover:text-primary`

## Accessibility

### Focus States
- All interactive elements have visible focus states
- Tab navigation works properly
- Screen reader support via proper ARIA labels

### Color Contrast
- All text meets WCAG AA standards
- Status colors have sufficient contrast
- Icons are supplemented with text labels

## Usage Examples

### Good ✅
```tsx
// Vertical stack with consistent spacing
<div className="space-y-4">
  <SectionHeader title="Collections" />
  <div className="grid grid-cols-3 gap-3">
    <MetricCard value={24} label="Total" />
  </div>
  <CollectionCard />
</div>
```

### Avoid ❌
```tsx
// Horizontal table that requires scrolling
<table className="w-full">
  <tr>
    <td>Very long content that will overflow...</td>
  </tr>
</table>
```

## Implementation Notes

1. **Import from index**: Always import components from `@/components/ui/design-system`
2. **Extend carefully**: When extending components, maintain consistency with the design system
3. **Test responsiveness**: Always test components at Chrome extension width (~400px)
4. **Use TypeScript**: All components are fully typed for better developer experience