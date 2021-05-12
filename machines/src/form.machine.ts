import {createMachine} from 'xstate'
import {createModel} from 'xstate/lib/model'

export const formModel = createModel({})

export const formMachine = createMachine<typeof formModel>({
  id: 'form',
  initial: 'idle',
  states: {
    idle: {},
  },
})
