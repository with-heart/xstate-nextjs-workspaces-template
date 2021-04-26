import {forwardRef} from '@chakra-ui/system'
import {useActor, useSelector} from '@xstate/react'
import {scrollableListboxModel} from 'machines'
import {
  optionModel,
  ScrollableOptionRef,
} from 'machines/src/scrollable-option.machine'
import {MutableRefObject, useCallback, useLayoutEffect, useRef} from 'react'
import {StyledOption} from '../../components/machine-page-components'
import {useScrollableListboxContext} from './context'

export interface ScrollableOptionProps {
  children: React.ReactNode
  id: string
}

interface OptionInnerProps extends ScrollableOptionProps {
  actorRef: ScrollableOptionRef
}

interface UseOptionParams {
  id: string
  ref: MutableRefObject<HTMLElement>
}

interface UseOptionInnerParams {
  id: string
  ref: ScrollableOptionRef
}

const useOptionInner = ({id, ref}: UseOptionInnerParams) => {
  const {service} = useScrollableListboxContext()
  const [, send] = useActor(ref)
  const selected = useSelector(
    service,
    useCallback((state) => state.context.selected === id, [id]),
  )

  const onClick = () => send(optionModel.events.click())

  return {selected, onClick}
}

const OptionInner = forwardRef<OptionInnerProps, any>(
  ({actorRef, id, children}, ref) => {
    const {selected, ...optionProps} = useOptionInner({id, ref: actorRef})

    return (
      <StyledOption
        ref={ref}
        role="option"
        id={id}
        aria-selected={selected}
        {...optionProps}
      >
        {children}
      </StyledOption>
    )
  },
)

const useScrollableOption = ({id, ref}: UseOptionParams) => {
  const {service} = useScrollableListboxContext()

  const actorRef = useSelector(
    service,
    useCallback(
      (state) => {
        const option = state.context.options.find((option) => option.id === id)
        if (!option) return undefined
        return option.ref
      },
      [id],
    ),
  )

  useLayoutEffect(() => {
    service.send(scrollableListboxModel.events.registerOption(id, () => ref))
  }, [id, ref])

  return actorRef
}

export const ScrollableOption = ({id, children}: ScrollableOptionProps) => {
  const ref = useRef()
  const actorRef = useScrollableOption({id, ref})

  return actorRef ? (
    <OptionInner ref={ref} actorRef={actorRef} id={id}>
      {children}
    </OptionInner>
  ) : (
    <StyledOption ref={ref} id={id}>
      {children}
    </StyledOption>
  )
}
