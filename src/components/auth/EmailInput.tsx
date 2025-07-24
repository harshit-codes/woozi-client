import React, { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { authHelpers } from '../../lib/supabase'

interface EmailInputProps {
  onOTPSent: (email: string) => void
  onError: (error: string) => void
}

export function EmailInput({ onOTPSent, onError }: EmailInputProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      onError('Please enter your email address')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      onError('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    
    try {
      const { error } = await authHelpers.sendOTP(email)
      
      if (error) {
        onError(error.message || 'Failed to send verification code')
      } else {
        onOTPSent(email)
      }
    } catch (error) {
      onError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">Welcome to Woozi</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your email to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Verification Code'}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center">
          We'll send you a 6-digit verification code to confirm your email
        </p>
      </div>
    </Card>
  )
}