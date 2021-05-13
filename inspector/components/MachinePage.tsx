import {useInterpret} from '@xstate/react'
import {ReactNode} from 'react'
import {
  EventObject,
  MachineConfig,
  PayloadSender,
  State,
  StateMachine,
} from 'xstate'
import {
  createReactContextHelpers,
  XStateReactContextHelpers,
} from 'xstate-helpers'

export interface MachinePageProps {
  machine: StateMachine<any, any, any>
  children: ReactNode
}

export interface MachinePageOptions<
  Context extends {} = any,
  Event extends EventObject = any,
> {
  context?: Context
  config?: MachineConfig<Context, any, Event>
}

const page = createReactContextHelpers(
  'MachinePage',
  (props: {machine: StateMachine<any, any, any>}) => {
    const interpreter = useInterpret(props.machine, {devTools: true})
    return interpreter
  },
)

export const MachinePageProvider = page.Provider

export const useMachinePageService = <Context, Event extends EventObject>() =>
  page.useService() as ReturnType<
    XStateReactContextHelpers<Context, Event, any, any>['useService']
  >
export const useMachinePageSelector = <Context, Event extends EventObject, T>(
  selector: (state: State<Context, Event, any, any>) => T,
  compare?: (a: T, b: T) => boolean,
): T => {
  return page.useSelector(selector, compare)
}
export const useMachinePageSend = <Event extends EventObject>() =>
  page.useSend() as PayloadSender<Event>
