import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, Plus, Filter } from 'lucide-react';
import { useAuth } from '../App';
import { CollectionCardView } from '../collections/CollectionCardView';
import { CreateCollectionModal } from '../collections/CreateCollectionModal';
import { FilterModal } from '../collections/FilterModal';
import { CollectionDetailPage } from '../leads/CollectionDetailPage';
import { LeadProfileModal } from '../leads/LeadProfileModal';
import { LeadImportModal } from '../leads/LeadImportModal';
import { ActionButton, VStack, HStack, Heading3, usePagination, LeadManagementTrio, extensionPatterns, getSpaceYClass, IconButton } from '../ui/design-system';
import { CompactShadcnPagination } from '../ui/ShadcnPagination';
import { LeadCollection, CreateCollectionData } from '../../types/collection';
import { InstagramLead, LeadImportData, LeadImportResult, BulkLeadAction } from '../../types/lead';

interface FilterOptions {
  sortBy: 'created' | 'updated' | 'leadCount' | 'name';
  sortOrder: 'asc' | 'desc';
  leadCountMin?: number;
  leadCountMax?: number;
  dateRange?: 'week' | 'month' | 'quarter' | 'year' | 'all';
}

interface LeadsPageProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

// Mock data for collections with Instagram analytics
const mockCollections: LeadCollection[] = [
  {
    id: '1',
    name: 'Tech Founders',
    description: 'Instagram profiles of startup founders and tech entrepreneurs',
    leadCount: 24,
    lastUpdated: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    userId: 'user1',
    criteria: { tags: ['tech', 'founder'] }
  },
  {
    id: '2',
    name: 'Fitness Influencers',
    description: 'Health and fitness content creators on Instagram',
    leadCount: 18,
    lastUpdated: new Date('2024-01-14'),
    createdAt: new Date('2024-01-08'),
    userId: 'user1',
    criteria: { tags: ['fitness', 'health'] }
  },
  {
    id: '3',
    name: 'SaaS Marketers',
    description: 'Marketing professionals in the SaaS industry',
    leadCount: 45,
    lastUpdated: new Date('2024-01-12'),
    createdAt: new Date('2024-01-05'),
    userId: 'user1',
    criteria: { tags: ['saas', 'marketing'] }
  },
  {
    id: '4',
    name: 'E-commerce Brands',
    description: 'Online store owners and e-commerce entrepreneurs',
    leadCount: 32,
    lastUpdated: new Date('2024-01-11'),
    createdAt: new Date('2024-01-03'),
    userId: 'user1',
    criteria: { tags: ['ecommerce', 'retail', 'business'] }
  },
  {
    id: '5',
    name: 'Food Bloggers',
    description: 'Culinary content creators and food enthusiasts',
    leadCount: 27,
    lastUpdated: new Date('2024-01-10'),
    createdAt: new Date('2024-01-02'),
    userId: 'user1',
    criteria: { tags: ['food', 'cooking', 'lifestyle'] }
  },
  {
    id: '6',
    name: 'Travel Photographers',
    description: 'Professional photographers specializing in travel content',
    leadCount: 19,
    lastUpdated: new Date('2024-01-09'),
    createdAt: new Date('2024-01-01'),
    userId: 'user1',
    criteria: { tags: ['travel', 'photography', 'adventure'] }
  },
  {
    id: '7',
    name: 'Digital Nomads',
    description: 'Remote workers and location-independent professionals',
    leadCount: 38,
    lastUpdated: new Date('2024-01-08'),
    createdAt: new Date('2023-12-30'),
    userId: 'user1',
    criteria: { tags: ['remote-work', 'travel', 'lifestyle'] }
  },
  {
    id: '8',
    name: 'Beauty Creators',
    description: 'Makeup artists and beauty content creators',
    leadCount: 41,
    lastUpdated: new Date('2024-01-07'),
    createdAt: new Date('2023-12-28'),
    userId: 'user1',
    criteria: { tags: ['beauty', 'makeup', 'skincare'] }
  }
];

