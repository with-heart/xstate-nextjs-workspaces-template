import {InferGetStaticPropsType, NextPage} from 'next'
import Link from 'next/link'
import {getMachinesPath, machineFilenamesToIds} from '../utils/machines'

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  ids,
}) => (
  <div>
    <h1>Machine List</h1>
    <ul>
      {ids.map((id) => (
        <li key={id}>
          <Link href={`/machines/${id}`}>
            <a>{id}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
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
