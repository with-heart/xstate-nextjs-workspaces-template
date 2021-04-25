import {camelCase} from 'lodash/fp'
import {ComponentType, useEffect, useState} from 'react'
import {StateMachine} from 'xstate'
import {MachinePageProps} from '../interfaces/MachinePageProps'

/**
 * Represents various imports related to a machine.
 */
export interface MachineImports {
  machine: StateMachine<any, any, any>
  page?: ComponentType<MachinePageProps<any>>
}

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
 * Gets the path to the `machine-pages` folder in the `inspector` module.
 */
export const getMachinePagesPath = async () => {
  const path = await import('path')
  const machinePagesPath = path.resolve(process.cwd(), 'machine-pages')
  return machinePagesPath
}

/**
 * Gets the path to a specific machine using its file slug `id`
 * (`id.machine.ts`). This path references the `src` folder of the `machines`
 * package.
 */
export const getMachinePaths = async (id: string) => {
  const path = await import('path')
  const machinesPath = await getMachinesPath()
  const machinePagesPath = await getMachinePagesPath()
  const machinePath = path.resolve(machinesPath, `${id}.machine.ts`)
  const pagePath = path.resolve(machinePagesPath, `${id}.machine.tsx`)
  return {machine: machinePath, page: pagePath}
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
    .map(camelCase)

/**
 * Gets related file imports for the provided machine `slug`.
 *
 * # Imports
 * - `machine`: The machine's code. Finds the export named `<slug>Machine` from
 *   the `machines` package export.
 */
export const useGetImports = ({
  slug,
  hasPage,
}: {
  slug: string
  hasPage: boolean
}) => {
  const [imports, setImports] = useState<MachineImports>()

  /** Gets the machine's import. */
  const getMachineImport = async () => {
    const machineModule = await import(`machines/src/${slug}.machine`)
    const machine = machineModule[`${slug}Machine`]
    return machine
  }

  /** Gets the machine page component if one exists. */
  const getPage = async () => {
    if (!hasPage) return undefined

    const pageModule = await import(`../machine-pages/${slug}.machine`)
    const page = pageModule.default
    return page
  }

  /** Resets and gets the machine's imports. */
  const getMachine = async () => {
    setImports(undefined)

    const machine = await getMachineImport()
    const page = await getPage()
    setImports({machine, page})
  }

  // sync machine import fetch with `slug`
  useEffect(() => {
    getMachine()
  }, [slug])

  return imports
}
