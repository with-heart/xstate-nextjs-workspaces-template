import {Flex, Grid, Heading} from '@chakra-ui/react'
import {ReactNode} from 'react'
import {Link} from './Link'

export const AppLayout = ({children}: {children: ReactNode}) => (
  <Grid templateRows="50px 1fr" minHeight="100vh">
    <Flex as="header" ml={3} align="center">
      <Link href="/">
        <Heading as="h1">Machines</Heading>
      </Link>
    </Flex>
    <div>{children}</div>
  </Grid>
)
