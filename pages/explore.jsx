import useSWR from 'swr'
import WhoToFollow from '@components/WhoToFollow'
import { fetcher } from '@utils/fetcher'

const Explore = () => {
  const { data, error } = useSWR('/api/users', fetcher)

  if (error) return <div className='p-4 text-sm font-medium'>Failed to fetch users!</div>
  if (!data) return <div className='p-4 text-sm font-medium'>Loading suggestions...</div>

  const { users = [] } = data

  return <WhoToFollow users={users} title='Suggested for you' className='px-6 py-4' />
}

Explore.title = 'Explore Sweeter'

export default Explore
