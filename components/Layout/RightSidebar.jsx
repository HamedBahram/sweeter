import WhoToFollow from '@components/WhoToFollow'

const RightSidebar = () => {
  return (
    <section className='hidden grow p-4 lg:block'>
      <WhoToFollow className='m-1 rounded-md bg-zinc-100 px-6 py-4 shadow-md' />
    </section>
  )
}

export default RightSidebar
