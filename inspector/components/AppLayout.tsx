import {Flex, Grid, Heading} from '@chakra-ui/react'
import {ReactNode} from 'react'
import {Link} from './Link'

export const AppLayout = ({children}: {children: ReactNode}) => (
  <Grid templateRows="50px calc(100vh - 50px)">
    <Flex as="header" ml={3} align="center">
      <Link href="/">
        <Heading as="h1">Machines</Heading>
      </Link>
    </Flex>
    <div>{children}</div>
  </Grid>
)
