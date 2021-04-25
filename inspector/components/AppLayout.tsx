import Link from 'next/link'
import {ReactNode} from 'react'

export const AppLayout = ({children}: {children: ReactNode}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateRows: '50px 1fr',
      minHeight: '100vh',
    }}
  >
    <header>
      <Link href="/">
        <a>
          <h1>Machines</h1>
        </a>
      </Link>
    </header>
    <div>{children}</div>
  </div>
)
