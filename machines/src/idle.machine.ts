import {createMachine} from 'xstate'

export const idleMachine = createMachine({
  id: 'idle-machine',
  initial: 'idle',
  states: {
    idle: {},
  },
})
