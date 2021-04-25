import {InterpreterFrom, StateMachine} from 'xstate'

export interface MachinePageProps<
  Machine extends StateMachine<any, any, any, any>
> {
  service: InterpreterFrom<Machine>
}
