import {idleMachine} from 'machines'
import {useMachine} from '@xstate/react'
import React from 'react'
import Layout from '../../components/Layout'
import MachineContainer from '../../components/MachineContainer'

export default function Idle() {
  return (
    <Layout title="Idle Machine">
      <MachineContainer>
        <RenderMachine />
      </MachineContainer>
    </Layout>
  )
}

function RenderMachine() {
  useMachine(idleMachine, {devTools: true})
  return null
}

// non-React export prevents fast refresh (full reload), which allows changes to
// the machine definition in dev to be displayed
export const __preventFastRefresh = true
