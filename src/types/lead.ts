export interface InstagramLead {
  id: string;
  instagramHandle: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  bio?: string;
  
  // Instagram Metrics
  followersCount: number;
  followingCount: number;
  postCount: number;
  lastPostDate?: Date;
  lastPostLikes?: number;
  lastPostComments?: number;
  
  // Calculated Fields
  engagementRate: number; // percentage
  qualityScore: LeadQualityScore;
  followerToFollowingRatio: number;
  
  // Lead Management
  collectionId: string;
  notes?: string;
  isContacted: boolean;
  contactedAt?: Date;
  tags: string[];
  
  // Timestamps
  createdAt: Date;
  lastUpdated: Date;
  lastActivity?: Date; // last post or story activity
}

export type LeadQualityScore = 'high' | 'medium' | 'low';

export interface CreateLeadData {
  instagramHandle: string;
  collectionId: string;
  notes?: string;
  tags?: string[];
}

export interface UpdateLeadData extends Partial<CreateLeadData> {
  id: string;
  isContacted?: boolean;
  contactedAt?: Date;
}

export interface BulkLeadAction {
  type: 'contact' | 'addToCampaign' | 'addTags' | 'remove' | 'export';
  leadIds: string[];
  data?: any; // Additional data based on action type
}

export interface LeadImportData {
  instagramHandles: string[];
  collectionId: string;
  skipDuplicates: boolean;
  autoCalculateQuality: boolean;
}

export interface LeadImportResult {
  successful: string[]; // Successfully imported handles
  duplicates: string[]; // Handles that already exist
  invalid: string[]; // Invalid Instagram handles
  total: number;
}

export interface LeadFilterCriteria {
  minFollowers?: number;
  maxFollowers?: number;
  minEngagement?: number;
  maxEngagement?: number;
  qualityScores?: LeadQualityScore[];
  isContacted?: boolean;
  tags?: string[];
  lastActivityDays?: number; // Activity within last N days
  searchQuery?: string; // Search in handle, name, or notes
}

export interface LeadAnalytics {
  totalLeads: number;
  qualityDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  averageEngagement: number;
  averageFollowers: number;
  contactedCount: number;
  recentActivityCount: number; // Active in last 7 days
}

// Table sorting
export interface LeadSort {
  column: keyof InstagramLead;
  direction: 'asc' | 'desc';
}

// Component props interfaces
export interface LeadTableColumn {
  key: keyof InstagramLead;
  label: string;
  sortable: boolean;
  width?: string;
  render?: (lead: InstagramLead) => React.ReactNode;
}

export interface LeadAction {
  type: 'view' | 'edit' | 'contact' | 'addToCampaign' | 'remove';
  label: string;
  icon: string;
  className?: string;
  onClick: (lead: InstagramLead) => void;
}