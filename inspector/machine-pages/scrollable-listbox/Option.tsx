import {forwardRef} from '@chakra-ui/system'
import {useActor, useSelector} from '@xstate/react'
import {scrollableListboxModel} from 'machines'
import {optionModel, OptionRef} from 'machines/src/option.machine'
import {MutableRefObject, useCallback, useLayoutEffect, useRef} from 'react'
import {StyledOption} from './components'
import {useScrollableListboxContext} from './context'

export interface OptionProps {
  children: React.ReactNode
  id: string
}

interface OptionInnerProps extends OptionProps {
  actorRef: OptionRef
}

interface UseOptionParams {
  id: string
  ref: MutableRefObject<HTMLElement>
}

interface UseOptionInnerParams {
  id: string
  ref: OptionRef
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

const useOption = ({id, ref}: UseOptionParams) => {
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

export const Option = ({id, children}: OptionProps) => {
  const ref = useRef()
  const actorRef = useOption({id, ref})

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
