/* eslint-disable @next/next/no-img-element */
import { useSWRConfig } from 'swr'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import avatar from '@public/assets/img/avatar.svg'

const WhoToFollow = ({ users, title, className }) => {
  const { data: session } = useSession()
  const { userId } = session.user
  const { mutate } = useSWRConfig()

  const handleFollow = async userId => {
    try {
      const response = await fetch(`/api/users/${userId}/follow`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { error } = await response.json()
      if (error) throw new Error(error)

      mutate('/api/users')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUnFollow = async userId => {
    try {
      const response = await fetch(`/api/users/${userId}/unfollow`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const { error } = await response.json()
      if (error) throw new Error(error)
      mutate('/api/users')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={className}>
      <h2 className='mb-5 text-xl font-bold'>{title}</h2>
      <ul className='flex flex-col gap-4'>
        {users
          .filter(user => user._id !== userId)
          .map(user => {
            const following = user.followers?.find(elm => elm === userId)
            return (
              <li className='flex items-center justify-between gap-3' key={user.username}>
                <div className='h-10 w-10 rounded-full'>
                  {user.image ? (
                    <img
                      src={user.image}
                      alt=''
                      className='h-full w-full rounded-full object-cover object-center'
                    />
                  ) : (
                    <Image src={avatar} alt='' className='rounded-full' />
                  )}
                </div>

                <div className='grow'>
                  <p className='font-semibold leading-none'>{user.name}</p>
                  <p className='text-sm text-zinc-500'>@{user.username}</p>
                </div>

                <div>
                  {following ? (
                    <button
                      onClick={() => handleUnFollow(user._id)}
                      className='w-24 rounded-3xl border border-zinc-500 py-1 text-sm font-medium transition-colors after:content-["Following"] hover:border-red-300 hover:bg-red-200 hover:text-red-500 hover:after:content-["Unfollow"]'
                    ></button>
                  ) : (
                    <button
                      onClick={() => handleFollow(user._id)}
                      className='w-24 rounded-3xl bg-zinc-800 py-1 text-sm font-medium text-white transition-colors after:content-["Follow"] hover:bg-zinc-600'
                    ></button>
                  )}
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default WhoToFollow
