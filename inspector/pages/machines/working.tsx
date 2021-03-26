import {workingMachine} from 'machines'
import {useMachine} from '@xstate/react'
import React from 'react'
import Layout from '../../components/Layout'
import MachineContainer from '../../components/MachineContainer'

export default function Working() {
  return (
    <Layout title="Working Machine">
      <MachineContainer>
        <RenderMachine />
      </MachineContainer>
    </Layout>
  )
}

function RenderMachine() {
  useMachine(workingMachine, {devTools: true})
  return null
}

// non-React export prevents fast refresh (full reload), which allows changes to
// the machine definition in dev to be displayed
export const __preventFastRefresh = true
