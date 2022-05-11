import {
  HomeIcon,
  SearchIcon,
  ThumbUpIcon,
  EmojiHappyIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import NavLink from '../Utils/NavLink'

const Footer = ({ setOpen }) => {
  return (
    <footer className='mx-6 flex items-center justify-between gap-12 border-t py-3 sm:hidden'>
      <NavLink href='/' activeClass='text-blue-500' inactiveClass='text-zinc-500'>
        <HomeIcon className='h-7 w-7' />
      </NavLink>
      <NavLink href='/following' activeClass='text-blue-500' inactiveClass='text-zinc-500'>
        <ThumbUpIcon className='h-7 w-7' />
      </NavLink>
      <NavLink href='/explore' activeClass='text-blue-500' inactiveClass='text-zinc-500'>
        <SearchIcon className='h-7 w-7' />
      </NavLink>
      <NavLink href='/profile' activeClass='text-blue-500' inactiveClass='text-zinc-500'>
        <EmojiHappyIcon className='h-7 w-7' />
      </NavLink>
      <button onClick={() => setOpen(open => !open)} className='text-zinc-500'>
        <LogoutIcon className='h-7 w-7' />
      </button>
    </footer>
  )
}

export default Footer
