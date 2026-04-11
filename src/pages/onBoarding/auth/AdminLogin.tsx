import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import AuthLayout from '@/components/auth/AuthLayout'
import LoginCard from '@/components/auth/LoginCard'
import IconGoogle from '@/assets/Icon/IconGoogle'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { Button } from '@/components/core/Button/Button'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '@/lib/utils/routes'
import { adminEmployerLoginSchema, type AdminEmployerLoginValues } from '@/lib/auth/loginSchemas'
import { setSession } from '@/lib/auth/session'
import * as yup from 'yup'
import { toast } from 'react-toastify'

const AdminLogin = () => {
  const methods = useForm<AdminEmployerLoginValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  const onSubmit = async (data: AdminEmployerLoginValues) => {
    try {
      await adminEmployerLoginSchema.validate(data, { abortEarly: false })
    } catch (e) {
      if (e instanceof yup.ValidationError) {
        e.inner.forEach((err) => {
          const path = err.path as keyof AdminEmployerLoginValues | undefined
          if (path) methods.setError(path, { message: err.message })
        })
        return
      }
    }

    try {
      // TODO: replace with POST /v1/auth/admin/login using apiClient; store real accessToken from response.
      setSession({
        role: 'admin',
        accessToken: 'demo-admin-token',
        email: data.email,
      })
      toast.success('Signed in to admin console')
      navigate(appRoutes.admin.dashboard, { replace: true })
    } catch {
      toast.error('Sign-in failed. Try again.')
    }
  }

  return (
    <AuthLayout>
      <LoginCard title="Admin Access" description="Internal gateway for SkillSure operators and systems management.">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                name="email"
                type="email"
                label="Admin Email"
                placeholder="admin@skillsure.io"
                startIcon={<Mail className="w-5 h-5 text-text-secondary-disabled" />}
                className="rounded-xl py-3.5 bg-surface-subtle-default border-transparent focus:bg-white focus:border-primary transition-all shadow-xs"
                validateRule={{ required: true }}
              />

              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary-default">Security Token</label>
                  <a href="#" className="text-xs font-semibold text-primary hover:text-primary-active transition-colors">
                    Forgot Access?
                  </a>
                </div>
                <FormField
                  name="password"
                  type="password"
                  placeholder="••••••••••••"
                  startIcon={<Lock className="w-5 h-5 text-text-secondary-disabled" />}
                  className="rounded-xl py-3.5 bg-surface-subtle-default border-transparent focus:bg-white focus:border-primary transition-all shadow-xs"
                  validateRule={{ required: true }}
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-active text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                title="Login to Console"
                endIcon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              />
            </div>
          </form>
        </FormProvider>

        <div className="mt-10 mb-8 flex items-center gap-4">
          <div className="h-px grow bg-main-border/20"></div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary-disabled">Internal SSO</span>
          <div className="h-px grow bg-main-border/20"></div>
        </div>

        <button
          type="button"
          className="w-full bg-bg-light text-text-primary-default font-semibold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-surface-hover transition-colors active:scale-[0.98]"
        >
          <IconGoogle />
          <span>Sign in with Google</span>
        </button>
      </LoginCard>
    </AuthLayout>
  )
}

export default AdminLogin
