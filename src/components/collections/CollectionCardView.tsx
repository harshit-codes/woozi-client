import React from 'react';
import { Card, CardContent } from '../ui/card';
import { CollectionCard, getSpaceYClass } from '../ui/design-system';
import { LeadCollection } from '../../types/collection';
import { Folder } from 'lucide-react';

interface CollectionCardViewProps {
  collections: LeadCollection[];
  onEdit: (collection: LeadCollection) => void;
  loading?: boolean;
}

export function CollectionCardView({
  collections,
  onEdit,
  loading = false
}: CollectionCardViewProps) {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            Loading collections...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (collections.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Folder className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <div className="space-y-2">
            <h3 className="font-medium text-lg">No collections yet</h3>
            <p className="text-muted-foreground text-sm">
              Create your first lead collection to get started organizing your prospects.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={getSpaceYClass(2)}>
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          id={collection.id}
          title={collection.name}
          description={collection.description}
          leadCount={collection.leadCount}
          lastUpdated={collection.lastUpdated}
          linkedCampaign={undefined} // TODO: Add linkedCampaign to LeadCollection type
          onViewDetails={() => onEdit(collection)}
        />
      ))}
    </div>
  );
}