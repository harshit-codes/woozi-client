import React from 'react';
import { HomePage } from './screens/HomePage';
import { LeadsPage } from './screens/LeadsPage';
import { CampaignsPage } from './screens/CampaignsPage';
import { HelpPage } from './screens/HelpPage';

interface ScreenRendererProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function ScreenRenderer({ activeTab = 'home', onTabChange = () => {} }: ScreenRendererProps) {
  switch (activeTab) {
    case 'home':
      return <HomePage activeTab={activeTab} onTabChange={onTabChange} />;
    case 'leads':
      return <LeadsPage activeTab={activeTab} onTabChange={onTabChange} />;
    case 'campaigns':
      return <CampaignsPage activeTab={activeTab} onTabChange={onTabChange} />;
    case 'help':
      return <HelpPage activeTab={activeTab} onTabChange={onTabChange} />;
    default:
      return <HomePage activeTab={activeTab} onTabChange={onTabChange} />;
  }
}