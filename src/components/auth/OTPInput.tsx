import React, { useState, useRef, useEffect } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { authHelpers } from '../../lib/supabase'

interface OTPInputProps {
  email: string
  onVerificationSuccess: () => void
  onError: (error: string) => void
  onBack: () => void
}

export function OTPInput({ email, onVerificationSuccess, onError, onBack }: OTPInputProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendCooldown])

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take the last character
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && value) {
      handleVerifyOTP(newOtp.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = [...otp]
    
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i]
    }
    
    setOtp(newOtp)
    
    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '')
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
    inputRefs.current[focusIndex]?.focus()

    // Auto-submit if all fields are filled
    if (newOtp.every(digit => digit !== '')) {
      handleVerifyOTP(newOtp.join(''))
    }
  }

  const handleVerifyOTP = async (otpCode?: string) => {
    const code = otpCode || otp.join('')
    
    if (code.length !== 6) {
      onError('Please enter all 6 digits')
      return
    }

    setIsLoading(true)

    try {
      const { error } = await authHelpers.verifyOTP(email, code)
      
      if (error) {
        onError(error.message || 'Invalid verification code')
        // Clear OTP on error
        setOtp(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      } else {
        onVerificationSuccess()
      }
    } catch (error) {
      onError('Network error. Please try again.')
      setOtp(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    
    try {
      const { error } = await authHelpers.sendOTP(email)
      
      if (error) {
        onError(error.message || 'Failed to resend verification code')
      } else {
        setResendCooldown(60) // 60 second cooldown
        setOtp(['', '', '', '', '', '']) // Clear current OTP
        inputRefs.current[0]?.focus()
      }
    } catch (error) {
      onError('Network error. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground">Check your email</h2>
          <p className="text-sm text-muted-foreground mt-2">
            We sent a 6-digit code to
          </p>
          <p className="text-sm font-medium text-foreground">{email}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-1.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isLoading}
                className="w-9 h-9 text-center text-base font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            ))}
          </div>

          <Button 
            onClick={() => handleVerifyOTP()}
            className="w-full"
            disabled={isLoading || otp.some(digit => digit === '')}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleResendOTP}
            disabled={isResending || resendCooldown > 0}
          >
            {isResending ? 'Sending...' : 
             resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 
             'Resend code'}
          </Button>
        </div>

        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="w-full"
        >
          Use different email
        </Button>
      </div>
    </Card>
  )
}