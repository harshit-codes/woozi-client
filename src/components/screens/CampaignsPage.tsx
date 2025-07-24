import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Target, Plus, BarChart3, Calendar } from 'lucide-react';
import { useAuth } from '../App';

interface CampaignsPageProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const mockCampaigns = [
  { 
    id: 1, 
    name: 'Q1 Product Launch', 
    status: 'active', 
    budget: '$5,000',
    leads: 23,
    startDate: '2024-01-15'
  },
  { 
    id: 2, 
    name: 'Holiday Sale 2024', 
    status: 'completed', 
    budget: '$3,500',
    leads: 45,
    startDate: '2023-12-01'
  },
  { 
    id: 3, 
    name: 'Summer Promotion', 
    status: 'draft', 
    budget: '$2,000',
    leads: 0,
    startDate: '2024-06-01'
  },
];

export function CampaignsPage({ activeTab, onTabChange }: CampaignsPageProps) {
  const { user } = useAuth();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'completed': return 'bg-blue-500 text-white';
      case 'draft': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (!user) {
    return (
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Access Restricted</CardTitle>
            <CardDescription>
              Please sign in to view and manage your campaigns.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Campaign Management
                </CardTitle>
                <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
                  <Plus className="h-4 w-4" />
                  New Campaign
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-xl font-bold text-foreground">{mockCampaigns.length}</div>
                  <div className="text-xs text-muted-foreground">Total</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-600">
                    {mockCampaigns.filter(c => c.status === 'active').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-600">
                    {mockCampaigns.reduce((sum, c) => sum + c.leads, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Total Leads</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {mockCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{campaign.name}</h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                      Budget: {campaign.budget}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BarChart3 className="h-3 w-3" />
                      {campaign.leads} leads
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Calendar className="h-3 w-3" />
                    Started: {new Date(campaign.startDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-4 text-center text-sm text-muted-foreground">
              Advanced campaign features coming soon...
            </CardContent>
          </Card>
        </div>
    </div>
  );
}