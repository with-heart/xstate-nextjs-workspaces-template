import {Box, Stack} from '@chakra-ui/layout'
import React, {useEffect, useRef} from 'react'
import {StateMachine} from 'xstate'
import {MachinePageProps} from '../interfaces/MachinePageProps'

export const MachineView = ({
  machine,
  fileText,
  page: Page,
}: {
  machine: StateMachine<any, any, any>
  page?: React.ComponentType<MachinePageProps<any>>
  fileText: string
  slug: string
}) => {
  const fileTextRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hljs = window.hljs
    if (hljs && fileTextRef.current) {
      hljs.highlightBlock(fileTextRef.current)
    }
  }, [fileTextRef, fileText])

  return (
    <Stack w="full">
      {Page && (
        <Box maxW="4xl" mx="auto">
          <Page machine={machine} />
        </Box>
      )}
      <Box className="hljs-container">
        <Box maxW="6xl" py={4} mx="auto">
          <pre>
            <code ref={fileTextRef} className="lang-ts">
              {fileText}
            </code>
          </pre>
        </Box>
      </Box>
    </Stack>
  )
}
