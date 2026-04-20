import AuthLayout from '@/components/auth/AuthLayout'
import LoginCard from '@/components/auth/LoginCard'
import { Button } from '@/components/core/Button/Button'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { appRoutes } from '@/lib/utils/routes'
import { setSession } from '@/lib/auth/session'
import type { OptionType } from '@/types/components.types'
import { ArrowLeft, ArrowRight, Mail, Phone, RefreshCw, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import OtpInput from '@/components/core/TextInputField/OtpInput'

type LoginStep = 'IDENTIFIER' | 'OTP'

type LoginAsRole = 'candidate' | 'admin'

const LOGIN_AS_OPTIONS: OptionType[] = [
  { value: 'candidate', label: 'Candidate' },
  { value: 'admin', label: 'Admin' },
]

/**
 * Auth card fields — must stay aligned with `Select` `variant="authCard"` in Select.tsx
 * (`!` overrides `.form-input` from forms.css: py-2, rounded-md, faint border, no shadow)
 */
const LOGIN_AUTH_FIELD_CLASS =
  '!h-12 !min-h-12 !rounded-[12px] !border !border-slate-300 !bg-white !py-[13px] !text-sm !font-semibold !shadow-[0_12px_28px_-20px_rgba(37,99,235,0.55)] !outline-none transition-all placeholder:text-slate-400 focus:!border-primary focus:!bg-white focus:!shadow-[0_16px_34px_-18px_rgba(37,99,235,0.35)] focus:!ring-0'

type IdentifierFormValues = {
  loginAs: LoginAsRole
  identifier: string
}

type OtpFormValues = {
  otp: string
}

export const Login = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState<LoginStep>('IDENTIFIER')
  const [contactTarget, setContactTarget] = useState('')
  const [pendingLoginAs, setPendingLoginAs] = useState<LoginAsRole>('candidate')
  const [timer, setTimer] = useState(30)
  const [isResending, setIsResending] = useState(false)

  const identifierMethods = useForm<IdentifierFormValues>({
    defaultValues: { loginAs: 'candidate', identifier: '' },
    mode: 'onTouched',
  })

  const otpMethods = useForm<OtpFormValues>({
    defaultValues: { otp: '' },
    mode: 'onTouched',
  })
  const identifierValue = useWatch({
    control: identifierMethods.control,
    name: 'identifier',
  })
  const trimmedIdentifier = (identifierValue || '').trim()
  const isPhoneMode = /^\d/.test(trimmedIdentifier)

  useEffect(() => {
    if (step !== 'OTP' || timer <= 0) return
    const interval = window.setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [step, timer])

  useEffect(() => {
    if (!isPhoneMode || !identifierValue) return
    const digitsOnly = identifierValue.replace(/\D/g, '').slice(0, 10)
    if (digitsOnly !== identifierValue) {
      identifierMethods.setValue('identifier', digitsOnly, {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
  }, [identifierMethods, identifierValue, isPhoneMode])

  const getMaskedIdentifier = (identifier: string) => {
    if (!identifier) return ''
    if (identifier.includes('@')) {
      const [name, domain] = identifier.split('@')
      if (!name) return identifier
      const prefix = name.slice(0, 2)
      const mask = '*'.repeat(Math.max(1, name.length - 2))
      return `${prefix}${mask}@${domain}`
    }

    const normalized = identifier.replace(/\D/g, '')
    const prefix = normalized.slice(0, 2)
    const suffix = normalized.slice(-2)
    const mask = '*'.repeat(Math.max(1, normalized.length - 4))
    return `${prefix}${mask}${suffix}`
  }

  const onSubmitIdentifier = ({ identifier, loginAs }: IdentifierFormValues) => {
    const sanitized = identifier.trim()
    const phoneMode = /^\d/.test(sanitized)
    const normalizedIdentifier = phoneMode ? sanitized.replace(/\D/g, '') : sanitized
    setPendingLoginAs(loginAs)
    setContactTarget(normalizedIdentifier)
    setStep('OTP')
    setTimer(30)
    otpMethods.reset({ otp: '' })
    toast.success('OTP sent successfully')
  }

  const onSubmitOtp = ({ otp }: OtpFormValues) => {
    if (!/^\d{4}$/.test(otp)) {
      otpMethods.setError('otp', { type: 'pattern', message: 'Enter valid 4 digit OTP' })
      return
    }

    setSession({
      role: pendingLoginAs,
      accessToken: `demo-${pendingLoginAs}-token`,
      email: contactTarget.includes('@') ? contactTarget : undefined,
    })
    toast.success('Logged in successfully')
    if (pendingLoginAs === 'admin') {
      navigate(appRoutes.admin.dashboard, { replace: true })
    } else {
      navigate(appRoutes.candidate.welcome, { replace: true })
    }
  }

  const resendOtp = async () => {
    setIsResending(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setTimer(30)
    setIsResending(false)
    toast.success('OTP resent')
  }

  const maskedIdentifier = getMaskedIdentifier(contactTarget)
  const inputIcon = isPhoneMode ? <Phone className="w-5 h-5 text-text-secondary-disabled" /> : <Mail className="w-5 h-5 text-text-secondary-disabled" />

  return (
    <AuthLayout>
      {step === 'IDENTIFIER' ? (
        <LoginCard title="Login to SkillSure" description="Enter your email or Indian mobile number to receive OTP.">
          <FormProvider {...identifierMethods}>
            <form onSubmit={identifierMethods.handleSubmit(onSubmitIdentifier)} className="space-y-7">
              <FormField
                name="loginAs"
                type="select"
                label="Login As"
                variant="authCard"
                options={LOGIN_AS_OPTIONS}
                isClearable={false}
                className="w-full"
                validateRule={{ required: true }}
              />
              <FormField
                name="identifier"
                type="text"
                label="Email or Phone"
                placeholder="name@company.com or 9876543210"
                startIcon={inputIcon}
                className={LOGIN_AUTH_FIELD_CLASS}
                inputMode={isPhoneMode ? 'numeric' : 'email'}
                maxLength={isPhoneMode ? 10 : 320}
                rules={{
                  validate: {
                    required: (value: unknown) => {
                      const input = String(value || '').trim()
                      return input.length > 0 || 'Email or phone is required'
                    },
                    smartIdentifier: (value: unknown) => {
                      const input = String(value || '').trim()
                      if (!input) return true

                      if (/^\d/.test(input)) {
                        if (!/^\d+$/.test(input)) return 'Only digits are allowed for phone number'
                        if (input.length !== 10) return 'Mobile number must be exactly 10 digits'
                        if (!/^[6-9]\d{9}$/.test(input)) return 'Enter valid Indian mobile number'
                        return true
                      }

                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                      return emailRegex.test(input) || 'Enter valid email address'
                    },
                  },
                }}
              />

              <Button
                type="submit"
                className="w-full rounded-2xl bg-primary py-4 text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-active transition-all flex items-center justify-center gap-2 group"
                title="Send OTP"
                endIcon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
              />
            </form>
          </FormProvider>
        </LoginCard>
      ) : (
        <LoginCard
          title={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep('IDENTIFIER')}
                className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full text-text-secondary-default transition-colors hover:bg-surface-subtle-default hover:text-text-primary-default"
                aria-label="Go back to login"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <span>Verify OTP</span>
            </div>
          }
          description={`Enter the 4-digit code sent to ${maskedIdentifier}.`}
        >
          <FormProvider {...otpMethods}>
            <form onSubmit={otpMethods.handleSubmit(onSubmitOtp)} className="space-y-8">
              <div className="rounded-2xl border border-main-border/20 bg-surface-subtle-default/60 p-5">
                <label className="mb-4 block text-xs font-bold uppercase tracking-[0.18em] text-text-secondary-default">One Time Password</label>
                <Controller
                  name="otp"
                  control={otpMethods.control}
                  rules={{
                    required: 'OTP is required',
                    pattern: { value: /^\d{4}$/, message: 'OTP must be 4 digits' },
                  }}
                  render={({ field }) => <OtpInput length={4} value={field.value || ''} onChange={field.onChange} />}
                />
                {otpMethods.formState.errors.otp?.message ? <p className="mt-2 text-danger text-xs">{otpMethods.formState.errors.otp.message}</p> : null}
              </div>

              <div className="text-center text-sm text-text-secondary-default">
                {timer > 0 ? (
                  <span>
                    Resend OTP in <span className="font-bold text-primary">{timer}s</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={isResending}
                    className="cursor-pointer mx-auto inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-active disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="cursor-pointer w-full rounded-2xl bg-primary py-4 text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-active transition-all flex items-center justify-center gap-2 group"
                  title="Verify & Login"
                  endIcon={<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                />
                <button
                  type="button"
                  onClick={() => setStep('IDENTIFIER')}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-text-secondary-default hover:text-text-primary-default transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Change Email / Phone
                </button>
              </div>
            </form>
          </FormProvider>

          <div className="mt-7 rounded-2xl border border-main-border/15 bg-bg-light p-4 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary-default leading-relaxed">
              For your security, OTP is valid for 10 minutes. Never share it with anyone.
            </p>
          </div>
        </LoginCard>
      )}
    </AuthLayout>
  )
}
