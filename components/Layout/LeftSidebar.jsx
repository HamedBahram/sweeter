import Link from 'next/link'
import NavLink from '../Utils/NavLink'
import {
  HomeIcon,
  ThumbUpIcon,
  EmojiHappyIcon,
  SearchIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import SignoutModal from '@components/auth/SignoutModal'

const LeftSidebar = ({ open, setOpen }) => {
  return (
    <section className='sm: hidden flex-col items-center p-4 sm:flex sm:gap-4 xl:grow xl:items-start'>
      <Link href='/'>
        <a className='block pl-0 text-4xl font-bold text-blue-500 xl:hidden xl:pl-5'>S</a>
      </Link>
      <Link href='/'>
        <a className='hidden pl-0 text-3xl font-bold text-blue-500 xl:block xl:pl-5'>Sweeter</a>
      </Link>
      <NavLink
        href='/'
        className='flex items-center justify-start gap-3 rounded-full px-2 py-2 transition-colors hover:bg-zinc-200 xl:px-4'
        activeClass='text-zinc-800 font-medium'
        inactiveClass='text-zinc-500'
      >
        <HomeIcon className='h-8 w-8' />
        <span className='hidden text-lg xl:block'>Home</span>
      </NavLink>
      <NavLink
        href='/following'
        className='flex items-center justify-start gap-3 rounded-full px-2 py-2 transition-colors hover:bg-zinc-200 xl:px-4'
        activeClass='text-zinc-800 font-medium'
        inactiveClass='text-zinc-500'
      >
        <ThumbUpIcon className='h-8 w-8' />
        <span className='hidden text-lg xl:block'>Following</span>
      </NavLink>
      <NavLink
        href='/explore'
        className='flex items-center justify-start gap-3 rounded-full px-2 py-2 transition-colors hover:bg-zinc-200 lg:hidden xl:px-4'
        activeClass='text-zinc-800 font-medium'
        inactiveClass='text-zinc-500'
      >
        <SearchIcon className='h-8 w-8' />
        <span className='hidden text-lg xl:block'>Explore</span>
      </NavLink>
      <NavLink
        href='/profile'
        className='flex items-center justify-start gap-3 rounded-full px-2 py-2 transition-colors hover:bg-zinc-200 xl:px-4'
        activeClass='text-zinc-800 font-medium'
        inactiveClass='text-zinc-500'
      >
        <EmojiHappyIcon className='h-8 w-8' />
        <span className='hidden text-lg xl:block'>Profile</span>
      </NavLink>
      <button
        onClick={() => setOpen(open => !open)}
        className='flex items-center justify-start gap-3 rounded-full px-2 py-2 text-zinc-500 transition-colors hover:bg-zinc-200 xl:px-4'
      >
        <LogoutIcon className='h-8 w-8' />
        <span className='hidden text-lg xl:block'>Logout</span>
      </button>
      <SignoutModal open={open} setOpen={setOpen} />
    </section>
  )
}

export default LeftSidebar
