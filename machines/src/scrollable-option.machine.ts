import {RefObject} from 'react'
import {ActorRefFrom, createMachine, sendParent} from 'xstate'
import {createModel} from 'xstate/lib/model'
import {scrollableListboxModel} from './scrollable-listbox.machine'

export type ScrollableOptionRef = ActorRefFrom<typeof scrollableOptionMachine>

export interface ScrollableListboxOption {
  id: string
  optionRef: () => RefObject<HTMLElement>
  ref: ActorRefFrom<typeof scrollableOptionMachine>
}

export const optionModel = createModel(
  {
    id: (undefined as unknown) as string,
  },
  {
    events: {
      click: () => ({}),
    },
  },
)

export const scrollableOptionMachine = createMachine<typeof optionModel>(
  {
    id: 'option',
    context: optionModel.initialContext,
    on: {
      click: {actions: 'notifyClicked'},
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
