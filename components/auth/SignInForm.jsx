import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

import { useFormik } from 'formik'
import * as yup from 'yup'

const errors = {
  Signin: 'Try signing in with a different account.',
  OAuthSignin: 'Try signing in with a different account.',
  OAuthCallback: 'Try signing in with a different account.',
  OAuthCreateAccount: 'Try signing in with a different account.',
  EmailCreateAccount: 'Try signing in with a different account.',
  Callback: 'Try signing in with a different account.',
  OAuthAccountNotLinked:
    'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email inbox.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  SessionRequired: 'Please sign in to access this page.',
  default: 'Unable to sign in.',
}

const getErrorMessage = errorType => {
  if (!errorType) return
  return errorType === 'SessionRequired'
    ? ''
    : errors[errorType]
    ? errors[errorType]
    : errors.default
}

const SignInForm = () => {
  const router = useRouter()
  const { callbackUrl = '/', error: errorType } = router.query

  const {
    touched,
    errors: formErrors,
    getFieldProps,
    handleSubmit,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: ({ email }) => {
      signIn('email', { email, callbackUrl })
    },
  })

  const error = getErrorMessage(errorType)
  return (
    <div>
      {error && (
        <div className='mb-4 w-full rounded border border-red-400 p-4 text-lg font-light text-red-400'>
          <p>{error}</p>
        </div>
      )}
      <h1 className='mb-4 text-6xl font-extrabold'>Happening Now</h1>
      <h2 className='mb-10 text-3xl font-bold'>Join Sweeter Today</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className='text-zinc-800'>
          <input
            className='mx-auto block w-full rounded-3xl border border-gray-300 px-6 py-2 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800'
            type='email'
            id='email'
            name='email'
            {...getFieldProps('email')}
            placeholder='email@example.com'
          />
          {formErrors.email && touched.email && (
            <div className='mx-2 my-1 text-sm text-red-400'>{formErrors.email}</div>
          )}
        </div>
        <button
          type='submit'
          disabled={isSubmitting || !isValid}
          className='mx-auto mt-3 mb-4 block w-full rounded-3xl bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-800 disabled:cursor-not-allowed disabled:bg-blue-400'
        >
          {isSubmitting ? 'Loading...' : 'Continue with Email'}
        </button>
      </form>
      <div className='mx-auto my-8 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-blue-500 after:ml-4 after:block after:h-px after:flex-grow after:bg-blue-500'>
        or
      </div>
      <button
        className='mx-auto mb-4 flex w-full justify-center rounded-3xl border border-gray-300 px-6 py-2 transition hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800'
        onClick={() => signIn('google', { callbackUrl })}
      >
        <svg
          aria-hidden='true'
          focusable='false'
          data-icon='google'
          className='mr-8 h-6'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 488 512'
        >
          <path
            fill='red'
            d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
          ></path>
        </svg>
        Continue with Google
      </button>

      <button
        className='mx-auto mb-4 flex w-full justify-center rounded-3xl border border-gray-300 px-6 py-2 transition hover:bg-blue-500 hover:text-white focus:outline-none focus:ring focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-800'
        onClick={() => signIn('linkedin', { callbackUrl })}
      >
        <svg
          aria-hidden='true'
          focusable='false'
          data-icon='linkedin'
          className='mr-8 h-6'
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
        >
          <path
            fill='#0077b5'
            d='M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z'
          ></path>
        </svg>
        Continue with LinkedIn
      </button>
    </div>
  )
}

export default SignInForm
