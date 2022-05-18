/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import RoundButton from '@components/UI/RoundButton'
import avatar from '@public/assets/img/avatar.svg'
import Link from 'next/link'

const SignOutForm = ({ user }) => {
  const { username, image } = user

  return (
    <div className='text-start min-w-[40%] rounded-xl border border-blue-500 px-8 py-6 pb-7 2xl:min-w-[25%]'>
      <h1 className='text-3xl font-bold'>You&apos;re Signed in as:</h1>
      <div className='ml-1 mt-6 mb-8 flex items-center gap-3'>
        <div className='h-10 w-10 rounded-full'>
          {image ? (
            <img src={image} alt='' className='rounded-full' />
          ) : (
            <Image src={avatar} alt='' className='rounded-full' />
          )}
        </div>
        <p className='text-zinc-400'>{username}</p>
      </div>
      <div className='flex items-center justify-between gap-6'>
        <RoundButton
          size='md'
          color='bg-zinc-600 hover:bg-zinc-700 focus:ring-zinc-500'
          className='w-1/2'
          onClick={() => signOut({ redirect: false })}
        >
          Sign Out
        </RoundButton>
        <Link href='/'>
          <a className='w-1/2 focus:outline-none' tabIndex='-1'>
            <RoundButton size='md' className='w-full'>
              Go Home
            </RoundButton>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SignOutForm
