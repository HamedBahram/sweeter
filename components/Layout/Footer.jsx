import { HomeIcon, SearchIcon, BellIcon, MailIcon } from '@heroicons/react/solid'
import NavLink from '../Utils/NavLink'

const Footer = () => {
  return (
    <footer className='flex items-center justify-center gap-16 border-t py-3 sm:hidden'>
      <NavLink href='/' activeClass='text-blue-500' inactiveClass='text-zinc-500'>
        <HomeIcon className='h-7 w-7' />
      </NavLink>
      <NavLink href='/search' activeClass='text-blue-500' inactiveClass='text-zinc-500'>
        <SearchIcon className='h-7 w-7' />
      </NavLink>
      <NavLink href='/notifications' activeClass='text-blue-500' inactiveClass='text-zinc-500'>
        <BellIcon className='h-7 w-7' />
      </NavLink>
      <NavLink href='/inbox' activeClass='text-blue-500' inactiveClass='text-zinc-500'>
        <MailIcon className='h-7 w-7' />
      </NavLink>
    </footer>
  )
}

export default Footer
