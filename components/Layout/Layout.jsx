import { useSession } from 'next-auth/react'
import Header from './Header'
import Footer from './Footer'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import LoadingSkeleton from './LoadingSkeleton'
import { useRouter } from 'next/router'

const Layout = ({ title, children }) => {
  const router = useRouter()
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') {
    return <LoadingSkeleton />
  }

  if (!session.user.username && router.pathname !== '/auth/new-user') {
    router.replace('/auth/new-user')
  }

  return (
    <div className='mx-auto flex max-w-6xl'>
      <LeftSidebar />
      <section className='main flex h-screen w-screen grow-3 flex-col border-x sm:w-auto'>
        <Header title={title} />
        <main className='flex-1 overflow-auto'>{children}</main>
        <Footer />
      </section>
      <RightSidebar />
    </div>
  )
}

export default Layout
