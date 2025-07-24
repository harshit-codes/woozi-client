export interface LeadCollection {
  id: string;
  name: string;
  description?: string;
  leadCount: number;
  lastUpdated: Date;
  createdAt: Date;
  userId: string;
  // Criteria for lead selection (can be expanded based on lead filtering needs)
  criteria?: {
    status?: string[];
    source?: string[];
    dateRange?: {
      from?: Date;
      to?: Date;
    };
    tags?: string[];
  };
}

export interface CreateCollectionData {
  name: string;
  description?: string;
  criteria?: LeadCollection['criteria'];
}

export interface UpdateCollectionData extends Partial<CreateCollectionData> {
  id: string;
}

export interface CollectionTableColumn {
  key: keyof LeadCollection;
  label: string;
  sortable: boolean;
  width?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface CollectionSort {
  column: keyof LeadCollection;
  direction: SortDirection;
}

export interface CollectionAction {
  type: 'edit' | 'detail' | 'clone' | 'delete';
  label: string;
  icon: string;
  className?: string;
}