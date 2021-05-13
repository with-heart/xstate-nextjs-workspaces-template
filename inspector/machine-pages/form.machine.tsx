import {Box} from '@chakra-ui/layout'
import {StateMachine} from 'xstate'
import {MachinePageProvider} from '../components/MachinePage'
import {useMachinePageService} from '../components/MachinePage'

const FormMachine = () => {
  const [state, send] = useMachinePageService()
  return (
    <Box>
      <h1>The Form Machine</h1>
      <p>Current State: {state.value}</p>
    </Box>
  )
}

export default function Page({
  machine,
}: {
  machine: StateMachine<any, any, any, any>
}) {
  return (
    <MachinePageProvider machine={machine}>
      <FormMachine />
    </MachinePageProvider>
  )
}
