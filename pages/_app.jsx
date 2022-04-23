import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout/Layout'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout title={Component.title}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default App
