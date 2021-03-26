import {inspect} from '@xstate/inspect'
import React from 'react'

/**
 * Calls the `inspect` method from `@xstate/inspect` and renders the
 * `iframe[data-xstate]` element that the inspector will be rendered into.
 *
 * Note: Your machines/actors MUST be started from within this component's
 * `children` tree in order for the inspector to work.
 */
export default function MachineContainer({
  children,
}: {
  children: React.ReactNode
}) {
  const [shouldShow, setShouldShow] = React.useState(false)

  React.useEffect(() => {
    inspect()
    setShouldShow(true)
  }, [])

  return (
    <div>
      <iframe data-xstate style={{width: '100%', minHeight: '500px'}} />
      {shouldShow && children}
    </div>
  )
}
