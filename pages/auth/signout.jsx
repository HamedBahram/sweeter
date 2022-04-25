import { Fragment, useRef, useState } from 'react'
import { signOut } from 'next-auth/react'
import { Dialog, Transition } from '@headlessui/react'

const SignOutPage = () => {
  const [open, setOpen] = useState(true)
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className='flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
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

          <div className='relative inline-block transform overflow-hidden rounded-md bg-white px-4 pt-5 pb-4 text-center align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle'>
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
                <div className='text-start mt-3 sm:mt-5'>
                  <Dialog.Title
                    as='h3'
                    className='mb-6 text-2xl font-medium leading-6 text-gray-900'
                  >
                    Signout
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>Are you sure you want to sign out?</p>
                  </div>
                  <div className='mt-6 mb-4'>
                    <button
                      onClick={() => signOut()}
                      className='w-full rounded-3xl border border-transparent bg-blue-600 py-1.5 px-4 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:text-sm'
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

SignOutPage.title = 'Signout Page'

export default SignOutPage
