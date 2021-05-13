import {Box} from '@chakra-ui/layout'
import {inspect} from '@xstate/inspect'
import {startCase} from 'lodash/fp'
import {GetStaticPaths, InferGetStaticPropsType, NextPage} from 'next'
import Head from 'next/head'
import React, {useEffect, useRef} from 'react'
import {MachineLayout} from '../../components/MachineLayout'
import {MachineView} from '../../components/MachineView'
import {
  exportedMachineFilenames,
  getMachinePaths,
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
    })!

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

  // check if the machine has an importable page
  let hasPage: boolean

  // check if it's a directory
  try {
    await fs.access(paths.page, constants.F_OK)
    hasPage = true
  } catch (_error) {
    hasPage = false
  }

  // if not a directory, check if it's a file
  try {
    if (!hasPage) {
      await fs.access(`${paths.page}.tsx`)
      hasPage = true
    }
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

  const machineFilenames = await exportedMachineFilenames(fs)
  const ids = machineFilenamesToIds(machineFilenames)
  const paths = ids.map((id) => ({params: {id}}))

  return {
    fallback: false,
    paths,
  }
}
