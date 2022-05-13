import { useState } from 'react'

import Link from 'next/link'
import { useSession } from 'next-auth/react'

import Modal from '@components/UI/Modal'
import RoundButton from '@components/UI/RoundButton'
import NewUserForm from '@components/auth/NewUserForm'

const NewUser = () => {
  const { data: session } = useSession()
  const [open] = useState(true)

  const handleClose = () => {}

  return (
    <>
      {session.user.username ? (
        <Modal open={open} onClose={handleClose} title='Registration Completed!'>
          <div className='px-1'>
            <p className='text-gray-500'>You have successfully completed your registration.</p>
            <div className='mt-6 mb-3'>
              <Link href='/'>
                <a className='focus:outline-none'>
                  <RoundButton size='md'>Send Your First Sweet</RoundButton>
                </a>
              </Link>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          title='Complete Your Registration'
          description='Choose a username for your account...'
        >
          <NewUserForm />
        </Modal>
      )}
    </>
  )
}

NewUser.title = 'Complete Your Registration'

export default NewUser
