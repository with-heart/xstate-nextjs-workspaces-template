import {Box} from '@chakra-ui/layout'
import {useService} from '@xstate/react'
import {idleMachine} from 'machines'
import {MachinePageProps} from '../interfaces/MachinePageProps'

export default function IdleMachinePage({
  service,
}: MachinePageProps<typeof idleMachine>) {
  const [state, send] = useService(service)
  return (
    <Box>
      <h1>The Idle Machine!</h1>
      <p>Current State: {state.value}</p>
    </Box>
  )
}
