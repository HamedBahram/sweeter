import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { reloadSession } from '@utils/helper'
import { toast } from 'react-toastify'
import LoadingSpinner from '@components/Utils/LoadingSpinner'

const ProfileForm = () => {
  const { data: session } = useSession()

  const [name, setName] = useState(session.user.name)
  const [nameTouched, setNameTouched] = useState(false)

  const [email] = useState(session.user.email)

  const [username, setUsername] = useState(session.user.username)
  const [usernameError, setUsernameError] = useState(null)
  const [usernameTouched, setUsernameTouched] = useState(false)

  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState(null)

  const checkUsername = useCallback(
    async username => {
      if (username === session.user.username) {
        setUsernameError(null)
        return
      }

      const response = await fetch(`/api/auth/username?username=${username}`)
      const { error } = await response.json()
      if (response.ok) {
        setUsernameError(null)
      }

      setUsernameError(error)
    },
    [session.user.username]
  )

  useEffect(() => {
    if (!usernameTouched || !username) return
    const timer = setTimeout(() => checkUsername(username), 500)
    return () => clearTimeout(timer)
  }, [usernameTouched, username, checkUsername])

  const handleNameChange = e => {
    setName(e.target.value)
    setNameTouched(true)
  }

  const handleUsernameChange = e => {
    const { value } = e.target
    setUsernameTouched(true)
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
      setLoading(true)
      setFormError(null)
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
      setNameTouched(false)
      setUsernameTouched(false)
      reloadSession()
      toast.success('Profile was successfully updated.', { autoClose: 3000 })
    } catch (error) {
      setFormError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className='px-4 py-5  sm:p-6'>
      <div className='md:grid md:grid-cols-3 md:gap-6'>
        <div className='col-span-3'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>Your Profile</h3>
          {formError && <div className='mb-6 text-sm  text-red-400'>{formError}</div>}
        </div>
        <div className='col-span-3 mt-5 md:mt-0'>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                  Full Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  min='3'
                  max='20'
                  value={name}
                  onChange={handleNameChange}
                  autoComplete='full-name'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                />
                <p className='mt-1 text-xs font-light italic text-zinc-400'>
                  Should be min 3 and max 20 characters
                </p>
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                  Username (@handle)
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  min='3'
                  max='20'
                  value={username}
                  onChange={handleUsernameChange}
                  autoComplete='username'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                />
                <p className='mt-1 text-xs font-light italic text-zinc-400'>
                  Should be min 3 and max 20 characters
                </p>
                {usernameError && (
                  <div className='text-xs font-light text-red-400'>
                    {usernameError || 'Something went wrong'}
                  </div>
                )}
              </div>

              <div className='col-span-6 sm:col-span-4'>
                <label htmlFor='email-address' className='block text-sm font-medium text-gray-700'>
                  Email address
                </label>
                <input
                  type='text'
                  name='email-address'
                  id='email-address'
                  value={email}
                  autoComplete='email'
                  disabled
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-200 sm:text-sm'
                />
              </div>
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                disabled={Boolean(usernameError) || (!nameTouched && !usernameTouched)}
                className='w-full rounded-3xl border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-200 sm:w-auto sm:text-sm'
              >
                {loading ? <LoadingSpinner className='h-4 w-4 border-white' /> : 'Update Info'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm
