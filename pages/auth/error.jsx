import RoundButton from '@components/UI/RoundButton'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

const errors = {
  accessdenied: { message: 'You do not have permission to sign in.' },
  configuration: { message: 'There is a problem with the server configuration.' },
  verification: {
    message: 'The sign in link is no longer valid.',
    reason: 'It may have been used already or it may have expired.',
  },
  default: { message: 'Something went wrong!' },
}

const ErrorPage = () => {
  const router = useRouter()
  const { error = 'default' } = router.query

  const { message, reason } = errors[error.toLowerCase()]

  return (
    <section className='h-screen w-screen bg-zinc-800 p-4 text-white'>
      <div className='flex h-full items-center justify-center'>
        <div className='text-start min-w-[40%] rounded-xl border border-blue-500 px-8 py-6 pb-7'>
          <h1 className='mb-4 text-3xl font-bold'>Unable to sign in</h1>
          <div className='mb-6 text-lg text-zinc-500'>
            <p>{message}</p>
            <p>{reason}</p>
          </div>
          <RoundButton
            size='md'
            className='w-40'
            onClick={() => signIn(null, { callbackUrl: '/' })}
          >
            Sign In
          </RoundButton>
        </div>
      </div>
    </section>
  )
}

ErrorPage.authpage = true

export default ErrorPage
