import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const Modal = ({ open, onClose = f => f, title, description, initialFocusRef, children }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} initialFocus={initialFocusRef} className='relative z-10'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/40' aria-hidden='true' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className='fixed inset-0 z-10 flex items-center justify-center p-4'>
            <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-2xl bg-white py-5 pl-6 pr-1'>
              <Dialog.Title className='text-xl font-medium leading-6 text-zinc-800'>
                {title}
              </Dialog.Title>
              <Dialog.Description className='mb-4 text-sm text-zinc-400'>
                {description}
              </Dialog.Description>
              <div className='max-h-96 overflow-y-auto pr-5'>{children}</div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Modal
