import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useAuth } from './App';
import { authHelpers } from '../lib/supabase';
import { LogOut, User } from 'lucide-react';

interface HeaderProps {
  currentScreen: string;
}

function AuthSection() {
  const { user, setShowAuthModal } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await authHelpers.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

  if (!user) {
    return (
      <Button
        onClick={handleSignIn}
        size="sm"
        className="h-8 px-3"
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center bg-secondary/50 rounded-md p-1">
        <User className="h-4 w-4 text-muted-foreground" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        disabled={isLoading}
        className="h-8 w-8 p-0"
        title="Sign out"
      >
        <LogOut className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function Header({ currentScreen }: HeaderProps) {
  return (
    <Card className="rounded-none border-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: Woozi Logo and Name */}
        <div className="flex items-center gap-2">
          <img 
            src="/woozi-logo-removebg-preview.png" 
            alt="Woozi" 
            className="h-6 w-6 bg-white rounded-sm p-0.5"
          />
          <span className="font-semibold text-foreground">Woozi</span>
        </div>

        {/* Center: Current Screen Title */}
        <Badge variant="secondary" className="text-sm font-medium">
          {currentScreen}
        </Badge>

        {/* Right: Supabase Authentication */}
        <div className="flex items-center">
          <AuthSection />
        </div>
      </div>
    </Card>
  );
}