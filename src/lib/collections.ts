import { supabase } from './supabase';
import { LeadCollection, CreateCollectionData, UpdateCollectionData } from '../types/collection';

// Collections API helpers
export const collectionsApi = {
  // Create a new collection
  create: async (data: CreateCollectionData): Promise<{ data: LeadCollection | null; error: any }> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const collectionData = {
        name: data.name,
        description: data.description,
        user_id: user.id,
        criteria: data.criteria || {},
        lead_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data: collection, error } = await supabase
        .from('lead_collections')
        .insert([collectionData])
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      // Transform database response to match our interface
      const transformedCollection: LeadCollection = {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        leadCount: collection.lead_count,
        lastUpdated: new Date(collection.updated_at),
        createdAt: new Date(collection.created_at),
        userId: collection.user_id,
        criteria: collection.criteria
      };

      return { data: transformedCollection, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get all collections for the current user
  getAll: async (): Promise<{ data: LeadCollection[] | null; error: any }> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data: collections, error } = await supabase
        .from('lead_collections')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        return { data: null, error };
      }

      // Transform database response to match our interface
      const transformedCollections: LeadCollection[] = collections.map(collection => ({
        id: collection.id,
        name: collection.name,
        description: collection.description,
        leadCount: collection.lead_count,
        lastUpdated: new Date(collection.updated_at),
        createdAt: new Date(collection.created_at),
        userId: collection.user_id,
        criteria: collection.criteria || {}
      }));

      return { data: transformedCollections, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update an existing collection
  update: async (updateData: UpdateCollectionData): Promise<{ data: LeadCollection | null; error: any }> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const collectionData = {
        ...(updateData.name && { name: updateData.name }),
        ...(updateData.description !== undefined && { description: updateData.description }),
        ...(updateData.criteria && { criteria: updateData.criteria }),
        updated_at: new Date().toISOString()
      };

      const { data: collection, error } = await supabase
        .from('lead_collections')
        .update(collectionData)
        .eq('id', updateData.id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        return { data: null, error };
      }

      // Transform database response to match our interface
      const transformedCollection: LeadCollection = {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        leadCount: collection.lead_count,
        lastUpdated: new Date(collection.updated_at),
        createdAt: new Date(collection.created_at),
        userId: collection.user_id,
        criteria: collection.criteria
      };

      return { data: transformedCollection, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete a collection
  delete: async (collectionId: string): Promise<{ error: any }> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { error: { message: 'User not authenticated' } };
      }

      const { error } = await supabase
        .from('lead_collections')
        .delete()
        .eq('id', collectionId)
        .eq('user_id', user.id);

      return { error };
    } catch (error) {
      return { error };
    }
  },

  // Get a single collection by ID
  getById: async (collectionId: string): Promise<{ data: LeadCollection | null; error: any }> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { data: null, error: { message: 'User not authenticated' } };
      }

      const { data: collection, error } = await supabase
        .from('lead_collections')
        .select('*')
        .eq('id', collectionId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        return { data: null, error };
      }

      // Transform database response to match our interface
      const transformedCollection: LeadCollection = {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        leadCount: collection.lead_count,
        lastUpdated: new Date(collection.updated_at),
        createdAt: new Date(collection.created_at),
        userId: collection.user_id,
        criteria: collection.criteria
      };

      return { data: transformedCollection, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update lead count for a collection
  updateLeadCount: async (collectionId: string, leadCount: number): Promise<{ error: any }> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { error: { message: 'User not authenticated' } };
      }

      const { error } = await supabase
        .from('lead_collections')
        .update({ 
          lead_count: leadCount,
          updated_at: new Date().toISOString()
        })
        .eq('id', collectionId)
        .eq('user_id', user.id);

      return { error };
    } catch (error) {
      return { error };
    }
  }
};

// SQL for creating the collections table (for reference)
export const CREATE_COLLECTIONS_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS lead_collections (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    criteria JSONB DEFAULT '{}',
    lead_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- Add RLS policies
  ALTER TABLE lead_collections ENABLE ROW LEVEL SECURITY;

  -- Policy to allow users to see only their own collections
  CREATE POLICY "Users can view their own collections" ON lead_collections
    FOR SELECT USING (auth.uid() = user_id);

  -- Policy to allow users to insert their own collections
  CREATE POLICY "Users can insert their own collections" ON lead_collections
    FOR INSERT WITH CHECK (auth.uid() = user_id);

  -- Policy to allow users to update their own collections
  CREATE POLICY "Users can update their own collections" ON lead_collections
    FOR UPDATE USING (auth.uid() = user_id);

  -- Policy to allow users to delete their own collections
  CREATE POLICY "Users can delete their own collections" ON lead_collections
    FOR DELETE USING (auth.uid() = user_id);

  -- Index for better performance
  CREATE INDEX IF NOT EXISTS idx_lead_collections_user_id ON lead_collections(user_id);
  CREATE INDEX IF NOT EXISTS idx_lead_collections_updated_at ON lead_collections(updated_at);
`;