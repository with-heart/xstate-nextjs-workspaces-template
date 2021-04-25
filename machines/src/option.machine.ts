import {RefObject} from 'react'
import {ActorRefFrom, createMachine, sendParent} from 'xstate'
import {createModel} from 'xstate/lib/model'
import {scrollableListboxModel} from './scrollable-listbox.machine'

export type OptionRef = ActorRefFrom<typeof optionMachine>

export interface ScrollableListboxOption {
  id: string
  optionRef: () => RefObject<HTMLElement>
  ref: ActorRefFrom<typeof optionMachine>
}

export const optionModel = createModel(
  {
    id: (undefined as unknown) as string,
  },
  {
    events: {
      click: () => ({}),
      select: () => ({}),
      deselect: () => ({}),
    },
  },
)

export const optionMachine = createMachine<typeof optionModel>(
  {
    id: 'option',
    context: optionModel.initialContext,
    initial: 'deselected',
    on: {
      click: {actions: 'notifyClicked'},
    },
    states: {
      deselected: {
        on: {select: 'selected'},
      },
      selected: {
        on: {deselect: 'deselected'},
      },
    },
  },
  {
    actions: {
      notifyClicked: sendParent((context) =>
        scrollableListboxModel.events.optionClicked(context.id),
      ),
    },
  },
)
