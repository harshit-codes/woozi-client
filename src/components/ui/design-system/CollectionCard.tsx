import React from 'react';
import { Card, CardContent } from '../card';
import { IconButton } from './ActionButton';
import { ChevronRight } from 'lucide-react';
import { extensionPatterns, getGapClass, getSpaceYClass } from './tokens';

interface CollectionCardProps {
  id: string;
  title: string;
  description?: string;
  leadCount: number;
  lastUpdated: Date;
  linkedCampaign?: string;
  onViewDetails: () => void;
}

export function CollectionCard({
  id,
  title,
  description,
  leadCount,
  lastUpdated,
  linkedCampaign,
  onViewDetails
}: CollectionCardProps) {
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    
    return `${month}/${day}/${year}`;
  };


  return (
    <Card 
      className="hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer relative"
      onClick={onViewDetails}
    >
      <CardContent className={`${extensionPatterns.compactCard.padding} ${extensionPatterns.compactCard.spacing}`}>
        {/* Master CTA - Top Left */}
        <IconButton
          icon={ChevronRight}
          size="xs"
          variant="ghost"
          className="absolute top-1 right-1 h-6 w-6 opacity-60 hover:opacity-100"
          aria-label="View collection details"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails();
          }}
        />

        {/* Collection Name and Description */}
        <div className={`${getSpaceYClass(0.5)} pr-8`}>
          <h3 className="font-semibold text-sm truncate leading-tight">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground truncate leading-tight">
              {description}
            </p>
          )}
        </div>

        {/* Compact Data Points Grid (2x3) */}
        <div className={`grid grid-cols-3 ${getGapClass(2)} text-center`}>
          {/* Values Row */}
          <div className="text-base font-bold">{leadCount}</div>
          <div className="text-base font-bold">{linkedCampaign || '-'}</div>
          <div className="text-base font-bold">{formatDate(lastUpdated)}</div>
          
          {/* Labels Row */}
          <div className="text-xs text-muted-foreground">Leads</div>
          <div className="text-xs text-muted-foreground">Campaign</div>
          <div className="text-xs text-muted-foreground">Updated</div>
        </div>
      </CardContent>
    </Card>
  );
}