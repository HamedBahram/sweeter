import Link from 'next/link'
import Tweet from './Tweet'
import TweetForm from './TweetForm'

const Tweets = ({ tweets }) => {
  return (
    <>
      <TweetForm />
      <Link href='/'>
        <a className='block border-y p-3 text-center font-medium text-blue-500'>Show More Sweets</a>
      </Link>
      <ul>
        {tweets.map(tweet => (
          <Tweet key={tweet.date} tweet={tweet} />
        ))}
      </ul>
    </>
  )
}

export default Tweets
