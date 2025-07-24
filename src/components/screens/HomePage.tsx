import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart3, Users, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../App';

interface HomePageProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function HomePage({ activeTab, onTabChange }: HomePageProps) {
  const { user, setShowAuthModal } = useAuth();

  if (!user) {
    return (
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome to Woozi</CardTitle>
            <CardDescription className="text-base">
              Your complete lead management and campaign automation solution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Lead Management</h3>
                <p className="text-sm text-muted-foreground">Track and organize your prospects efficiently</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Campaign Automation</h3>
                <p className="text-sm text-muted-foreground">Automate your marketing campaigns</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-medium">Performance Analytics</h3>
                <p className="text-sm text-muted-foreground">Track your sales productivity</p>
              </div>
            </div>
            <div className="text-center pt-4">
              <button
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5" />
                Dashboard Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Active Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Campaigns</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                onClick={() => onTabChange?.('leads')}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left"
              >
                <Users className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium">Manage Leads</div>
                  <div className="text-sm text-muted-foreground">View and organize your leads</div>
                </div>
              </button>
              <button
                onClick={() => onTabChange?.('campaigns')}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-left"
              >
                <Target className="h-4 w-4 text-primary" />
                <div>
                  <div className="font-medium">View Campaigns</div>
                  <div className="text-sm text-muted-foreground">Check campaign performance</div>
                </div>
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">New lead added</span>
                  <Badge variant="secondary">2h ago</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Campaign updated</span>
                  <Badge variant="secondary">5h ago</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Lead converted</span>
                  <Badge variant="secondary">1d ago</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}