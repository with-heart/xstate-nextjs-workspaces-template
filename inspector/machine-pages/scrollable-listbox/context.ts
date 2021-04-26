import {useService} from '@xstate/react'
import {scrollableListboxMachine} from 'machines'
import {createContext, useContext} from 'react'
import {InterpreterFrom} from 'xstate'

export interface ScrollableListboxContext {
  service: InterpreterFrom<typeof scrollableListboxMachine>
}

export const ScrollableListboxContext = createContext(
  undefined as ScrollableListboxContext,
)

export const useScrollableListboxContext = () =>
  useContext(ScrollableListboxContext)

export const useScrollableListboxService = () => {
  const {service} = useScrollableListboxContext()
  return useService(service)
}