// Mock Instagram leads data
const mockInstagramLeads: Record<string, InstagramLead[]> = {
  '1': [
    {
      id: 'lead1',
      instagramHandle: 'techfounder',
      fullName: 'Alex Thompson',
      followersCount: 12500,
      followingCount: 850,
      postCount: 245,
      engagementRate: 3.2,
      qualityScore: 'high',
      followerToFollowingRatio: 14.7,
      lastActivity: new Date('2024-01-14'),
      isContacted: false,
      tags: ['tech', 'founder', 'ai'],
      notes: 'Strong engagement on AI and startup content',
      createdAt: new Date('2024-01-10'),
      lastPostDate: new Date('2024-01-13'),
      lastPostLikes: 425,
      lastPostComments: 32
    },
    {
      id: 'lead2',
      instagramHandle: 'startup_jane',
      fullName: 'Jane Smith',
      followersCount: 8900,
      followingCount: 1200,
      postCount: 156,
      engagementRate: 2.8,
      qualityScore: 'medium',
      followerToFollowingRatio: 7.4,
      lastActivity: new Date('2024-01-12'),
      isContacted: true,
      contactedAt: new Date('2024-01-10'),
      tags: ['startup', 'fintech'],
      notes: 'Responded positively to initial outreach',
      createdAt: new Date('2024-01-08'),
      lastPostDate: new Date('2024-01-11'),
      lastPostLikes: 189,
      lastPostComments: 15
    }
  ],
  '2': [
    {
      id: 'lead3',
      instagramHandle: 'fitlife_coach',
      fullName: 'Mike Johnson',
      followersCount: 25600,
      followingCount: 650,
      postCount: 432,
      engagementRate: 4.1,
      qualityScore: 'high',
      followerToFollowingRatio: 39.4,
      lastActivity: new Date('2024-01-15'),
      isContacted: false,
      tags: ['fitness', 'coaching', 'nutrition'],
      notes: 'High-quality content, great engagement rates',
      createdAt: new Date('2024-01-08'),
      lastPostDate: new Date('2024-01-14'),
      lastPostLikes: 1250,
      lastPostComments: 89
    }
  ],
  '3': [
    {
      id: 'lead4',
      instagramHandle: 'saas_guru',
      fullName: 'Sarah Wilson',
      followersCount: 15300,
      followingCount: 420,
      postCount: 298,
      engagementRate: 3.7,
      qualityScore: 'high',
      followerToFollowingRatio: 36.4,
      lastActivity: new Date('2024-01-13'),
      isContacted: false,
      tags: ['saas', 'marketing', 'growth'],
      notes: 'Expert in SaaS growth strategies',
      createdAt: new Date('2024-01-05'),
      lastPostDate: new Date('2024-01-12'),
      lastPostLikes: 680,
      lastPostComments: 45
    }
  ],
  '4': [
    {
      id: 'lead5',
      instagramHandle: 'ecommerce_pro',
      fullName: 'Maria Rodriguez',
      followersCount: 18700,
      followingCount: 890,
      postCount: 367,
      engagementRate: 3.4,
      qualityScore: 'high',
      followerToFollowingRatio: 21.0,
      lastActivity: new Date('2024-01-13'),
      isContacted: false,
      tags: ['ecommerce', 'business', 'shopify'],
      notes: 'Successful Shopify store owner with great content',
      createdAt: new Date('2024-01-03'),
      lastPostDate: new Date('2024-01-12'),
      lastPostLikes: 890,
      lastPostComments: 67
    }
  ],
  '5': [
    {
      id: 'lead6',
      instagramHandle: 'foodie_adventures',
      fullName: 'David Chen',
      followersCount: 22100,
      followingCount: 1150,
      postCount: 512,
      engagementRate: 4.2,
      qualityScore: 'high',
      followerToFollowingRatio: 19.2,
      lastActivity: new Date('2024-01-14'),
      isContacted: true,
      contactedAt: new Date('2024-01-09'),
      tags: ['food', 'cooking', 'recipes'],
      notes: 'Amazing food photography and recipe content',
      createdAt: new Date('2024-01-02'),
      lastPostDate: new Date('2024-01-13'),
      lastPostLikes: 1340,
      lastPostComments: 98
    }
  ],
  '6': [
    {
      id: 'lead7',
      instagramHandle: 'wanderlust_lens',
      fullName: 'Emily Johnson',
      followersCount: 31500,
      followingCount: 720,
      postCount: 289,
      engagementRate: 3.8,
      qualityScore: 'high',
      followerToFollowingRatio: 43.8,
      lastActivity: new Date('2024-01-15'),
      isContacted: false,
      tags: ['travel', 'photography', 'landscape'],
      notes: 'Professional travel photographer with stunning visuals',
      createdAt: new Date('2024-01-01'),
      lastPostDate: new Date('2024-01-14'),
      lastPostLikes: 2100,
      lastPostComments: 145
    }
  ],
  '7': [
    {
      id: 'lead8',
      instagramHandle: 'nomad_life_official',
      fullName: 'Alex Turner',
      followersCount: 27800,
      followingCount: 980,
      postCount: 445,
      engagementRate: 3.1,
      qualityScore: 'medium',
      followerToFollowingRatio: 28.4,
      lastActivity: new Date('2024-01-12'),
      isContacted: true,
      contactedAt: new Date('2024-01-06'),
      tags: ['remote-work', 'travel', 'productivity'],
      notes: 'Experienced digital nomad sharing location independence tips',
      createdAt: new Date('2023-12-30'),
      lastPostDate: new Date('2024-01-11'),
      lastPostLikes: 756,
      lastPostComments: 52
    }
  ],
  '8': [
    {
      id: 'lead9',
      instagramHandle: 'beauty_guru_official',
      fullName: 'Sophie Williams',
      followersCount: 45200,
      followingCount: 1200,
      postCount: 623,
      engagementRate: 4.5,
      qualityScore: 'high',
      followerToFollowingRatio: 37.7,
      lastActivity: new Date('2024-01-16'),
      isContacted: false,
      tags: ['beauty', 'makeup', 'tutorials'],
      notes: 'Top beauty influencer with excellent engagement rates',
      createdAt: new Date('2023-12-28'),
      lastPostDate: new Date('2024-01-15'),
      lastPostLikes: 3200,
      lastPostComments: 234
    }
  ]
};

