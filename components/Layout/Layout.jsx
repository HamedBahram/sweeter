import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import { ToastContainer, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './Header'
import Footer from './Footer'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import LoadingSkeleton from './LoadingSkeleton'

const Layout = ({ title, children }) => {
  const router = useRouter()
  const { data: session, status } = useSession({ required: true })
  const [open, setOpen] = useState(false)

  if (status === 'loading') {
    return <LoadingSkeleton />
  }

  if (!session.user.username && router.pathname !== '/auth/new-user') {
    router.replace('/auth/new-user')
  }

  return (
    <div className='mx-auto flex max-w-7xl'>
      <LeftSidebar open={open} setOpen={setOpen} />
      <section className='main flex h-screen w-screen max-w-3xl grow-5 flex-col border-x sm:w-auto'>
        <Header title={title} />
        <main className='flex-1 overflow-auto'>{children}</main>
        <Footer open={open} setOpen={setOpen} />
      </section>
      <RightSidebar />
      <ToastContainer position='top-right' transition={Bounce} />
    </div>
  )
}

export default Layout
