import {Box} from '@chakra-ui/layout'
import {useService} from '@xstate/react'
import {formMachine} from '../../machines/src'
import {MachinePageProps} from '../interfaces/MachinePageProps'

export default function FormMachinePage({
  service,
}: MachinePageProps<typeof formMachine>) {
  const [state, send] = useService(service)
  return (
    <Box>
      <h1>The Form Machine</h1>
      <p>Current State: {state.value}</p>
    </Box>
  )
}
