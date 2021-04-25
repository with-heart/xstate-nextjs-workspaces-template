import Head from 'next/head'
import Link from 'next/link'
import React, {ReactNode} from 'react'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'xstate-nextjs-workspaces-template',
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>{' '}
        |{' '}
        <Link href="/machines/idle">
          <a>Idle Machine</a>
        </Link>{' '}
        |{' '}
        <Link href="/machines/working">
          <a>Working Machine</a>
        </Link>
      </nav>
    </header>
    <main>{children}</main>
  </div>
)

export default Layout
