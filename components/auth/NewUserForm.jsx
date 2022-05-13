import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { reloadSession } from '@utils/helper'
import RoundButton from '@components/UI/RoundButton'

const NewUserForm = () => {
  const { data: session } = useSession()
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(null)
  const [formError, setFormError] = useState(null)

  const checkUsername = useCallback(async username => {
    const response = await fetch(`/api/auth/username?username=${username}`)
    const { error } = await response.json()
    if (response.ok) {
      setUsernameError(null)
      return
    }

    setUsernameError(error)
  }, [])

  useEffect(() => {
    if (!username) return
    const timer = setTimeout(() => checkUsername(username), 500)
    return () => clearTimeout(timer)
  }, [username, checkUsername])

  const handleChange = e => {
    const { value } = e.target
    setUsername(value.trim())
    if (!value) setUsernameError(null)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name')
    const username = formData.get('username')

    try {
      const response = await fetch(`/api/users/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email, name, username }),
      })

      const { error } = await response.json()
      if (error) throw error
      setUsernameError(null)
      setFormError(null)
      reloadSession()
    } catch (error) {
      setFormError(error.message)
    }
  }

  return (
    <div className='p-1 sm:flex sm:items-start'>
      <div className='w-full text-left'>
        {formError && <div className='mb-6 text-sm font-light text-red-400'>{formError}</div>}
        <div className='md:col-span-2'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-6 gap-4 sm:gap-6'>
              {!session.user.name && (
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='name' className='ml-1 block text-sm font-medium text-gray-700'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    min='3'
                    max='20'
                    autoComplete='full-name'
                    className='mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                  />
                  <p className='ml-1 mt-1 text-xs font-light text-zinc-400'>
                    Should be min 3 and max 20 characters
                  </p>
                </div>
              )}

              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='username' className='ml-1 block text-sm font-medium text-gray-700'>
                  Username (handle)
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  min='3'
                  max='20'
                  autoComplete='email'
                  value={username}
                  onChange={handleChange}
                  className='mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                />
                <p className='ml-1 mt-1 text-xs font-light text-zinc-400'>
                  Should be min 3 and max 20 characters
                </p>
                {usernameError && (
                  <div className='text-xs font-light text-red-400'>
                    {usernameError || 'Something went wrong'}
                  </div>
                )}
              </div>
            </div>
            <div className='mt-6 flex justify-start'>
              <RoundButton size='md' type='submit' disabled={Boolean(usernameError)}>
                Complete Registration
              </RoundButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewUserForm
