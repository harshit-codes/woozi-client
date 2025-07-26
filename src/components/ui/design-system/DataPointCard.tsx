import React from 'react';
import { Card, CardContent } from '../card';
import { LucideIcon } from 'lucide-react';

interface DataPoint {
  value: string | number;
  label: string;
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

interface DataPointCardProps {
  title: string;
  description?: string;
  dataPoints: DataPoint[];
  icon?: LucideIcon;
  onClick?: () => void;
}

const colorClasses = {
  default: 'text-foreground',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-red-600',
  info: 'text-blue-600'
};

export function DataPointCard({ 
  title, 
  description, 
  dataPoints, 
  icon: Icon,
  onClick 
}: DataPointCardProps) {
  return (
    <Card 
      className={`${onClick ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            {Icon && (
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <h3 className="font-semibold text-sm truncate">{title}</h3>
              </div>
            )}
            {!Icon && (
              <h3 className="font-semibold text-sm mb-2 truncate">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
            )}
          </div>
        </div>
        
        <div className={`grid ${dataPoints.length === 2 ? 'grid-cols-2' : dataPoints.length === 3 ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
          {dataPoints.map((point, index) => (
            <div key={index} className="text-center">
              <div className={`text-lg font-bold ${colorClasses[point.color || 'default']}`}>
                {point.value}
              </div>
              <div className="text-xs text-muted-foreground">{point.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}