import SignInForm from '@components/auth/SignInForm'
import SignOutForm from '@components/auth/SignOutForm'
import { useSession } from 'next-auth/react'

const SignInPage = () => {
  const { data: session, status } = useSession()

  let content

  if (status === 'loading') {
    content = <div>Loading...</div>
  } else if (session) {
    content = <SignOutForm user={session.user} />
  } else {
    content = <SignInForm />
  }

  return (
    <section className='h-screen w-screen bg-zinc-800 p-4 text-white'>
      <div className='flex h-full items-center justify-center'>{content}</div>
    </section>
  )
}

SignInPage.authpage = true

export default SignInPage
