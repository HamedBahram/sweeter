import Modal from '@components/UI/Modal'
import RoundButton from '@components/UI/RoundButton'
import { signOut } from 'next-auth/react'

const SignoutModal = ({ open, setOpen }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)} title='Sign Out'>
      <p className='mb-6 text-zinc-800'>Are you sure you want to sign out?</p>

      <div className='flex items-center gap-4 px-1 py-2'>
        <RoundButton size='sm' className='flex-1' onClick={() => signOut({ redirect: false })}>
          Sign Out
        </RoundButton>
        <RoundButton
          size='sm'
          color='bg-white hover:bg-zinc-200'
          textColor='text-zinc-800'
          className='flex-1 border-2'
          onClick={() => setOpen(false)}
        >
          Cancel
        </RoundButton>
      </div>
    </Modal>
  )
}

export default SignoutModal
