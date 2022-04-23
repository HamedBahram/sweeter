import { Fragment, useRef, useState, useEffect } from 'react'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { reloadSession } from '@utils/helper'

import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'

const NewUser = () => {
  const { data: session } = useSession()
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState(null)
  const [formError, setFormError] = useState(null)
  const [open] = useState(true)
  const cancelButtonRef = useRef(null)

  const checkUsername = async username => {
    const response = await fetch(`/api/auth/username?username=${username}`)
    const { error } = await response.json()
    if (response.ok) {
      setUsernameError(null)
    }

    setUsernameError(error)
  }

  useEffect(() => {
    if (!username) return
    const timer = setTimeout(() => checkUsername(username), 500)
    return () => clearTimeout(timer)
  }, [username])

  const handleClose = () => {}

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
      reloadSession()
    } catch (error) {
      setFormError(error.message)
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        <div className='flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>
          <span className='hidden sm:inline-block sm:h-screen sm:align-middle' aria-hidden='true'>
            &#8203;
          </span>

          <div className='relative inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
            {session.user.username ? (
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <div>
                  <div className='mr-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                    <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
                  </div>
                  <div className='text-start mt-3 sm:mt-5'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                      Registration Completed
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        You have successfully completed your registration.
                      </p>
                    </div>
                    <div className='mt-6 mb-4'>
                      <Link href='/'>
                        <a className='w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:text-sm'>
                          Go To Home Page
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            ) : (
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 w-full text-left sm:mt-0'>
                    <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900'>
                      Complete Your Registration
                    </Dialog.Title>
                    {formError && (
                      <div className='mb-6 text-sm font-light text-red-400'>{formError}</div>
                    )}
                    <div className='mt-5 md:col-span-2'>
                      <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-6 gap-6'>
                          {!session.user.name && (
                            <div className='col-span-6 sm:col-span-3'>
                              <label
                                htmlFor='name'
                                className='block text-sm font-medium text-gray-700'
                              >
                                Full Name
                              </label>
                              <input
                                type='text'
                                name='name'
                                id='name'
                                min='3'
                                max='15'
                                autoComplete='full-name'
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                              />
                              <p className='mt-1 text-xs font-light italic text-zinc-400'>
                                Should be min 3 and max 15 characters
                              </p>
                            </div>
                          )}

                          <div className='col-span-6 sm:col-span-3'>
                            <label
                              htmlFor='username'
                              className='block text-sm font-medium text-gray-700'
                            >
                              Username (@handle)
                            </label>
                            <input
                              type='text'
                              name='username'
                              id='username'
                              min='3'
                              max='15'
                              autoComplete='email'
                              value={username}
                              onChange={handleChange}
                              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                            />
                            <p className='mt-1 text-xs font-light italic text-zinc-400'>
                              Should be min 3 and max 15 characters
                            </p>
                            {usernameError && (
                              <div className='text-xs font-light text-red-400'>
                                {usernameError || 'Something went wrong'}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='mt-6 flex justify-start sm:mt-8'>
                          <button
                            type='submit'
                            className='w-full rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:text-sm'
                          >
                            Complete Registration
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            )}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

NewUser.title = 'Complete Your Registration'

export default NewUser
