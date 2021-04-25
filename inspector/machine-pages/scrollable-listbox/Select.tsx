import {scrollableListboxModel} from 'machines'
import {
  KeyboardEvent,
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
} from 'react'
import {StyledSelect} from './components'
import {useScrollableListboxService, useSelectedOption} from './context'

export interface SelectProps {
  children: ReactNode
}

const keyMap = {
  ArrowDown: scrollableListboxModel.events.arrowDown,
  ArrowUp: scrollableListboxModel.events.arrowUp,
  Home: scrollableListboxModel.events.home,
  End: scrollableListboxModel.events.end,
}

const useSelect = (ref: MutableRefObject<HTMLElement>) => {
  const [state, send] = useScrollableListboxService()
  const selected = state.context.selected

  const onFocus = () => send(scrollableListboxModel.events.focus())
  const onBlur = () => send(scrollableListboxModel.events.blur())
  const onKeyDown = (e: KeyboardEvent) => {
    const event = keyMap[e.key]
    if (!event) return

    e.preventDefault()
    send(event())
  }

  useLayoutEffect(() => {
    send(scrollableListboxModel.events.registerSelect(() => ref))
  }, [ref, send])

  return {selected, onFocus, onBlur, onKeyDown}
}

export const Select = ({children}: SelectProps) => {
  const ref = useRef()
  const {selected, ...selectProps} = useSelect(ref)

  return (
    <StyledSelect
      ref={ref}
      role="listbox"
      aria-labelledby="listbox-header"
      aria-activedescendant={selected}
      tabIndex={0}
      {...selectProps}
    >
      {children}
    </StyledSelect>
  )
}
