import React from 'react';
import { Home, BarChart3 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarLayoutProps {
  children: React.ReactNode;
  currentPage: 'home' | 'dashboard';
  onNavigate: (page: 'home' | 'dashboard') => void;
}

export function SidebarLayout({ children, currentPage, onNavigate }: SidebarLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r border-sidebar-border bg-sidebar">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-sidebar-border p-4">
          <img 
            src="/woozi-logo.png" 
            alt="Woozi" 
            className="h-8 w-8"
          />
          <div>
            <h2 className="text-sm font-semibold text-sidebar-foreground">Woozi Extension</h2>
            <p className="text-xs text-sidebar-foreground/60">Chrome Extension</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          <button
            onClick={() => onNavigate('home')}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              currentPage === 'home'
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground"
            )}
          >
            <Home className="h-4 w-4" />
            Home
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              currentPage === 'dashboard'
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground"
            )}
          >
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}