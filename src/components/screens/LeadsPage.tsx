import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, Plus, FolderPlus } from 'lucide-react';
import { useAuth } from '../App';
import { CollectionListView } from '../collections/CollectionListView';
import { CreateCollectionModal } from '../collections/CreateCollectionModal';
import { LeadCollection, CreateCollectionData } from '../../types/collection';

interface LeadsPageProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

// Mock data for collections
const mockCollections: LeadCollection[] = [
  {
    id: '1',
    name: 'Hot Prospects',
    description: 'High-priority leads ready for immediate follow-up',
    leadCount: 24,
    lastUpdated: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    userId: 'user1',
    criteria: { status: ['hot'] }
  },
  {
    id: '2',
    name: 'Website Leads',
    description: 'Leads generated from website contact forms',
    leadCount: 18,
    lastUpdated: new Date('2024-01-14'),
    createdAt: new Date('2024-01-08'),
    userId: 'user1',
    criteria: { source: ['Website'] }
  },
  {
    id: '3',
    name: 'Cold Outreach',
    description: 'Prospects identified for cold outreach campaigns',
    leadCount: 45,
    lastUpdated: new Date('2024-01-12'),
    createdAt: new Date('2024-01-05'),
    userId: 'user1',
    criteria: { status: ['cold'] }
  }
];

export function LeadsPage({ activeTab, onTabChange }: LeadsPageProps) {
  const { user, setShowAuthModal } = useAuth();
  const [collections, setCollections] = useState<LeadCollection[]>(mockCollections);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<LeadCollection | null>(null);
  const [loading, setLoading] = useState(false);
  
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
    // Navigate to collection detail page
    console.log('Navigate to detail view for:', collection);
    // This would typically use the router to navigate
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

  return (
    <div className="p-4 space-y-6">
      {/* Section 1: Create New Collection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FolderPlus className="h-5 w-5" />
                Lead Collections
              </CardTitle>
              <CardDescription className="mt-1">
                Organize and manage your leads with custom collections
              </CardDescription>
            </div>
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="h-4 w-4" />
              Create New Collection
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{collections.length}</div>
                <div className="text-xs">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {collections.reduce((sum, col) => sum + col.leadCount, 0)}
                </div>
                <div className="text-xs">Total Leads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(collections.reduce((sum, col) => sum + col.leadCount, 0) / Math.max(collections.length, 1))}
                </div>
                <div className="text-xs">Avg per Collection</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Manage Collections */}
      <CollectionListView
        collections={collections}
        onEdit={handleEditCollection}
        onDetailView={handleDetailView}
        onClone={handleCloneCollection}
        loading={loading}
      />

      {/* Create/Edit Collection Modal */}
      <CreateCollectionModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSave={handleSaveCollection}
        editingCollection={editingCollection}
        loading={loading}
      />
    </div>
  );
}