// Mock analytics data
const mockAnalytics = {
  '1': {
    qualityDistribution: { high: 15, medium: 7, low: 2 },
    averageEngagement: 3.1
  },
  '2': {
    qualityDistribution: { high: 12, medium: 4, low: 2 },
    averageEngagement: 3.8
  },
  '3': {
    qualityDistribution: { high: 28, medium: 12, low: 5 },
    averageEngagement: 2.9
  },
  '4': {
    qualityDistribution: { high: 20, medium: 9, low: 3 },
    averageEngagement: 3.2
  },
  '5': {
    qualityDistribution: { high: 18, medium: 7, low: 2 },
    averageEngagement: 4.1
  },
  '6': {
    qualityDistribution: { high: 15, medium: 3, low: 1 },
    averageEngagement: 3.8
  },
  '7': {
    qualityDistribution: { high: 22, medium: 13, low: 3 },
    averageEngagement: 3.0
  },
  '8': {
    qualityDistribution: { high: 30, medium: 8, low: 3 },
    averageEngagement: 4.3
  }
};

export function LeadsPage({ activeTab, onTabChange }: LeadsPageProps) {
  const { user, setShowAuthModal } = useAuth();
  const [collections, setCollections] = useState<LeadCollection[]>(mockCollections);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<LeadCollection | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Pagination state - Chrome extension optimized configuration
  const itemsPerPage = 3; // Chrome extension optimized: 3 cards per page
  
  // Navigation state
  const [currentView, setCurrentView] = useState<'list' | 'detail'>('list');
  const [selectedCollection, setSelectedCollection] = useState<LeadCollection | null>(null);
  
  // Modal states
  const [selectedLead, setSelectedLead] = useState<InstagramLead | null>(null);
  const [showLeadProfile, setShowLeadProfile] = useState(false);
  const [showLeadImport, setShowLeadImport] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'updated',
    sortOrder: 'desc',
    dateRange: 'all'
  });
  
  // Lead data
  const [instagramLeads, setInstagramLeads] = useState<Record<string, InstagramLead[]>>(mockInstagramLeads);
  
  // Apply filters and sorting
  const applyFilters = (collections: LeadCollection[], filters: FilterOptions): LeadCollection[] => {
    let filtered = [...collections];
    
    // Apply date range filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();
      
      switch (filters.dateRange) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          cutoffDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(col => col.lastUpdated >= cutoffDate);
    }
    
    // Apply lead count range filter
    if (filters.leadCountMin !== undefined) {
      filtered = filtered.filter(col => col.leadCount >= filters.leadCountMin!);
    }
    if (filters.leadCountMax !== undefined) {
      filtered = filtered.filter(col => col.leadCount <= filters.leadCountMax!);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'created':
          aValue = a.createdAt.getTime();
          bValue = b.createdAt.getTime();
          break;
        case 'updated':
          aValue = a.lastUpdated.getTime();
          bValue = b.lastUpdated.getTime();
          break;
        case 'leadCount':
          aValue = a.leadCount;
          bValue = b.leadCount;
          break;
        default:
          return 0;
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
    
    return filtered;
  };
  
  // Get filtered collections
  const filteredCollections = applyFilters(collections, filters);
  
  // Calculate metrics based on filtered collections
  const totalCollections = filteredCollections.length;
  const totalLeads = filteredCollections.reduce((sum, col) => sum + col.leadCount, 0);
  const totalWonLeads = Object.values(instagramLeads).flat().filter(lead => lead.isContacted).length;
  
  // Update pagination to use filtered collections
  const { 
    currentPage: filteredCurrentPage,
    totalPages: filteredTotalPages,
    setCurrentPage: setFilteredCurrentPage,
    startIndex: filteredStartIndex,
    endIndex: filteredEndIndex
  } = usePagination({
    totalItems: filteredCollections.length,
    itemsPerPage,
    initialPage: 1
  });
  
  // Get paginated collections from filtered results
  const paginatedCollections = filteredCollections.slice(filteredStartIndex, filteredEndIndex);
  
  // Action handlers
  const handleCreateCollection = (data: CreateCollectionData) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newCollection: LeadCollection = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        leadCount: 0,
        lastUpdated: new Date(),
        createdAt: new Date(),
        userId: user?.id || '',
        criteria: data.criteria
      };
      
      setCollections(prev => [newCollection, ...prev]);
      setShowCreateModal(false);
      setEditingCollection(null);
      setLoading(false);
    }, 1000);
  };

  const handleEditCollection = (collection: LeadCollection) => {
    setEditingCollection(collection);
    setShowCreateModal(true);
  };

  const handleUpdateCollection = (data: CreateCollectionData) => {
    if (!editingCollection) return;
    
    setLoading(true);
    setTimeout(() => {
      setCollections(prev => prev.map(col => 
        col.id === editingCollection.id 
          ? { ...col, ...data, lastUpdated: new Date() }
          : col
      ));
      setShowCreateModal(false);
      setEditingCollection(null);
      setLoading(false);
    }, 1000);
  };

  const handleDetailView = (collection: LeadCollection) => {
    setSelectedCollection(collection);
    setCurrentView('detail');
  };
  
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCollection(null);
  };

  const handleCloneCollection = (collection: LeadCollection) => {
    const clonedData: CreateCollectionData = {
      name: `Copy of ${collection.name}`,
      description: collection.description,
      criteria: collection.criteria
    };
    
    // Open create modal with pre-populated data
    setEditingCollection({ ...collection, ...clonedData } as LeadCollection);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingCollection(null);
  };

  const handleSaveCollection = (data: CreateCollectionData) => {
    if (editingCollection && editingCollection.id && !editingCollection.name.startsWith('Copy of')) {
      // Editing existing collection
      handleUpdateCollection(data);
    } else {
      // Creating new collection (including clones)
      handleCreateCollection(data);
    }
  };
  
  // Instagram lead handlers
  const handleViewLeadProfile = (lead: InstagramLead) => {
    setSelectedLead(lead);
    setShowLeadProfile(true);
  };
  
  const handleAddToCampaign = (lead: InstagramLead) => {
    console.log('Add to campaign:', lead.instagramHandle);
    // This would open campaign selection modal
  };
  
  const handleToggleContact = (lead: InstagramLead) => {
    if (!selectedCollection) return;
    
    setInstagramLeads(prev => ({
      ...prev,
      [selectedCollection.id]: prev[selectedCollection.id]?.map(l => 
        l.id === lead.id 
          ? { ...l, isContacted: !l.isContacted, contactedAt: !l.isContacted ? new Date() : undefined }
          : l
      ) || []
    }));
  };
  
  const handleUpdateNotes = (leadId: string, notes: string) => {
    if (!selectedCollection) return;
    
    setInstagramLeads(prev => ({
      ...prev,
      [selectedCollection.id]: prev[selectedCollection.id]?.map(l => 
        l.id === leadId ? { ...l, notes } : l
      ) || []
    }));
  };
  
  const handleRemoveFromCollection = (lead: InstagramLead) => {
    if (!selectedCollection) return;
    
    setInstagramLeads(prev => ({
      ...prev,
      [selectedCollection.id]: prev[selectedCollection.id]?.filter(l => l.id !== lead.id) || []
    }));
    
    // Update collection lead count
    setCollections(prev => prev.map(col => 
      col.id === selectedCollection.id 
        ? { ...col, leadCount: Math.max(0, col.leadCount - 1), lastUpdated: new Date() }
        : col
    ));
    
    setShowLeadProfile(false);
  };
  
  const handleAddLeads = () => {
    setShowLeadImport(true);
  };
  
  const handleImportLeads = async (data: LeadImportData): Promise<LeadImportResult> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const successful = data.instagramHandles.filter(handle => 
          validateInstagramHandle(handle)
        );
        const invalid = data.instagramHandles.filter(handle => 
          !validateInstagramHandle(handle)
        );
        
        // Add successful leads to collection
        const newLeads: InstagramLead[] = successful.map(handle => ({
          id: `lead_${Date.now()}_${Math.random()}`,
          instagramHandle: handle,
          followersCount: Math.floor(Math.random() * 50000) + 1000,
          followingCount: Math.floor(Math.random() * 2000) + 100,
          postCount: Math.floor(Math.random() * 500) + 50,
          engagementRate: Math.random() * 5 + 1,
          qualityScore: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
          followerToFollowingRatio: 0,
          lastActivity: new Date(),
          isContacted: false,
          tags: [],
          createdAt: new Date()
        }));
        
        if (selectedCollection) {
          setInstagramLeads(prev => ({
            ...prev,
            [selectedCollection.id]: [...(prev[selectedCollection.id] || []), ...newLeads]
          }));
          
          // Update collection lead count
          setCollections(prev => prev.map(col => 
            col.id === selectedCollection.id 
              ? { ...col, leadCount: col.leadCount + successful.length, lastUpdated: new Date() }
              : col
          ));
        }
        
        resolve({
          successful,
          duplicates: [],
          invalid
        });
      }, 1500);
    });
  };
  
  const handleBulkAction = (action: BulkLeadAction) => {
    console.log('Bulk action:', action);
    // Handle bulk actions like add to campaign, mark contacted, etc.
  };
  
  const handleExport = () => {
    console.log('Export collection:', selectedCollection?.name);
  };
  
  const handleLaunchCampaign = () => {
    console.log('Launch campaign for collection:', selectedCollection?.name);
  };
  
  const handleDeleteCollection = (collection: LeadCollection) => {
    if (window.confirm(`Are you sure you want to delete "${collection.name}"? This action cannot be undone.`)) {
      setCollections(prev => prev.filter(col => col.id !== collection.id));
      // Also remove associated leads
      setInstagramLeads(prev => {
        const updated = { ...prev };
        delete updated[collection.id];
        return updated;
      });
      // Go back to list view
      handleBackToList();
    }
  };
  
  const validateInstagramHandle = (handle: string): boolean => {
    const cleanHandle = handle.replace('@', '').trim();
    const instagramRegex = /^[a-zA-Z0-9_\.]{1,30}$/;
    return instagramRegex.test(cleanHandle) && cleanHandle.length >= 1;
  };
  
  // Filter handlers
  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setFilteredCurrentPage(1);
  };

  if (!user) {
    return (
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Lead Collections</CardTitle>
            <CardDescription>
              Sign in to create and manage your lead collections
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Organize your prospects into collections and manage your sales pipeline effectively</p>
              </div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Sign In to Access Collections
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render collection detail view
  if (currentView === 'detail' && selectedCollection) {
    const collectionLeads = instagramLeads[selectedCollection.id] || [];
    
    return (
      <>
        <CollectionDetailPage
          collection={selectedCollection}
          leads={collectionLeads}
          onBack={handleBackToList}
          onAddLeads={handleAddLeads}
          onExport={handleExport}
          onLaunchCampaign={handleLaunchCampaign}
          onViewLeadProfile={handleViewLeadProfile}
          onAddToCampaign={handleAddToCampaign}
          onToggleContact={handleToggleContact}
          onBulkAction={handleBulkAction}
          onEditCollection={() => handleEditCollection(selectedCollection)}
          onDuplicateCollection={() => handleCloneCollection(selectedCollection)}
          onDeleteCollection={() => handleDeleteCollection(selectedCollection)}
        />
        
        {/* Lead Profile Modal */}
        {selectedLead && (
          <LeadProfileModal
            lead={selectedLead}
            isOpen={showLeadProfile}
            onClose={() => setShowLeadProfile(false)}
            onAddToCampaign={handleAddToCampaign}
            onUpdateNotes={handleUpdateNotes}
            onToggleContact={handleToggleContact}
            onRemoveFromCollection={handleRemoveFromCollection}
          />
        )}
        
        {/* Lead Import Modal */}
        <LeadImportModal
          isOpen={showLeadImport}
          onClose={() => setShowLeadImport(false)}
          onImport={handleImportLeads}
          collectionId={selectedCollection.id}
          collectionName={selectedCollection.name}
        />
      </>
    );
  }
  
  // Render collections list view
  return (
    <div className="flex flex-col min-h-full p-4">
      <VStack gap="lg" className="flex-1">
        {/* Metrics Trio - moved to top */}
        <LeadManagementTrio
          totalCollections={totalCollections}
          totalLeads={totalLeads}
          totalWon={totalWonLeads}
          gap="sm"
          size="sm"
        />

        {/* CTA + Filter - horizontal layout */}
        <HStack gap="sm" className="w-full">
          <ActionButton 
            variant="default" 
            size="default" 
            icon={Plus}
            onClick={() => setShowCreateModal(true)}
            className="flex-1 justify-center"
          >
            Create New Collection
          </ActionButton>
          <IconButton
            icon={Filter}
            variant="outline"
            size="icon-sm"
            onClick={() => setShowFilterModal(true)}
          />
        </HStack>

        {/* Collections List */}
        <VStack gap="md" className="w-full flex-1">
          <CollectionCardView
            collections={paginatedCollections}
            onEdit={handleDetailView}
            loading={loading}
          />
        </VStack>
      </VStack>

      {/* Pagination - Fixed at bottom */}
      {filteredTotalPages > 1 && (
        <div className="mt-auto pt-4">
          <CompactShadcnPagination
            currentPage={filteredCurrentPage}
            totalPages={filteredTotalPages}
            onPageChange={setFilteredCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalCollections}
            itemName="collections"
            showInfo={false}
          />
        </div>
      )}

      {/* Create/Edit Collection Modal */}
      <CreateCollectionModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSave={handleSaveCollection}
        editingCollection={editingCollection}
        loading={loading}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  );
}