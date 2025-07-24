import React, { useState } from 'react'
import { EmailInput } from './EmailInput'
import { OTPInput } from './OTPInput'

interface AuthContainerProps {
  onAuthSuccess: () => void
}

type AuthStep = 'email' | 'otp'

export function AuthContainer({ onAuthSuccess }: AuthContainerProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>('email')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleOTPSent = (userEmail: string) => {
    setEmail(userEmail)
    setCurrentStep('otp')
    setError('')
  }

  const handleVerificationSuccess = () => {
    setError('')
    onAuthSuccess()
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }

  const handleBackToEmail = () => {
    setCurrentStep('email')
    setEmail('')
    setError('')
  }

  return (
    <div className="p-4">
      <div className="w-full max-w-md mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
        
        {currentStep === 'email' && (
          <EmailInput 
            onOTPSent={handleOTPSent}
            onError={handleError}
          />
        )}
        
        {currentStep === 'otp' && (
          <OTPInput 
            email={email}
            onVerificationSuccess={handleVerificationSuccess}
            onError={handleError}
            onBack={handleBackToEmail}
          />
        )}
      </div>
    </div>
  )
}