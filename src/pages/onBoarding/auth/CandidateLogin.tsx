import React, { useState, useEffect } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Mail, Phone, ArrowRight, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginCard from '@/components/auth/LoginCard';
import IconGoogle from '@/assets/Icon/IconGoogle';
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField';
import { Button } from '@/components/core/Button/Button';
import OtpInput from '@/components/core/TextInputField/OtpInput';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '@/lib/utils/routes';
import { candidateIdentifierSchema, candidateOtpSchema } from '@/lib/auth/loginSchemas';
import { setSession } from '@/lib/auth/session';
import * as yup from 'yup';
import { toast } from 'react-toastify';

type AuthStep = 'IDENTIFIER' | 'OTP';

const CandidateLogin = () => {
  const [step, setStep] = useState<AuthStep>('IDENTIFIER');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [timer, setTimer] = useState(30);
  const [isResending, setIsResending] = useState(false);

  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      identifier: '',
      otp: '',
    },
  });

  // Timer logic for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Reset identifier field when switching between Email and Phone
  useEffect(() => {
    methods.setValue('identifier', '');
    methods.clearErrors('identifier');
  }, [authMethod, methods]);

  const onIdentifierSubmit = async (data: { identifier: string }) => {
    try {
      await candidateIdentifierSchema.validate(data, { abortEarly: false });
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        e.inner.forEach((err) => {
          if (err.path === 'identifier') methods.setError('identifier', { message: err.message });
        });
        return;
      }
    }
    setIdentifier(data.identifier);
    setTimer(30);
    setStep('OTP');
    toast.success('Verification code sent');
  };

  const onOtpSubmit = async (data: { otp: string }) => {
    try {
      await candidateOtpSchema.validate(data, { abortEarly: false });
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        e.inner.forEach((err) => {
          if (err.path === 'otp') methods.setError('otp', { message: err.message });
        });
        return;
      }
    }
    try {
      // TODO: POST /v1/auth/candidate/verify-otp — then store real token.
      setSession({
        role: 'candidate',
        accessToken: 'demo-candidate-token',
        email: identifier.includes('@') ? identifier : undefined,
      });
      toast.success('Verified');
      navigate(appRoutes.candidate.welcome, { replace: true });
    } catch {
      toast.error('Verification failed');
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    console.log('Resending OTP to:', identifier);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTimer(30);
    setIsResending(false);
  };

  const maskedIdentifier = identifier.includes('@') 
    ? identifier.replace(/^(..)(.*)(?=@)/, (_: string, a: string, b: string) => a + '*'.repeat(b.length))
    : identifier.replace(/(\d{2})(\d{6})(\d{2})/, (_: string, a: string, b: string, c: string) => a + '*'.repeat(b.length) + c);

  return (
    <AuthLayout>
      {step === 'IDENTIFIER' ? (
        <LoginCard 
          title="Candidate Login" 
          description="Verify your identity to begin your Skillsure assessment."
        >
          <div className="flex p-1 bg-bg-light rounded-xl mb-6">
            <button 
              onClick={() => setAuthMethod('email')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${authMethod === 'email' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary-disabled hover:text-text-secondary-default'}`}
            >
              Email OTP
            </button>
            <button 
              onClick={() => setAuthMethod('phone')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${authMethod === 'phone' ? 'bg-white text-primary shadow-sm' : 'text-text-secondary-disabled hover:text-text-secondary-default'}`}
            >
              Phone OTP
            </button>
          </div>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onIdentifierSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  name="identifier"
                  type={authMethod === 'email' ? 'email' : 'number'}
                  label={authMethod === 'email' ? 'Email Address' : 'Phone Number'}
                  placeholder={authMethod === 'email' ? 'name@example.com' : '9876543210'}
                  startIcon={authMethod === 'email' ? <Mail className="w-5 h-5 text-text-secondary-disabled" /> : <Phone className="w-5 h-5 text-text-secondary-disabled" />}
                  className="rounded-xl py-3.5 bg-surface-subtle-default border-transparent focus:bg-white focus:border-primary transition-all shadow-xs"
                  validateRule={{ 
                    required: true,
                    validType: authMethod === 'email' ? 'email' : 'int',
                    minLength: authMethod === 'email' ? undefined : 10,
                    maxLength: authMethod === 'email' ? undefined : 10,
                  }}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-active text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                  title="Send Verification Code"
                  endIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                />
              </div>
            </form>
          </FormProvider>

          <div className="mt-10 mb-8 flex items-center gap-4">
            <div className="h-px grow bg-main-border/20"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary-disabled">Returning Candidate?</span>
            <div className="h-px grow bg-main-border/20"></div>
          </div>

          <button className="w-full bg-bg-light text-text-primary-default font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-surface-hover transition-colors active:scale-[0.98]">
            <IconGoogle />
            <span>Sign in with Google</span>
          </button>
        </LoginCard>
      ) : (
        <LoginCard 
          title="Verify Identity" 
          description={`We've sent a 6-digit verification code to ${maskedIdentifier}.`}
        >
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onOtpSubmit)} className="space-y-8">
              <div className="flex flex-col items-center space-y-6">
                <Controller
                  name="otp"
                  rules={{ required: true, minLength: 6 }}
                  render={({ field }) => (
                    <OtpInput 
                      length={6} 
                      value={field.value} 
                      onChange={field.onChange} 
                    />
                  )}
                />

                <div className="flex flex-col items-center space-y-2">
                  {timer > 0 ? (
                    <p className="text-sm text-text-secondary-default">
                      Resend code in <span className="font-bold text-primary">{timer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-active transition-colors disabled:opacity-50"
                    >
                      <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                      Resend Code
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-active text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                  title="Verify and Continue"
                  endIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                />
                
                <button
                  type="button"
                  onClick={() => setStep('IDENTIFIER')}
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-text-secondary-default hover:text-text-primary-default transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Contact Detail
                </button>
              </div>
            </form>
          </FormProvider>

          <div className="mt-10 p-4 bg-bg-light rounded-2xl flex gap-3 border border-main-border/10">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <p className="text-xs leading-relaxed text-text-secondary-default">
              Your verification code is valid for 10 minutes. Please do not share it with anyone.
            </p>
          </div>
        </LoginCard>
      )}
    </AuthLayout>
  );
};

export default CandidateLogin;
