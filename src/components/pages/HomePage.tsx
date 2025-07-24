import React, { useState } from 'react';
import { Sparkles, Users, Activity, Zap, Wrench, Smartphone } from 'lucide-react';
import { cn } from '../../lib/utils';

export function HomePage() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome to Woozi</h1>
        <p className="text-muted-foreground">
          Your modern Chrome extension built with the latest web technologies.
        </p>
      </div>

      <div className="h-px bg-border" />

      {/* Interactive Demo Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">Interactive Demo</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Test the extension functionality with this interactive element.
          </p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium">Welcome to Woozi!</p>
            <p className="mt-1 text-xs text-muted-foreground">
              This extension is now powered by modern React components with WXT framework.
            </p>
          </div>
          <button
            onClick={() => setClickCount(prev => prev + 1)}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Click me! ({clickCount})
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm text-center">
          <div className="flex flex-col items-center space-y-2">
            <Users className="h-4 w-4 text-primary" />
            <div className="text-lg font-bold">1.2K</div>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm text-center">
          <div className="flex flex-col items-center space-y-2">
            <Activity className="h-4 w-4 text-primary" />
            <div className="text-lg font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Performance</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm text-center">
          <div className="flex flex-col items-center space-y-2">
            <Zap className="h-4 w-4 text-primary" />
            <div className="text-lg font-bold">&lt; 1s</div>
            <p className="text-xs text-muted-foreground">Load Time</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Key Features</h2>
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Modern UI</h3>
                <p className="text-xs text-muted-foreground">
                  Built with WXT, React, TypeScript & shadcn/ui
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Wrench className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Manifest V3</h3>
                <p className="text-xs text-muted-foreground">
                  Latest Chrome extension standards with proper CSP
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Smartphone className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Side Panel API</h3>
                <p className="text-xs text-muted-foreground">
                  Seamless sidebar integration with hot reload
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">
              Common tasks you can perform with this extension.
            </p>
          </div>
          <div className="space-y-2">
            <button className="w-full justify-start rounded-md border bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
              View Dashboard
            </button>
            <button className="w-full justify-start rounded-md border bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
              Check Settings
            </button>
            <button className="w-full justify-start rounded-md border bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}