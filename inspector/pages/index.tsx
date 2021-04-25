import {Box, Flex, Heading, ListItem, UnorderedList} from '@chakra-ui/layout'
import {InferGetStaticPropsType, NextPage} from 'next'
import {Link} from '../components/Link'
import {getMachinesPath, machineFilenamesToIds} from '../utils/machines'

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  ids,
}) => (
  <Flex align="center" justify="center" minH="full">
    <Box>
      <Heading as="h2" fontSize="3xl">
        Machine List
      </Heading>
      <UnorderedList>
        {ids.map((id) => (
          <ListItem key={id}>
            <Link href={`/machines/${id}`}>{id}</Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  </Flex>
)

export default IndexPage

export const getStaticProps = async () => {
  const fs = (await import('fs')).promises
  const machinesPath = await getMachinesPath()
  const files = await fs.readdir(machinesPath)
  const ids = machineFilenamesToIds(files)

  return {
    props: {
      ids,
    },
  }
}
