import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  MessageSquare, 
  StickyNote, 
  UserCheck, 
  Calendar,
  Users,
  Image,
  Heart,
  MessageCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { InstagramLead } from '../../types/lead';
import { LeadQualityBadge } from './LeadQualityBadge';

interface LeadProfileModalProps {
  lead: InstagramLead;
  isOpen: boolean;
  onClose: () => void;
  onAddToCampaign: (lead: InstagramLead) => void;
  onUpdateNotes: (leadId: string, notes: string) => void;
  onToggleContact: (lead: InstagramLead) => void;
  onRemoveFromCollection: (lead: InstagramLead) => void;
}

export function LeadProfileModal({
  lead,
  isOpen,
  onClose,
  onAddToCampaign,
  onUpdateNotes,
  onToggleContact,
  onRemoveFromCollection
}: LeadProfileModalProps) {
  const [notes, setNotes] = useState(lead.notes || '');
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  if (!isOpen) return null;

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  const formatDate = (date?: Date): string => {
    if (!date) return 'Never';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEngagementTrend = (rate: number): { icon: React.ReactNode; color: string; label: string } => {
    if (rate >= 4) {
      return {
        icon: <TrendingUp className="h-4 w-4" />,
        color: 'text-green-600',
        label: 'Excellent engagement'
      };
    } else if (rate >= 2) {
      return {
        icon: <TrendingUp className="h-4 w-4" />,
        color: 'text-yellow-600',
        label: 'Good engagement'
      };
    } else {
      return {
        icon: <TrendingUp className="h-4 w-4" />,
        color: 'text-red-600',
        label: 'Low engagement'
      };
    }
  };

  const handleSaveNotes = () => {
    onUpdateNotes(lead.id, notes);
    setIsEditingNotes(false);
  };

  const handleCancelNotes = () => {
    setNotes(lead.notes || '');
    setIsEditingNotes(false);
  };

  const engagementTrend = getEngagementTrend(lead.engagementRate);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-medium">
              {lead.instagramHandle[1]?.toUpperCase() || 'I'}
            </div>
            <div>
              <h2 className="text-xl font-semibold">@{lead.instagramHandle}</h2>
              {lead.fullName && (
                <p className="text-muted-foreground">{lead.fullName}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Instagram Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-xl font-bold">{formatNumber(lead.followersCount)}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-xl font-bold">{formatNumber(lead.followingCount)}</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Image className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-xl font-bold">{lead.postCount}</div>
                <div className="text-sm text-muted-foreground">Posts</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                </div>
                <div className={`text-xl font-bold ${engagementTrend.color}`}>
                  {lead.engagementRate.toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Engagement</div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Profile Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Quality Score</span>
                      <LeadQualityBadge quality={lead.qualityScore} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Follower Ratio</span>
                      <span className="text-sm font-medium">
                        {lead.followerToFollowingRatio.toFixed(1)}:1
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Activity</span>
                      <span className="text-sm font-medium">
                        {formatDate(lead.lastActivity)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Added to Collection</span>
                      <span className="text-sm font-medium">
                        {formatDate(lead.createdAt)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              {lead.lastPostDate && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Last Post</span>
                        <span className="text-sm font-medium">
                          {formatDate(lead.lastPostDate)}
                        </span>
                      </div>
                      
                      {lead.lastPostLikes && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Post Likes</span>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-pink-500" />
                            <span className="text-sm font-medium">
                              {formatNumber(lead.lastPostLikes)}
                            </span>
                          </div>
                        </div>
                      )}

                      {lead.lastPostComments && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Post Comments</span>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3 text-blue-500" />
                            <span className="text-sm font-medium">
                              {formatNumber(lead.lastPostComments)}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2">
                          {engagementTrend.icon}
                          <span className={`text-sm font-medium ${engagementTrend.color}`}>
                            {engagementTrend.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Contact Status */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Contact Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status</span>
                      <button
                        onClick={() => onToggleContact(lead)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          lead.isContacted
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {lead.isContacted ? 'Contacted' : 'Not Contacted'}
                      </button>
                    </div>

                    {lead.isContacted && lead.contactedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Contacted On</span>
                        <span className="text-sm font-medium">
                          {formatDate(lead.contactedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              {lead.tags.length > 0 && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {lead.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notes */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Notes</h3>
                    {!isEditingNotes && (
                      <button
                        onClick={() => setIsEditingNotes(true)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        {lead.notes ? 'Edit' : 'Add Notes'}
                      </button>
                    )}
                  </div>

                  {isEditingNotes ? (
                    <div className="space-y-3">
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes about this lead..."
                        className="w-full p-3 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveNotes}
                          className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-medium hover:bg-primary/90"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelNotes}
                          className="px-3 py-1 border rounded text-sm font-medium hover:bg-muted"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {lead.notes || 'No notes added yet.'}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t bg-muted/30">
          <div className="flex items-center gap-2">
            <a
              href={`https://instagram.com/${lead.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium hover:bg-muted transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View on Instagram
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onRemoveFromCollection(lead)}
              className="px-3 py-2 border border-red-200 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
            >
              Remove from Collection
            </button>
            <button
              onClick={() => onAddToCampaign(lead)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Add to Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}