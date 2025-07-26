import React from 'react';
import { cn } from '../../../lib/utils';
import { semanticTokens } from './tokens';

// =============================================================================
// TYPOGRAPHY VARIANT DEFINITIONS
// =============================================================================

const typographyVariants = {
  // Headings with scroll margins (following shadcn patterns)
  h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
  h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
  h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'scroll-m-20 text-xl font-semibold tracking-tight',

  // Design system semantic variants
  headingLarge: 'text-2xl font-bold leading-tight',
  headingMedium: 'text-xl font-semibold leading-tight',
  headingSmall: 'text-lg font-semibold leading-normal',

  // Body text variants
  bodyLarge: 'text-base font-normal leading-normal',
  bodyMedium: 'text-sm font-normal leading-normal',
  bodySmall: 'text-xs font-normal leading-normal',

  // Specialized variants
  lead: 'text-xl text-muted-foreground',
  large: 'text-lg font-semibold',
  small: 'text-sm font-medium leading-none',
  muted: 'text-sm text-muted-foreground',
  caption: 'text-xs font-medium leading-normal',
  label: 'text-sm font-medium leading-normal',

  // Metric variants
  metricLarge: 'text-3xl font-bold leading-tight',
  metricMedium: 'text-2xl font-bold leading-tight',
  metricSmall: 'text-lg font-bold leading-tight',

  // Inline text styles
  code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
  kbd: 'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100',
} as const;

type TypographyVariant = keyof typeof typographyVariants;

// =============================================================================
// TYPOGRAPHY COMPONENT
// =============================================================================

interface TypographyProps {
  variant?: TypographyVariant;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

export function Typography({ 
  variant = 'bodyMedium', 
  as: Component = 'p',
  className,
  children,
  ...props 
}: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  const variantClasses = typographyVariants[variant];
  
  return (
    <Component 
      className={cn(variantClasses, className)} 
      {...props}
    >
      {children}
    </Component>
  );
}

// =============================================================================
// SEMANTIC TYPOGRAPHY COMPONENTS
// =============================================================================

// Heading components with proper semantic HTML
export function Heading1({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Typography 
      variant="h1" 
      as="h1" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Heading2({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Typography 
      variant="h2" 
      as="h2" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Heading3({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Typography 
      variant="h3" 
      as="h3" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Heading4({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Typography 
      variant="h4" 
      as="h4" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

// Text components
export function Text({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Typography 
      variant="bodyMedium" 
      as="p" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Lead({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Typography 
      variant="lead" 
      as="p" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Large({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Typography 
      variant="large" 
      as="div" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Small({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography 
      variant="small" 
      as="small" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Muted({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Typography 
      variant="muted" 
      as="p" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

// Specialized components
export function Caption({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography 
      variant="caption" 
      as="span" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Label({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLLabelElement>) {
  return (
    <Typography 
      variant="label" 
      as="label" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

// Metric display components
export function MetricValue({ 
  size = 'medium',
  className, 
  children, 
  ...props 
}: { 
  size?: 'small' | 'medium' | 'large';
} & Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLDivElement>) {
  const variant = size === 'small' ? 'metricSmall' : size === 'large' ? 'metricLarge' : 'metricMedium';
  
  return (
    <Typography 
      variant={variant} 
      as="div" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

// Inline text components
export function InlineCode({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography 
      variant="code" 
      as="code" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

export function Kbd({ className, children, ...props }: Omit<TypographyProps, 'variant' | 'as'> & React.HTMLAttributes<HTMLElement>) {
  return (
    <Typography 
      variant="kbd" 
      as="kbd" 
      className={className} 
      {...props}
    >
      {children}
    </Typography>
  );
}

// =============================================================================
// LIST COMPONENTS (following shadcn patterns)
// =============================================================================

export function List({ className, children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {children}
    </ul>
  );
}

export function OrderedList({ className, children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol className={cn('my-6 ml-6 list-decimal [&>li]:mt-2', className)} {...props}>
      {children}
    </ol>
  );
}

export function ListItem({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn(className)} {...props}>
      {children}
    </li>
  );
}

// =============================================================================
// BLOCKQUOTE COMPONENT
// =============================================================================

export function Blockquote({ className, children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props}>
      {children}
    </blockquote>
  );
}

// =============================================================================
// TABLE COMPONENTS
// =============================================================================

export function Table({ className, children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={cn('[&_tr]:border-b', className)} {...props}>
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ className, children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', className)} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ className, children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn('h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0', className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props}>
      {children}
    </td>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export { typographyVariants };
export type { TypographyVariant };