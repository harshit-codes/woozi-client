import React, { useState, useEffect } from 'react';
import { MainLayout } from './MainLayout';
import { ScreenRenderer } from './ScreenRenderer';
import { AuthModal } from './auth/AuthModal';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

// Authentication context
const AuthContext = React.createContext<{
  session: Session | null;
  user: User | null;
  loading: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}>({ 
  session: null, 
  user: null, 
  loading: true, 
  showAuthModal: false, 
  setShowAuthModal: () => {} 
});

export const useAuth = () => React.useContext(AuthContext);


export function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      // Close auth modal on successful authentication
      if (session) {
        setShowAuthModal(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user, loading, showAuthModal, setShowAuthModal }}>
      <MainLayout>
        <ScreenRenderer />
      </MainLayout>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </AuthContext.Provider>
  );
}