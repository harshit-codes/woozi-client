import React from 'react';
import { Badge } from '../ui/badge';
import { LeadQualityScore } from '../../types/lead';

interface LeadQualityBadgeProps {
  quality: LeadQualityScore;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function LeadQualityBadge({ 
  quality, 
  size = 'sm', 
  showIcon = true 
}: LeadQualityBadgeProps) {
  const getQualityConfig = (quality: LeadQualityScore) => {
    switch (quality) {
      case 'high':
        return {
          label: 'High',
          icon: '🔥',
          className: 'bg-green-500 text-white hover:bg-green-600'
        };
      case 'medium':
        return {
          label: 'Medium',
          icon: '⭐',
          className: 'bg-yellow-500 text-white hover:bg-yellow-600'
        };
      case 'low':
        return {
          label: 'Low',
          icon: '💤',
          className: 'bg-gray-500 text-white hover:bg-gray-600'
        };
      default:
        return {
          label: 'Unknown',
          icon: '❓',
          className: 'bg-gray-400 text-white'
        };
    }
  };

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'sm':
        return 'text-xs px-1.5 py-0.5';
      case 'md':
        return 'text-sm px-2 py-1';
      case 'lg':
        return 'text-base px-3 py-1.5';
      default:
        return 'text-xs px-1.5 py-0.5';
    }
  };

  const config = getQualityConfig(quality);
  const sizeClass = getSizeClass(size);

  return (
    <Badge 
      className={`${config.className} ${sizeClass} font-medium inline-flex items-center gap-1`}
      title={`${config.label} quality lead`}
    >
      {showIcon && <span className="text-xs">{config.icon}</span>}
      <span>{config.label}</span>
    </Badge>
  );
}