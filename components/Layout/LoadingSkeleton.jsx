import Link from 'next/link'

const LoadingSkeleton = () => {
  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2	-translate-y-1/2'>
      <Link href='/'>
        <a className='text-3xl font-bold text-blue-500'>Sweeter</a>
      </Link>
      <div className='text-xl font-medium'>Loading...</div>
    </div>
  )
}

export default LoadingSkeleton
