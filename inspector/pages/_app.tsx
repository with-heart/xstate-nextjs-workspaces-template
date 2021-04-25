import {AppProps} from 'next/app'
import Head from 'next/head'
import {AppLayout} from '../components/AppLayout'

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>Machines</title>
        <link rel="icon" type="image/png" href="./favicon.png" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}
