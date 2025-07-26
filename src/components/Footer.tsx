import React from 'react';
import { Home, Users, Target, HelpCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';

interface FooterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'campaigns', label: 'Campaigns', icon: Target },
  { id: 'help', label: 'Support', icon: HelpCircle },
];

export function Footer({ activeTab, onTabChange }: FooterProps) {
  return (
    <Card className="rounded-none border-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-2">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12 bg-transparent p-1">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <TabsTrigger
                key={id}
                value={id}
                className="flex flex-col items-center gap-1 px-3 py-2 text-xs rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent/20 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-primary/20"
              >
                <Icon className="h-4 w-4 transition-transform data-[state=active]:scale-110" />
                <span className="truncate font-medium">{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </Card>
  );
}