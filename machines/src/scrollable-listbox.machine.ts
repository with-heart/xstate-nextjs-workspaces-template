import {RefObject} from 'react'
import {createMachine, spawn} from 'xstate'
import {createModel, ModelContextFrom, ModelEventsFrom} from 'xstate/lib/model'
import {optionMachine, ScrollableListboxOption} from './option.machine'

interface RefGetter {
  (): RefObject<HTMLElement>
}

const noop = () => {}

export const scrollableListboxModel = createModel(
  {
    selected: undefined as string | undefined,
    ref: noop as RefGetter,
    options: [] as ScrollableListboxOption[],
  },
  {
    events: {
      registerSelect: (getRef: RefGetter) => ({getRef}),
      registerOption: (id: string, getRef: RefGetter) => ({id, getRef}),
      focus: () => ({}),
      blur: () => ({}),
      arrowDown: () => ({}),
      arrowUp: () => ({}),
      home: () => ({}),
      end: () => ({}),
      optionClicked: (id: string) => ({id}),
    },
  },
)

export const scrollableListboxMachine = createMachine<
  typeof scrollableListboxModel
>(
  {
    id: 'single-select',
    context: scrollableListboxModel.initialContext,
    initial: 'blurred',
    states: {
      blurred: {
        on: {
          focus: 'focused',
        },
      },
      focused: {
        on: {
          blur: 'blurred',
          arrowDown: {actions: ['selectNextOption', 'updateScroll']},
          arrowUp: {actions: ['selectPreviousOption', 'updateScroll']},
          home: {actions: ['selectFirstOption', 'updateScroll']},
          end: {actions: ['selectLastOption', 'updateScroll']},
          optionClicked: {actions: ['selectClickedOption', 'updateScroll']},
        },
      },
    },
    on: {
      registerSelect: {actions: 'registerSelect'},
      registerOption: {actions: 'registerOption'},
    },
  },
  {
    actions: {
      selectFirstOption: scrollableListboxModel.assign({
        selected: (context) => context.options[0].id,
      }),
      selectNextOption: scrollableListboxModel.assign({
        selected: (context) => {
          const currentIndex = context.options.findIndex(
            (option) => option.id === context.selected,
          )
          const hasNext = currentIndex !== context.options.length - 1
          return hasNext
            ? context.options[currentIndex + 1].id
            : context.selected
        },
      }),
      selectPreviousOption: scrollableListboxModel.assign({
        selected: (context) => {
          const currentIndex = context.options.findIndex(
            (option) => option.id === context.selected,
          )
          const hasPrev = currentIndex > 0
          return hasPrev
            ? context.options[currentIndex - 1].id
            : context.selected
        },
      }),
      selectLastOption: scrollableListboxModel.assign({
        selected: (context) => context.options[context.options.length - 1].id,
      }),
      selectClickedOption: scrollableListboxModel.assign(
        {
          selected: (_context, event) => event.id,
        },
        'optionClicked',
      ),
      updateScroll: (context) => {
        const select = context.ref().current
        const selectedOption = context.options
          .find((option) => option.id === context.selected)
          ?.optionRef().current
        if (select && selectedOption) {
          ensureElementVisibleWithinContainer(select, selectedOption)
        }
      },
      registerSelect: scrollableListboxModel.assign(
        {
          ref: (_context, event) => event.getRef,
        },
        'registerSelect',
      ),
      registerOption: scrollableListboxModel.assign(
        {
          options: (context, event) => {
            const option = {
              id: event.id,
              optionRef: event.getRef,
              ref: spawn(
                optionMachine.withContext({
                  id: event.id,
                }) as typeof optionMachine,
                `option-${event.id}`,
              ),
            }
            return [...context.options, option]
          },
        },
        'registerOption',
      ),
    },
    guards: {
      isRegistrationComplete: (context, event, meta) => {
        console.log({context, event, meta})
        return context.ref !== noop && !!context.options.length
      },
    },
  },
)

/**
 * Updates the scroll position of the container to ensure that the element is
 * visible within the container.
 *
 * If the element is fully visible withinin the currently visible area, nothing
 *
 * If the element is (partially) hidden above the currently visible area, the
 * container scrolls so that the element is fully visible at the top of the
 * container.
 *
 * If the element is (partially) hidden below the currently visible area, the
 * container scrolls so that the element is fully visible at the bottom of the
 * container.
 */
function ensureElementVisibleWithinContainer(
  container: HTMLElement,
  element: HTMLElement,
) {
  const containerIsScrollable = container.scrollHeight > container.clientHeight
  // since the container isn't scrollable, the element can never be hidden so
  // there's nothing to do
  if (!containerIsScrollable) return

  const scrollBottom = container.clientHeight + container.scrollTop
  const elementBottom = element.offsetTop + element.offsetHeight

  // if the element is (partially) hidden below the currently visible area
  if (elementBottom > scrollBottom) {
    container.scrollTop = elementBottom - container.clientHeight
    return
  }

  // if the element is (partially) hidden above the currently visible area
  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop
    return
  }
}
