import React from 'react';
import { Eye, MessageSquare, Users, Calendar, MoreHorizontal } from 'lucide-react';
import { InstagramLead } from '../../types/lead';
import { LeadQualityBadge } from './LeadQualityBadge';

interface InstagramLeadRowProps {
  lead: InstagramLead;
  isSelected: boolean;
  onSelect: (leadId: string, selected: boolean) => void;
  onViewProfile: (lead: InstagramLead) => void;
  onAddToCampaign: (lead: InstagramLead) => void;
  onToggleContact: (lead: InstagramLead) => void;
}

export function InstagramLeadRow({
  lead,
  isSelected,
  onSelect,
  onViewProfile,
  onAddToCampaign,
  onToggleContact
}: InstagramLeadRowProps) {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatDate = (date?: Date): string => {
    if (!date) return 'Never';
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const getEngagementColor = (rate: number): string => {
    if (rate >= 4) return 'text-green-600';
    if (rate >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getActivityStatus = (lastActivity?: Date): { color: string; label: string } => {
    if (!lastActivity) return { color: 'bg-gray-400', label: 'No activity' };
    
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastActivity.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return { color: 'bg-green-400', label: 'Very active' };
    if (diffDays <= 7) return { color: 'bg-green-400', label: 'Active' };
    if (diffDays <= 30) return { color: 'bg-yellow-400', label: 'Moderate' };
    return { color: 'bg-red-400', label: 'Inactive' };
  };

  const activityStatus = getActivityStatus(lead.lastActivity);

  return (
    <tr className="border-b hover:bg-muted/30 transition-colors">
      {/* Selection Checkbox */}
      <td className="p-3 w-8">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(lead.id, e.target.checked)}
          className="rounded border-input"
        />
      </td>

      {/* Instagram Handle */}
      <td className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
            {lead.instagramHandle[1]?.toUpperCase() || 'I'}
          </div>
          <div>
            <div className="font-medium text-sm">@{lead.instagramHandle}</div>
            {lead.fullName && (
              <div className="text-xs text-muted-foreground">{lead.fullName}</div>
            )}
          </div>
        </div>
      </td>

      {/* Followers */}
      <td className="p-3">
        <div className="flex items-center gap-1 text-sm">
          <Users className="h-3 w-3 text-muted-foreground" />
          <span className="font-medium">{formatNumber(lead.followersCount)}</span>
        </div>
      </td>

      {/* Posts */}
      <td className="p-3">
        <div className="text-sm font-medium">{lead.postCount}</div>
      </td>

      {/* Engagement Rate */}
      <td className="p-3">
        <div className={`text-sm font-medium ${getEngagementColor(lead.engagementRate)}`}>
          {lead.engagementRate.toFixed(1)}%
        </div>
      </td>

      {/* Quality Score */}
      <td className="p-3">
        <LeadQualityBadge quality={lead.qualityScore} />
      </td>

      {/* Last Activity */}
      <td className="p-3">
        <div className="flex items-center gap-2">
          <div 
            className={`w-2 h-2 rounded-full ${activityStatus.color}`}
            title={activityStatus.label}
          />
          <span className="text-sm text-muted-foreground">
            {formatDate(lead.lastActivity)}
          </span>
        </div>
      </td>

      {/* Contact Status */}
      <td className="p-3">
        <button
          onClick={() => onToggleContact(lead)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            lead.isContacted
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {lead.isContacted ? 'Contacted' : 'Not Contacted'}
        </button>
      </td>

      {/* Actions */}
      <td className="p-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewProfile(lead)}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
            title="View profile"
          >
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onAddToCampaign(lead)}
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
            title="Add to campaign"
          >
            <MessageSquare className="h-3.5 w-3.5" />
          </button>
          <button
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
            title="More actions"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}