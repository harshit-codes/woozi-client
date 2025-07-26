import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ActionButton } from './ActionButton';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
    variant?: 'default' | 'outline' | 'secondary';
  };
  children?: React.ReactNode;
  layout?: 'horizontal' | 'vertical';
}

export function SectionHeader({ 
  title, 
  description, 
  icon: Icon, 
  action,
  children,
  layout = 'horizontal'
}: SectionHeaderProps) {
  if (layout === 'vertical') {
    return (
      <div className="space-y-3 mb-4">
        <div>
          {Icon && (
            <div className="flex items-center gap-2 mb-1">
              <Icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
          )}
          {!Icon && (
            <h2 className="text-lg font-semibold mb-1">{title}</h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {action && (
            <ActionButton
              variant={action.variant || 'default'}
              size="sm"
              icon={action.icon}
              onClick={action.onClick}
            >
              {action.label}
            </ActionButton>
          )}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1 min-w-0">
        {Icon && (
          <div className="flex items-center gap-2 mb-1">
            <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <h2 className="text-lg font-semibold truncate">{title}</h2>
          </div>
        )}
        {!Icon && (
          <h2 className="text-lg font-semibold mb-1 truncate">{title}</h2>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        {action && (
          <ActionButton
            variant={action.variant || 'default'}
            size="sm"
            icon={action.icon}
            onClick={action.onClick}
          >
            {action.label}
          </ActionButton>
        )}
        {children}
      </div>
    </div>
  );
}