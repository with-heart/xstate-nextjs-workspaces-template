import {Machine} from 'xstate'

export const templateMachine = Machine({
  id: 'template',
  initial: 'idle',
  states: {
    idle: {
      on: {
        CLONE: 'cloning',
      },
    },
    cloning: {
      on: {
        FINISHED: 'cloned',
      },
    },
    cloned: {
      type: 'final',
      entry: 'redirect',
    },
  },
})
