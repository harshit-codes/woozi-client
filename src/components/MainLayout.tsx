import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState('home');

  const getScreenTitle = (tab: string) => {
    switch (tab) {
      case 'home':
        return 'Home';
      case 'leads':
        return 'Leads';
      case 'campaigns':
        return 'Campaigns';
      case 'help':
        return 'Help & Support';
      default:
        return 'Home';
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground">
      <Header currentScreen={getScreenTitle(activeTab)} />
      
      <main className="flex-1 overflow-auto">
        {React.cloneElement(children as React.ReactElement, { 
          activeTab, 
          onTabChange: setActiveTab 
        })}
      </main>
      
      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}