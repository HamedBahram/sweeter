import { useSWRConfig } from 'swr'
import Tweet from './Tweet'
import TweetForm from './TweetForm'

const Tweets = ({ tweets = [] }) => {
  const { mutate } = useSWRConfig()

  return (
    <>
      <TweetForm />
      <div>
        <button
          onClick={() => mutate('/api/tweets')}
          className='block border-y p-3 text-center font-medium text-blue-500'
        >
          Show More Sweets
        </button>
      </div>
      <ul>
        {tweets.map(tweet => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </ul>
    </>
  )
}

export default Tweets
