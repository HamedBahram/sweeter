import Image from 'next/image'
import avatar from '../../public/assets/img/hamed.jpg'

const Header = ({ title }) => {
  return (
    <header className='flex items-center gap-6 border-b px-4 py-2'>
      <div className='h-8 w-8 rounded-full sm:hidden'>
        <Image src={avatar} alt='' className='rounded-full' />
      </div>
      <p className='text-base font-bold'>{title}</p>
    </header>
  )
}

export default Header
