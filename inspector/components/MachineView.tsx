import {useInterpret} from '@xstate/react'
import {useRef} from 'react'
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
  const fileTextRef = useRef(null)

  return (
    <div>
      <pre>
        <code ref={fileTextRef} className="lang-ts">
          {fileText}
        </code>
      </pre>
    </div>
  )
}
