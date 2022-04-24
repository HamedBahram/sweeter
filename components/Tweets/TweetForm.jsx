/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSWRConfig } from 'swr'

import avatar from '@public/assets/img/avatar.svg'
import Image from 'next/image'
import LoadingSpinner from '@components/Utils/LoadingSpinner'

const TweetForm = () => {
  const [text, setText] = useState('')
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { data: session } = useSession()
  const { userId, image } = session.user
  const { mutate } = useSWRConfig()

  const handleChange = e => {
    const { value } = e.target
    const numCharacters = value.split('').length
    setText(value)
    setCount(numCharacters)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, text }),
      })

      const { error } = await response.json()
      if (error) throw error

      mutate('/api/tweets')
      setText('')
      setCount(0)
    } catch (error) {
      setError(error)
    }

    setLoading(false)
  }

  return (
    <>
      {error && (
        <div className='p-4 text-center text-sm font-medium text-red-400'>
          {error.message || 'Something went wrong'}
        </div>
      )}
      <div className='flex items-start space-x-4 p-4'>
        <div className='h-10 w-10 rounded-full'>
          {image ? (
            <img src={image} alt='' className='rounded-full' />
          ) : (
            <Image src={avatar} alt='' className='rounded-full' />
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <form onSubmit={handleSubmit}>
            <div className='border-b border-gray-200 focus-within:border-blue-600'>
              <label htmlFor='comment' className='sr-only'>
                What&apos;s happening?
              </label>
              <textarea
                rows={3}
                name='comment'
                id='comment'
                maxLength='280'
                value={text}
                onChange={handleChange}
                className='block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-blue-600 focus:ring-0 sm:text-sm'
                placeholder="What's happening?"
              />
            </div>
            <div className='flex justify-between pt-2'>
              <div className='text-sm font-medium'>{count} / 280</div>
              <div className='flex-shrink-0'>
                <button
                  type='submit'
                  disabled={!Boolean(text) || count > 280}
                  className='inline-flex items-center rounded-3xl border border-transparent bg-blue-500 px-4 py-1 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-default disabled:bg-blue-300'
                >
                  {loading ? <LoadingSpinner className='h-4 w-4 border-white' /> : 'Sweet'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default TweetForm
