import Modal from '@components/UI/Modal'
import { signOut } from 'next-auth/react'

const SignoutModal = ({ open, setOpen }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)} title='Sign Out'>
      <p className='mb-6 text-zinc-800'>Are you sure you want to sign out?</p>

      <div className='flex gap-2'>
        <button
          className='flex-1 rounded-3xl border bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-400'
          onClick={() => signOut({ redirect: false })}
        >
          Sign Out
        </button>
        <button
          className='flex-1 rounded-3xl border px-3 py-1 text-sm text-zinc-800 transition-colors hover:bg-zinc-200'
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  )
}

export default SignoutModal
