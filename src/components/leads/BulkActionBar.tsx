import React from 'react';
import { 
  MessageSquare, 
  Download, 
  Trash2, 
  Tag, 
  CheckSquare, 
  X 
} from 'lucide-react';
import { BulkLeadAction } from '../../types/lead';

interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBulkAction: (action: BulkLeadAction) => void;
  selectedLeadIds: string[];
}

export function BulkActionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onDeselectAll,
  onBulkAction,
  selectedLeadIds
}: BulkActionBarProps) {
  if (selectedCount === 0) {
    return null;
  }

  const handleAction = (type: BulkLeadAction['type'], data?: any) => {
    onBulkAction({
      type,
      leadIds: selectedLeadIds,
      data
    });
  };

  const isAllSelected = selectedCount === totalCount;

  return (
    <div className="sticky top-0 z-10 bg-primary text-primary-foreground p-3 rounded-t-lg border-b">
      <div className="flex items-center justify-between">
        {/* Selection Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            <span className="font-medium">
              {selectedCount} of {totalCount} selected
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {!isAllSelected && (
              <button
                onClick={onSelectAll}
                className="text-xs text-primary-foreground/80 hover:text-primary-foreground underline"
              >
                Select all {totalCount}
              </button>
            )}
            <button
              onClick={onDeselectAll}
              className="text-xs text-primary-foreground/80 hover:text-primary-foreground underline"
            >
              Clear selection
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAction('addToCampaign')}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded text-sm font-medium transition-colors"
            title="Add selected leads to campaign"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add to Campaign</span>
          </button>

          <button
            onClick={() => handleAction('contact')}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded text-sm font-medium transition-colors"
            title="Mark selected as contacted"
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Mark Contacted</span>
          </button>

          <button
            onClick={() => handleAction('addTags')}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded text-sm font-medium transition-colors"
            title="Add tags to selected leads"
          >
            <Tag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Tag</span>
          </button>

          <button
            onClick={() => handleAction('export')}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded text-sm font-medium transition-colors"
            title="Export selected leads"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={() => handleAction('remove')}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 rounded text-sm font-medium transition-colors text-red-100"
            title="Remove selected leads from collection"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Remove</span>
          </button>

          <button
            onClick={onDeselectAll}
            className="p-1.5 hover:bg-primary-foreground/20 rounded transition-colors"
            title="Close bulk actions"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}