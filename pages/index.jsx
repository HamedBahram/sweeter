import useSWR from 'swr'
import Tweets from '../components/Tweets/Tweets'
import { fetcher } from '../utils/fetcher'

const Home = () => {
  const { data, error } = useSWR('/api/tweets', fetcher)

  if (error) return <div>Failed to load tweets</div>
  if (!data) return <div>Loading...</div>

  return <Tweets tweets={data.tweets} />
}

Home.title = 'Home'

export default Home
