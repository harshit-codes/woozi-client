import React from 'react';
import { cn } from '../../../lib/utils';
import { MetricCard } from './MetricCard';
import { HStack } from './Stack';
import { componentGap, getSpaceYClass } from './tokens';

// =============================================================================
// METRICS COMPONENTS - STANDARDIZED LAYOUTS
// =============================================================================

/**
 * Standardized metric display components following design system patterns
 * Pre-configured layouts for common metric arrangements
 */

// =============================================================================
// METRIC DATA TYPES
// =============================================================================

interface MetricData {
  value: number | string;
  label: string;
  color?: 'info' | 'success' | 'warning' | 'error' | 'default';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
}

// =============================================================================
// METRICS UNO - SINGLE METRIC
// =============================================================================

interface MetricsUnoProps {
  metric: MetricData;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MetricsUno({
  metric,
  className,
  size = 'md'
}: MetricsUnoProps) {
  return (
    <div className={cn('w-full', className)}>
      <MetricCard
        value={metric.value}
        label={metric.label}
        color={metric.color || 'default'}
        size={size}
        icon={metric.icon}
        trend={metric.trend}
        className="w-full"
      />
    </div>
  );
}

// =============================================================================
// METRICS DUO - TWO METRICS HORIZONTALLY
// =============================================================================

interface MetricsDuoProps {
  metrics: [MetricData, MetricData];
  className?: string;
  gap?: keyof typeof componentGap | string;
  size?: 'sm' | 'md' | 'lg';
  equalWidth?: boolean;
}

export function MetricsDuo({
  metrics,
  className,
  gap = 'sm',
  size = 'sm',
  equalWidth = true
}: MetricsDuoProps) {
  const [metric1, metric2] = metrics;

  return (
    <HStack 
      gap={gap} 
      className={cn('w-full', className)}
    >
      <div className={cn('flex-1', equalWidth && 'min-w-0')}>
        <MetricCard
          value={metric1.value}
          label={metric1.label}
          color={metric1.color || 'info'}
          size={size}
          icon={metric1.icon}
          trend={metric1.trend}
          className="w-full h-full"
        />
      </div>
      <div className={cn('flex-1', equalWidth && 'min-w-0')}>
        <MetricCard
          value={metric2.value}
          label={metric2.label}
          color={metric2.color || 'success'}
          size={size}
          icon={metric2.icon}
          trend={metric2.trend}
          className="w-full h-full"
        />
      </div>
    </HStack>
  );
}

// =============================================================================
// METRICS TRIO - THREE METRICS HORIZONTALLY
// =============================================================================

interface MetricsTrioProps {
  metrics: [MetricData, MetricData, MetricData];
  className?: string;
  gap?: keyof typeof componentGap | string;
  size?: 'sm' | 'md' | 'lg';
  equalWidth?: boolean;
}

export function MetricsTrio({
  metrics,
  className,
  gap = 'sm',
  size = 'sm',
  equalWidth = true
}: MetricsTrioProps) {
  const [metric1, metric2, metric3] = metrics;

  return (
    <HStack 
      gap={gap} 
      className={cn('w-full', className)}
    >
      <div className={cn('flex-1', equalWidth && 'min-w-0')}>
        <MetricCard
          value={metric1.value}
          label={metric1.label}
          color={metric1.color || 'info'}
          size={size}
          icon={metric1.icon}
          trend={metric1.trend}
          className="w-full h-full"
        />
      </div>
      <div className={cn('flex-1', equalWidth && 'min-w-0')}>
        <MetricCard
          value={metric2.value}
          label={metric2.label}
          color={metric2.color || 'success'}
          size={size}
          icon={metric2.icon}
          trend={metric2.trend}
          className="w-full h-full"
        />
      </div>
      <div className={cn('flex-1', equalWidth && 'min-w-0')}>
        <MetricCard
          value={metric3.value}
          label={metric3.label}
          color={metric3.color || 'warning'}
          size={size}
          icon={metric3.icon}
          trend={metric3.trend}
          className="w-full h-full"
        />
      </div>
    </HStack>
  );
}

// =============================================================================
// CHROME EXTENSION OPTIMIZED VARIANTS
// =============================================================================

/**
 * Compact metrics specifically optimized for Chrome extension constraints
 */

export function CompactMetricsUno(props: Omit<MetricsUnoProps, 'size'>) {
  return <MetricsUno {...props} size="sm" />;
}

export function CompactMetricsDuo(props: Omit<MetricsDuoProps, 'size' | 'gap'>) {
  return <MetricsDuo {...props} size="sm" gap="xs" equalWidth={true} />;
}

export function CompactMetricsTrio(props: Omit<MetricsTrioProps, 'size' | 'gap'>) {
  return <MetricsTrio {...props} size="sm" gap="xs" equalWidth={true} />;
}

// =============================================================================
// PRESET METRIC CONFIGURATIONS
// =============================================================================

/**
 * Common preset configurations for typical use cases
 */

// Lead Management Presets
export interface LeadManagementMetrics {
  totalCollections: number;
  totalLeads: number;
  totalWon: number;
}

export function LeadManagementTrio({
  totalCollections,
  totalLeads,
  totalWon,
  ...props
}: LeadManagementMetrics & Omit<MetricsTrioProps, 'metrics'>) {
  const metrics: [MetricData, MetricData, MetricData] = [
    {
      value: totalCollections,
      label: 'Total Collections',
      color: 'info'
    },
    {
      value: totalLeads,
      label: 'Total Leads',
      color: 'success'
    },
    {
      value: totalWon,
      label: 'Total Won',
      color: 'warning'
    }
  ];

  return <MetricsTrio metrics={metrics} equalWidth={true} {...props} />;
}

// Campaign Management Presets
export interface CampaignMetrics {
  activeCampaigns: number;
  totalSent: number;
  responseRate?: number;
}

export function CampaignTrio({
  activeCampaigns,
  totalSent,
  responseRate,
  ...props
}: CampaignMetrics & Omit<MetricsTrioProps, 'metrics'>) {
  const metrics: [MetricData, MetricData, MetricData] = [
    {
      value: activeCampaigns,
      label: 'Active Campaigns',
      color: 'info'
    },
    {
      value: totalSent,
      label: 'Messages Sent',
      color: 'success'
    },
    {
      value: responseRate ? `${responseRate}%` : '-',
      label: 'Response Rate',
      color: 'warning'
    }
  ];

  return <MetricsTrio metrics={metrics} equalWidth={true} {...props} />;
}

// Collection Overview Presets
export function CollectionOverviewDuo({
  totalCollections,
  totalLeads,
  ...props
}: Pick<LeadManagementMetrics, 'totalCollections' | 'totalLeads'> & Omit<MetricsDuoProps, 'metrics'>) {
  const metrics: [MetricData, MetricData] = [
    {
      value: totalCollections,
      label: 'Collections',
      color: 'info'
    },
    {
      value: totalLeads,
      label: 'Total Leads',
      color: 'success'
    }
  ];

  return <MetricsDuo metrics={metrics} equalWidth={true} {...props} />;
}

// =============================================================================
// RESPONSIVE METRICS DISPLAY
// =============================================================================

/**
 * Automatically adjusts metric display based on available space and data
 */
interface ResponsiveMetricsProps {
  data: LeadManagementMetrics;
  preferredLayout?: 'uno' | 'duo' | 'trio';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ResponsiveMetrics({
  data,
  preferredLayout = 'trio',
  className,
  size = 'sm'
}: ResponsiveMetricsProps) {
  // For Chrome extension, we typically prefer the compact trio layout
  return (
    <LeadManagementTrio
      totalCollections={data.totalCollections}
      totalLeads={data.totalLeads}
      totalWon={data.totalWon}
      className={className}
      size={size}
    />
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export type {
  MetricData,
  MetricsUnoProps,
  MetricsDuoProps,
  MetricsTrioProps,
  LeadManagementMetrics,
  CampaignMetrics
};