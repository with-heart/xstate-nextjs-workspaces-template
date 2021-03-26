import {Machine} from 'xstate'

export const idleMachine = Machine({
  id: 'idle-machine',
  initial: 'idle',
  states: {
    idle: {},
  },
})

export const workingMachine = Machine({
  id: 'working-machine',
  initial: 'working',
  states: {
    working: {},
  },
})
