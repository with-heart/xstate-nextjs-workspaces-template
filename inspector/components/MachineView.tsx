import {Box} from '@chakra-ui/layout'
import {useInterpret} from '@xstate/react'
import {useEffect, useRef} from 'react'
import {StateMachine} from 'xstate'

export const MachineView = ({
  machine,
  fileText,
}: {
  machine: StateMachine<any, any, any>
  fileText: string
  slug: string
}) => {
  useInterpret(machine, {devTools: true})
  const fileTextRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // @ts-ignore
    const hljs = window.hljs
    if (hljs) {
      hljs.highlightBlock(fileTextRef.current)
    }
  }, [fileTextRef, fileText])

  return (
    <Box w="full" className="hljs-container">
      <Box maxW="6xl" py={4} mx="auto">
        <pre>
          <code ref={fileTextRef} className="lang-ts">
            {fileText}
          </code>
        </pre>
      </Box>
    </Box>
  )
}
