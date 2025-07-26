import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Edit3, 
  Eye, 
  Copy, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Folder,
  Rocket,
  TrendingUp
} from 'lucide-react';
import { LeadCollection, CollectionSort, SortDirection } from '../../types/collection';

interface CollectionAnalytics {
  qualityDistribution?: {
    high: number;
    medium: number;
    low: number;
  };
  averageEngagement?: number;
}

interface EnhancedCollectionListViewProps {
  collections: LeadCollection[];
  analytics?: { [collectionId: string]: CollectionAnalytics };
  onEdit: (collection: LeadCollection) => void;
  onDetailView: (collection: LeadCollection) => void;
  onClone: (collection: LeadCollection) => void;
  onLaunchCampaign?: (collection: LeadCollection) => void;
  onDelete?: (collection: LeadCollection) => void;
  loading?: boolean;
}

export function CollectionListView({
  collections,
  analytics = {},
  onEdit,
  onDetailView,
  onClone,
  onLaunchCampaign,
  onDelete,
  loading = false
}: EnhancedCollectionListViewProps) {
  const [sort, setSort] = useState<CollectionSort>({
    column: 'lastUpdated',
    direction: 'desc'
  });

  const handleSort = (column: keyof LeadCollection) => {
    if (sort.column === column) {
      setSort({
        column,
        direction: sort.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      setSort({
        column,
        direction: 'desc'
      });
    }
  };

  const sortedCollections = [...collections].sort((a, b) => {
    const aValue = a[sort.column];
    const bValue = b[sort.column];
    
    if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const SortIcon = ({ column }: { column: keyof LeadCollection }) => {
    if (sort.column !== column) return null;
    return sort.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  const getQualityColor = (high: number, total: number): string => {
    const percentage = total > 0 ? (high / total) * 100 : 0;
    if (percentage >= 60) return 'text-green-600';
    if (percentage >= 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            Loading collections...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (collections.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Folder className="h-8 w-8 mx-auto mb-4 text-muted-foreground/50" />
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Manage Collections</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th 
                  className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Collection Name
                    <SortIcon column="name" />
                  </div>
                </th>
                <th 
                  className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort('leadCount')}
                >
                  <div className="flex items-center gap-1">
                    Leads
                    <SortIcon column="leadCount" />
                  </div>
                </th>
                <th className="text-left p-3 font-medium text-sm">Quality</th>
                <th className="text-left p-3 font-medium text-sm">Engagement</th>
                <th 
                  className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort('lastUpdated')}
                >
                  <div className="flex items-center gap-1">
                    Updated
                    <SortIcon column="lastUpdated" />
                  </div>
                </th>
                <th className="text-left p-3 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCollections.map((collection) => {
                const collectionAnalytics = analytics[collection.id];
                const qualityDist = collectionAnalytics?.qualityDistribution;
                const highQualityCount = qualityDist?.high || 0;
                const totalLeads = collection.leadCount;
                
                return (
                  <tr 
                    key={collection.id}
                    className="border-b hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-3">
                      <div className="cursor-pointer" onClick={() => onDetailView(collection)}>
                        <div className="font-medium text-sm hover:text-primary transition-colors">
                          {collection.name}
                        </div>
                        {collection.description && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {collection.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="secondary" className="text-xs">
                        {collection.leadCount}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {qualityDist ? (
                        <div className="flex items-center gap-2">
                          <div className={`text-sm font-medium ${getQualityColor(highQualityCount, totalLeads)}`}>
                            {totalLeads > 0 ? Math.round((highQualityCount / totalLeads) * 100) : 0}%
                          </div>
                          <div className="text-xs text-muted-foreground">
                            high quality
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">-</div>
                      )}
                    </td>
                    <td className="p-3">
                      {collectionAnalytics?.averageEngagement ? (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {collectionAnalytics.averageEngagement.toFixed(1)}%
                          </span>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">-</div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="text-sm text-muted-foreground">
                        {formatDate(collection.lastUpdated)}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {onLaunchCampaign && collection.leadCount > 0 && (
                          <button
                            onClick={() => onLaunchCampaign(collection)}
                            className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                            title="Launch campaign"
                          >
                            <Rocket className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => onEdit(collection)}
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                          title="Edit collection"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDetailView(collection)}
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onClone(collection)}
                          className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                          title="Clone collection"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        {onDelete && (
                          <button
                            onClick={() => onDelete(collection)}
                            className="p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete collection"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}