import React from 'react';
import { Badge } from '../badge';
import { LucideIcon } from 'lucide-react';

interface StatusBadgeProps {
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children: React.ReactNode;
  icon?: LucideIcon;
  size?: 'sm' | 'md';
}

const statusVariants = {
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  neutral: 'bg-gray-100 text-gray-800 border-gray-200'
};

export function StatusBadge({ 
  status, 
  children, 
  icon: Icon, 
  size = 'sm' 
}: StatusBadgeProps) {
  const variant = statusVariants[status];
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
  const textSize = size === 'sm' ? 'text-[10px]' : 'text-sm';
  const padding = size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1';
  
  return (
    <Badge 
      variant="outline" 
      className={`${variant} ${textSize} ${padding} font-medium inline-flex items-center gap-1`}
    >
      {Icon && <Icon className={iconSize} />}
      {children}
    </Badge>
  );
}