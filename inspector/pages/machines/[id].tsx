import {Box} from '@chakra-ui/layout'
import {inspect} from '@xstate/inspect'
import {startCase} from 'lodash/fp'
import {GetStaticPaths, InferGetStaticPropsType, NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect, useRef} from 'react'
import {MachineLayout} from '../../components/MachineLayout'
import {MachineView} from '../../components/MachineView'
import {
  getMachinePaths,
  getMachinesPath,
  machineFilenamesToIds,
  useGetImports,
} from '../../utils/machines'

const MachinePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  fileText,
  slug,
  hasPage,
}) => {
  const iframeRef = useRef(null)
  const imports = useGetImports({slug, hasPage})

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
                page={imports.page}
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
  const {constants, promises: fs} = await import('fs')
  const paths = await getMachinePaths(params.id)

  // read the machine's source
  const fileText = await fs.readFile(paths.machine, 'utf-8')

  // check if the machine has a page
  let hasPage: boolean
  try {
    await fs.access(paths.page, constants.F_OK)
    hasPage = true
  } catch (_error) {
    hasPage = false
  }

  return {
    props: {
      slug: params.id,
      fileText,
      hasPage,
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
