import SignInForm from '@components/auth/SignInForm'
import SignOutForm from '@components/auth/SignOutForm'
import { useSession } from 'next-auth/react'

const SignInPage = () => {
  const { data: session } = useSession()

  return (
    <section className='h-screen w-screen bg-zinc-800 p-4 text-white'>
      <div className='flex h-full items-center justify-center'>
        {session ? <SignOutForm user={session.user} /> : <SignInForm />}
      </div>
    </section>
  )
}

SignInPage.authpage = true

export default SignInPage
