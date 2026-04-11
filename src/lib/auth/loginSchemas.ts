import * as yup from 'yup'

export const adminEmployerLoginSchema = yup.object({
  email: yup.string().trim().required('Email is required').email('Enter a valid email address'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
})

export type AdminEmployerLoginValues = yup.InferType<typeof adminEmployerLoginSchema>

export const candidateIdentifierSchema = yup.object({
  identifier: yup
    .string()
    .trim()
    .required('Email or phone is required')
    .test('email-or-phone', 'Enter a valid email or phone number', (value) => {
      if (!value) return false
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      const phone = /^\+?[\d\s-]{10,}$/.test(value.replace(/\s/g, ''))
      return email || phone
    }),
})

export const candidateOtpSchema = yup.object({
  otp: yup
    .string()
    .trim()
    .required('Code is required')
    .matches(/^\d{6}$/, 'Enter the 6-digit verification code'),
})
