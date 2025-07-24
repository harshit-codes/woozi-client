import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Custom storage adapter for Chrome extension
const chromeStorageAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const result = await chrome.storage.local.get([key])
      return result[key] || null
    } catch (error) {
      console.error('Error getting item from Chrome storage:', error)
      return null
    }
  },
  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await chrome.storage.local.set({ [key]: value })
    } catch (error) {
      console.error('Error setting item in Chrome storage:', error)
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await chrome.storage.local.remove([key])
    } catch (error) {
      console.error('Error removing item from Chrome storage:', error)
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: chromeStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'implicit' // Ensure implicit flow for Chrome extensions
  }
})

// Helper functions for authentication
export const authHelpers = {
  sendOTP: async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: undefined, // Disable redirect for pure OTP
        channel: 'email',
        data: {
          // Additional metadata if needed
        }
      }
    })
    return { data, error }
  },

  verifyOTP: async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getSession: async () => {
    const { data, error } = await supabase.auth.getSession()
    return { data, error }
  },

  getUser: async () => {
    const { data, error } = await supabase.auth.getUser()
    return { data, error }
  }
}