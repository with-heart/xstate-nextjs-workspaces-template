import {useEffect, useState} from 'react'
import {StateMachine} from 'xstate'

/**
 * Gets the path to the `src` folder for the `machines` package within
 * `node_modules`.
 */
export const getMachinesPath = async () => {
  const path = await import('path')
  const machinesPath = path.resolve(
    process.cwd(),
    'node_modules',
    'machines/src',
  )
  return machinesPath
}

/**
 * Gets the path to a specific machine using its file slug `id`
 * (`id.machine.ts`). This path references the `src` folder of the `machines`
 * package.
 */
export const getMachinePath = async (id: string) => {
  const path = await import('path')
  const machinesPath = await getMachinesPath()
  const machinePath = path.resolve(machinesPath, `${id}.machine.ts`)
  return machinePath
}

const machinePathRegex = /\.machine\.ts$/

/**
 * Converts a machine filename into its corresponding `id`/`slug`.
 *
 * @example
 * machineFilenamesToIds(['test.machine.ts', 'index.ts']) // ['test']
 */
export const machineFilenamesToIds = (filenames: string[]) =>
  filenames
    .filter((filename) => machinePathRegex.test(filename))
    .map((filename) => filename.replace(machinePathRegex, ''))

/**
 * Represents various imports related to a machine.
 */
export interface MachineImports {
  machine: StateMachine<any, any, any>
}

/**
 * Gets related file imports for the provided machine `slug`.
 *
 * # Imports
 * - `machine`: The machine's code. Finds the export named `<slug>Machine` from
 *   the `machines` package export.
 */
export const useGetImports = (slug: string) => {
  const [imports, setImports] = useState<MachineImports>()

  // get the machine's imports
  const getMachine = async () => {
    setImports(undefined)

    const machineModule = await import(`machines/src/${slug}.machine`)
    const machine = machineModule[`${slug}Machine`]

    setImports({
      machine,
    })
  }

  // sync machine import fetch with `slug`
  useEffect(() => {
    getMachine()
  }, [slug])

  return imports
}
