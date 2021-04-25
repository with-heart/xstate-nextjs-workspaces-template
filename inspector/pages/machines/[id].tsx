import {Box} from '@chakra-ui/layout'
import {inspect} from '@xstate/inspect'
import {startCase} from 'lodash/fp'
import {GetStaticPaths, InferGetStaticPropsType, NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect, useRef} from 'react'
import {MachineLayout} from '../../components/MachineLayout'
import {MachineView} from '../../components/MachineView'
import {
  getMachinePath,
  getMachinesPath,
  machineFilenamesToIds,
  useGetImports,
} from '../../utils/machines'

const MachinePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fileText,
  slug,
}) => {
  const iframeRef = useRef(null)
  const imports = useGetImports(slug)

  useEffect(() => {
    const {disconnect} = inspect({
      iframe: () => iframeRef.current,
    })

    return disconnect
  }, [slug])

  return (
    <>
      <Head>
        <title>{startCase(slug)} Machine</title>
      </Head>
      <MachineLayout
        content={
          <>
            {imports && (
              <MachineView
                slug={slug}
                fileText={fileText}
                machine={imports.machine}
              />
            )}
          </>
        }
        iframe={
          <Box as="iframe" w="full" h="full" key="iframe" ref={iframeRef} />
        }
      />
    </>
  )
}

export default MachinePage

export const getStaticProps = async ({params}: {params: {id: string}}) => {
  const fs = (await import('fs')).promises
  const machinePath = await getMachinePath(params.id)
  const fileText = await fs.readFile(machinePath, 'utf-8')

  return {
    props: {
      slug: params.id,
      fileText,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fs = (await import('fs')).promises
  const machinesPath = await getMachinesPath()
  const files = await fs.readdir(machinesPath)

  const ids = machineFilenamesToIds(files)
  const paths = ids.map((id) => ({params: {id}}))

  return {
    fallback: false,
    paths,
  }
}
