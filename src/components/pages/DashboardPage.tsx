import React from 'react';
import { 
  Users, 
  MousePointer, 
  Clock, 
  Activity, 
  BarChart3,
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Settings,
  Upload
} from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your extension performance and user engagement.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md border bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
          <button className="inline-flex items-center justify-center rounded-md border bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="h-px bg-border" />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Total Views</div>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">2,547</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.3%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Active Users</div>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.7%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Click Rate</div>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">4.2%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">-2.1%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium">Avg. Session</div>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold">3m 42s</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+15.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              <h2 className="font-semibold">Weekly Activity</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              User engagement over the past 7 days
            </p>
            <div className="flex items-end justify-between h-32 px-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                const heights = [45, 52, 48, 65, 58, 42, 38];
                return (
                  <div key={day} className="flex flex-col items-center gap-2">
                    <div 
                      className="bg-primary rounded-t w-8 min-h-[4px] transition-all hover:opacity-80"
                      style={{ height: `${heights[index]}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{day}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center pt-4 border-t">
              <p className="text-sm text-muted-foreground">Interactive charts with real data</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              <h2 className="font-semibold">Recent Activity</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Latest actions and events from your extension
            </p>
            <div className="space-y-4">
              {[
                { icon: User, text: 'User interaction recorded', time: '2 min ago', color: 'bg-green-500' },
                { icon: Settings, text: 'Extension activated', time: '5 min ago', color: 'bg-blue-500' },
                { icon: Upload, text: 'Data export completed', time: '12 min ago', color: 'bg-green-500' },
                { icon: Settings, text: 'Settings updated', time: '1 hour ago', color: 'bg-yellow-500' },
                { icon: User, text: 'User login detected', time: '2 hours ago', color: 'bg-blue-500' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                    <div>
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <button className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <h2 className="font-semibold">Performance Metrics</h2>
            <p className="text-sm text-muted-foreground">
              Response times and error rates
            </p>
            <div className="space-y-3">
              {[
                { label: 'Average Load Time', value: '342ms' },
                { label: 'Error Rate', value: '0.12%' },
                { label: 'Memory Usage', value: '23.4MB' },
                { label: 'CPU Usage', value: '1.2%' },
              ].map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{metric.label}</span>
                  <span className="text-sm font-medium">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div className="text-center">
              <Calendar className="h-8 w-8 mx-auto text-primary" />
              <h2 className="font-semibold">This Month</h2>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Usage increase</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}