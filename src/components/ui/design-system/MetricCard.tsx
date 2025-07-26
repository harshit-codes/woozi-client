import React from 'react';
import { Card, CardContent } from '../card';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface MetricCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
}

const colorClasses = {
  default: 'text-foreground',
  success: 'text-green-600',
  warning: 'text-yellow-600', 
  danger: 'text-red-600',
  info: 'text-blue-600'
};

const sizeClasses = {
  sm: { value: 'text-lg', icon: 'h-4 w-4' },
  md: { value: 'text-2xl', icon: 'h-5 w-5' },
  lg: { value: 'text-3xl', icon: 'h-6 w-6' }
};

export function MetricCard({ 
  value, 
  label, 
  icon: Icon, 
  color = 'default', 
  size = 'md',
  className,
  trend
}: MetricCardProps) {
  const colorClass = colorClasses[color];
  const sizeClass = sizeClasses[size];
  
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="p-4 text-center h-full flex flex-col justify-center">
        {Icon && (
          <div className="flex items-center justify-center mb-2">
            <Icon className={`${sizeClass.icon} ${colorClass}`} />
          </div>
        )}
        <div className={`font-bold ${sizeClass.value} ${colorClass}`}>
          {value}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {label}
        </div>
        {trend && (
          <div className={cn(
            'text-xs mt-1',
            trend.direction === 'up' && 'text-green-600',
            trend.direction === 'down' && 'text-red-600',
            trend.direction === 'neutral' && 'text-muted-foreground'
          )}>
            {trend.direction === 'up' && '↗'} 
            {trend.direction === 'down' && '↘'} 
            {trend.value}%
          </div>
        )}
      </CardContent>
    </Card>
  );
}