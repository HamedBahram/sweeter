import Image from 'next/image'
import avatar from '../../public/assets/img/hamed.jpg'

const TweetForm = () => {
  return (
    <div className='flex items-start space-x-4 p-4'>
      <div className='h-10 w-10 rounded-full'>
        <Image src={avatar} alt='' className='rounded-full' />
      </div>
      <div className='min-w-0 flex-1'>
        <form action='#'>
          <div className='border-b border-gray-200 focus-within:border-blue-600'>
            <label htmlFor='comment' className='sr-only'>
              What&apos;s happening?
            </label>
            <textarea
              rows={3}
              name='comment'
              id='comment'
              className='block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-blue-600 focus:ring-0 sm:text-sm'
              placeholder="What's happening?"
              defaultValue={''}
            />
          </div>
          <div className='flex justify-end pt-2'>
            <div className='flex-shrink-0'>
              <button
                type='submit'
                className='inline-flex items-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Sweet
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetForm
