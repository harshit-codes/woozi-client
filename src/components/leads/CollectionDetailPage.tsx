import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Plus, 
  Download, 
  Rocket, 
  Filter,
  Search,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  Edit3,
  Copy,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { InstagramLead, LeadSort, BulkLeadAction, LeadFilterCriteria } from '../../types/lead';
import { LeadCollection } from '../../types/collection';
import { InstagramLeadRow } from './InstagramLeadRow';
import { BulkActionBar } from './BulkActionBar';

interface CollectionDetailPageProps {
  collection: LeadCollection;
  leads: InstagramLead[];
  onBack: () => void;
  onAddLeads: () => void;
  onExport: () => void;
  onLaunchCampaign: () => void;
  onViewLeadProfile: (lead: InstagramLead) => void;
  onAddToCampaign: (lead: InstagramLead) => void;
  onToggleContact: (lead: InstagramLead) => void;
  onBulkAction: (action: BulkLeadAction) => void;
  onEditCollection: () => void;
  onDuplicateCollection: () => void;
  onDeleteCollection: () => void;
}

export function CollectionDetailPage({
  collection,
  leads,
  onBack,
  onAddLeads,
  onExport,
  onLaunchCampaign,
  onViewLeadProfile,
  onAddToCampaign,
  onToggleContact,
  onBulkAction,
  onEditCollection,
  onDuplicateCollection,
  onDeleteCollection
}: CollectionDetailPageProps) {
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState<LeadSort>({
    column: 'followersCount',
    direction: 'desc'
  });
  const [filters, setFilters] = useState<LeadFilterCriteria>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showOptionsMenu) {
        setShowOptionsMenu(false);
      }
    };
    
    if (showOptionsMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showOptionsMenu]);

  // Filter and sort leads
  const filteredAndSortedLeads = useMemo(() => {
    let filtered = leads;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(lead => 
        lead.instagramHandle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filters.minFollowers) {
      filtered = filtered.filter(lead => lead.followersCount >= filters.minFollowers!);
    }
    if (filters.maxFollowers) {
      filtered = filtered.filter(lead => lead.followersCount <= filters.maxFollowers!);
    }
    if (filters.minEngagement) {
      filtered = filtered.filter(lead => lead.engagementRate >= filters.minEngagement!);
    }
    if (filters.qualityScores?.length) {
      filtered = filtered.filter(lead => filters.qualityScores!.includes(lead.qualityScore));
    }
    if (filters.isContacted !== undefined) {
      filtered = filtered.filter(lead => lead.isContacted === filters.isContacted);
    }

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sort.column];
      const bValue = b[sort.column];
      
      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [leads, searchQuery, filters, sort]);

  // Calculate analytics
  const analytics = useMemo(() => {
    const totalLeads = leads.length;
    const qualityDistribution = leads.reduce(
      (acc, lead) => {
        acc[lead.qualityScore]++;
        return acc;
      },
      { high: 0, medium: 0, low: 0 }
    );
    
    const averageEngagement = leads.length > 0 
      ? leads.reduce((sum, lead) => sum + lead.engagementRate, 0) / leads.length 
      : 0;
    
    const contactedCount = leads.filter(lead => lead.isContacted).length;

    return {
      totalLeads,
      qualityDistribution,
      averageEngagement,
      contactedCount
    };
  }, [leads]);

  const handleSelectLead = (leadId: string, selected: boolean) => {
    if (selected) {
      setSelectedLeadIds(prev => [...prev, leadId]);
    } else {
      setSelectedLeadIds(prev => prev.filter(id => id !== leadId));
    }
  };

  const handleSelectAll = () => {
    setSelectedLeadIds(filteredAndSortedLeads.map(lead => lead.id));
  };

  const handleDeselectAll = () => {
    setSelectedLeadIds([]);
  };

  const handleSort = (column: keyof InstagramLead) => {
    if (sort.column === column) {
      setSort(prev => ({
        ...prev,
        direction: prev.direction === 'asc' ? 'desc' : 'asc'
      }));
    } else {
      setSort({ column, direction: 'desc' });
    }
  };

  const SortIcon = ({ column }: { column: keyof InstagramLead }) => {
    if (sort.column !== column) return null;
    return sort.direction === 'asc' ? 
      <ChevronUp className="h-3 w-3" /> : 
      <ChevronDown className="h-3 w-3" />;
  };

  if (leads.length === 0) {
    return (
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xl font-semibold">{collection.name}</h1>
            <p className="text-sm text-muted-foreground">{collection.description}</p>
          </div>
        </div>

        {/* Empty State */}
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No leads in this collection</h3>
            <p className="text-muted-foreground mb-4">
              Start by importing Instagram handles to build your collection.
            </p>
            <button
              onClick={onAddLeads}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Import Leads
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xl font-semibold">{collection.name}</h1>
            <p className="text-sm text-muted-foreground">{collection.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAddLeads}
            className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Leads
          </button>
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            onClick={onLaunchCampaign}
            className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Rocket className="h-4 w-4" />
            Launch Campaign
          </button>
          
          {/* Collection Options Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowOptionsMenu(!showOptionsMenu);
              }}
              className="p-2 border rounded-md hover:bg-muted transition-colors"
              title="Collection options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            
            {showOptionsMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onEditCollection();
                      setShowOptionsMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    Edit Collection
                  </button>
                  <button
                    onClick={() => {
                      onDuplicateCollection();
                      setShowOptionsMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    Duplicate Collection
                  </button>
                  <div className="border-t my-1"></div>
                  <button
                    onClick={() => {
                      onDeleteCollection();
                      setShowOptionsMenu(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Collection
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{analytics.totalLeads}</div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{analytics.qualityDistribution.high}</div>
            <div className="text-sm text-muted-foreground">High Quality</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{analytics.averageEngagement.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Avg Engagement</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{analytics.contactedCount}</div>
            <div className="text-sm text-muted-foreground">Contacted</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by handle, name, or notes..."
            className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Leads Table */}
      <Card>
        <BulkActionBar
          selectedCount={selectedLeadIds.length}
          totalCount={filteredAndSortedLeads.length}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onBulkAction={onBulkAction}
          selectedLeadIds={selectedLeadIds}
        />
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-3 w-8"></th>
                <th className="text-left p-3 font-medium text-sm">
                  Instagram Handle
                </th>
                <th 
                  className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort('followersCount')}
                >
                  <div className="flex items-center gap-1">
                    Followers
                    <SortIcon column="followersCount" />
                  </div>
                </th>
                <th 
                  className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort('postCount')}
                >
                  <div className="flex items-center gap-1">
                    Posts
                    <SortIcon column="postCount" />
                  </div>
                </th>
                <th 
                  className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort('engagementRate')}
                >
                  <div className="flex items-center gap-1">
                    Engagement
                    <SortIcon column="engagementRate" />
                  </div>
                </th>
                <th className="text-left p-3 font-medium text-sm">Quality</th>
                <th 
                  className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort('lastActivity')}
                >
                  <div className="flex items-center gap-1">
                    Last Activity
                    <SortIcon column="lastActivity" />
                  </div>
                </th>
                <th className="text-left p-3 font-medium text-sm">Status</th>
                <th className="text-left p-3 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedLeads.map(lead => (
                <InstagramLeadRow
                  key={lead.id}
                  lead={lead}
                  isSelected={selectedLeadIds.includes(lead.id)}
                  onSelect={handleSelectLead}
                  onViewProfile={onViewLeadProfile}
                  onAddToCampaign={onAddToCampaign}
                  onToggleContact={onToggleContact}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}