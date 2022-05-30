import { useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { reloadSession } from '@utils/helper'
import RoundButton from '@components/UI/RoundButton'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as yup from 'yup'

const NewUserForm = () => {
  const { data: session } = useSession()

  const {
    values: { username, isUsernameUnique },
    touched,
    errors,
    getFieldProps,
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: session.user.name || '',
      username: '',
      isUsernameUnique: true,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(2, 'Should be 2 characters minimum')
        .max(20, 'Should be 20 characters maximum')
        .required('Name is required'),
      username: yup
        .string()
        .min(2, 'Should be 2 characters minimum')
        .max(20, 'Should be 20 characters maximum')
        .required('Username is required'),
      isUsernameUnique: yup.boolean().required().oneOf([true], 'Username already exists'),
    }),
    onSubmit: updateUser,
  })

  const checkUsername = useCallback(
    async username => {
      const response = await fetch(`/api/auth/username?username=${username}`)
      if (response.ok) {
        if (!isUsernameUnique) setFieldValue('isUsernameUnique', true)
        return
      }

      setFieldValue('isUsernameUnique', false)
    },
    [isUsernameUnique, setFieldValue]
  )

  useEffect(() => {
    if (!username) {
      setFieldValue('isUsernameUnique', true)
      return
    }
    const timer = setTimeout(() => checkUsername(username), 500)
    return () => clearTimeout(timer)
  }, [username, checkUsername, setFieldValue])

  async function updateUser({ name, username }) {
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
      toast.success(`You're All Set!`, { autoClose: 3000 })
      reloadSession()
    } catch (error) {
      toast.error(error.message || 'Something went wrong', { autoClose: 3000 })
    }
  }

  return (
    <div className='p-1 sm:flex sm:items-start'>
      <div className='w-full text-left'>
        <div className='md:col-span-2'>
          <form onSubmit={handleSubmit} noValidate>
            <div className='grid grid-cols-6 gap-4 sm:gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='name'
                  className={`ml-1 block text-sm font-medium ${
                    session.user.name ? 'text-zinc-400' : 'text-zinc-700'
                  }`}
                >
                  Full Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  autoComplete='name'
                  {...getFieldProps('name')}
                  disabled={session.user.name}
                  className='mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-zinc-200 disabled:text-zinc-400 sm:text-sm'
                />
                <p className='ml-1 mt-1 text-xs font-light text-zinc-400'>
                  Should be min 2 and max 20 characters
                </p>
                {touched.name && errors.name ? (
                  <div className='ml-1 text-xs font-light text-red-400'>{errors.name}</div>
                ) : null}
              </div>

              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='username' className='ml-1 block text-sm font-medium text-gray-700'>
                  Username (handle)
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  autoComplete='email'
                  {...getFieldProps('username')}
                  className='mt-1 block w-full rounded-full border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                />
                <p className='ml-1 mt-1 text-xs font-light text-zinc-400'>
                  Should be min 2 and max 20 characters
                </p>
                {touched.username && errors.username ? (
                  <div className='ml-1 text-xs font-light text-red-400'>{errors.username}</div>
                ) : null}
                {/* 
                  Don't need to check for touched since we want to show the error 
                  even before the field loses focus.
                */}
                {errors.isUsernameUnique ? (
                  <div className='ml-1 text-xs font-light text-red-400'>
                    {errors.isUsernameUnique}
                  </div>
                ) : null}
              </div>
            </div>
            <div className='mt-6 flex justify-start'>
              <RoundButton
                size='md'
                type='submit'
                className='disabled:cursor-not-allowed disabled:bg-blue-300'
                disabled={isSubmitting || !isValid}
              >
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
