import useSWR from 'swr'
import WhoToFollow from '@components/WhoToFollow'
import { fetcher } from '@utils/fetcher'

const RightSidebar = () => {
  const { data, error } = useSWR('/api/users', fetcher)

  if (error) return <div className='p-4 text-sm font-medium'>Failed to fetch users!</div>
  if (!data) return <div className='p-4 text-sm font-medium'>Loading suggestions...</div>

  const { users = [] } = data

  return (
    <section className='hidden grow p-4 lg:block'>
      <WhoToFollow
        users={users}
        title='Who to Follow'
        className='m-1 rounded-md bg-zinc-100 px-6 py-4 shadow-md'
      />
    </section>
  )
}

export default RightSidebar
