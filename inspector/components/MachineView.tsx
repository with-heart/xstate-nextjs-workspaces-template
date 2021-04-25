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
    <div
      className="hljs-container"
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <pre>
          <code ref={fileTextRef} className="lang-ts">
            {fileText}
          </code>
        </pre>
      </div>
    </div>
  )
}
