import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import WhoToFollow from '@components/WhoToFollow'
import { fetcher } from '@utils/fetcher'

const Following = () => {
  const { data: session } = useSession()
  const { userId } = session.user
  const { data, error } = useSWR(`/api/users/${userId}/following`, fetcher)

  if (error) return <div className='p-4 text-sm font-medium'>Failed to fetch users!</div>
  if (!data) return <div className='p-4 text-sm font-medium'>Loading suggestions...</div>

  const { users = [] } = data

  return <WhoToFollow users={users} title='People You Follow' className='px-6 py-4' />
}

Following.title = 'Your Tribe'

export default Following
