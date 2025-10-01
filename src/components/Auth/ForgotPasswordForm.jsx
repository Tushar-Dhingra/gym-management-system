// src/components/Auth/ForgotPasswordForm.jsx
import React, { useState } from 'react';
import FormInput from './FormInput';
import Button from './Button';
import ResetPasswordModal from './ResetPasswordModal';

const ForgotPasswordForm = ({ onBackToLogin }) => {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'reset'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // API call to send OTP
      console.log('Sending OTP to:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // API call to verify OTP
      console.log('Verifying OTP:', otp);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate OTP verification (replace with actual API call)
      if (otp === '123456') {
        setStep('reset');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = () => {
    setStep('email');
    setEmail('');
    setOtp('');
    onBackToLogin();
  };

  if (step === 'reset') {
    return (
      <ResetPasswordModal 
        email={email}
        onSuccess={handlePasswordReset}
        onCancel={() => setStep('otp')}
      />
    );
  }

  if (step === 'otp') {
    return (
      <div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Enter OTP</h2>
          <p className="text-gray-300">
            We've sent a 6-digit code to <br />
            <span className="text-blue-400">{email}</span>
          </p>
        </div>

        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <FormInput
            label="OTP Code"
            type="text"
            name="otp"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
              setError('');
            }}
            error={error}
            placeholder="Enter 6-digit code"
            className="text-center text-2xl tracking-widest"
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Verify OTP
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Change Email
            </button>
            <br />
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              ← Back to Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-gray-300">Enter your email to receive OTP</p>
      </div>

      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          error={error}
          placeholder="Enter your email address"
        />

        <Button type="submit" isLoading={isLoading} className="w-full">
          Send OTP
        </Button>

        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            ← Back to Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
