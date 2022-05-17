import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header'
import Footer from './Footer'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import LoadingSkeleton from './LoadingSkeleton'
import NewUserModal from '@components/auth/NewUserModal'

const Layout = ({ title, children }) => {
  const { data: session, status } = useSession({ required: true })
  const [signoutModalIsOpen, setSignoutModalIsOpen] = useState(false)
  const [newUserModalIsOpen, setNewUserModalIsOpen] = useState(false)

  useEffect(() => {
    if (!session) return
    session.user.username ? setNewUserModalIsOpen(false) : setNewUserModalIsOpen(true)
  }, [session])

  if (status === 'loading') {
    return <LoadingSkeleton />
  }

  return (
    <div className='mx-auto flex max-w-7xl'>
      <LeftSidebar open={signoutModalIsOpen} setOpen={setSignoutModalIsOpen} />
      <section className='main flex h-screen w-screen max-w-3xl grow-5 flex-col border-x sm:w-auto'>
        <Header title={title} />
        <main className='flex-1 overflow-auto'>
          <NewUserModal open={newUserModalIsOpen} />
          {children}
        </main>
        <Footer setOpen={setSignoutModalIsOpen} />
      </section>
      <RightSidebar />
      <ToastContainer position='top-right' transition={Bounce} />
    </div>
  )
}

export default Layout
