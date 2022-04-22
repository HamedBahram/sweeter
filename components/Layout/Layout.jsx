import Header from './Header'
import Footer from './Footer'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

const Layout = ({ title, children }) => {
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
