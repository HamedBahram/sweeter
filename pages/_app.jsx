import Layout from '../components/Layout/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout title={Component.title}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
