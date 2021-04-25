import {createMachine} from 'xstate'

export const workingMachine = createMachine({
  id: 'working-machine',
  initial: 'working',
  states: {
    working: {},
  },
})
