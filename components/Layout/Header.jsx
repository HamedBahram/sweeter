/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import avatar from '@public/assets/img/avatar.svg'

const Header = ({ title }) => {
  const { data: session } = useSession()
  const { image } = session.user

  return (
    <header className='flex items-center gap-6 border-b px-4 py-2'>
      <div className='h-8 w-8 rounded-full text-zinc-400 sm:hidden'>
        {image ? (
          <img src={image} alt='' className='rounded-full' />
        ) : (
          <Image src={avatar} alt='' className='rounded-full' />
        )}
      </div>
      <p className='text-base font-bold'>{title}</p>
    </header>
  )
}

export default Header
