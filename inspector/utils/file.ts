/**
 * Gets the exported source filenames from a file's source.
 *
 * @example
 * getExportedFileSources(`export * from './idle.machine'`) // ['idle.machine']
 */
export const getExportFileSources = (source: string) => {
  const fileSourceRegex = /^export .* from '.*?(\w+\.machine)'$/gm
  const sources = []

  let m: any
  do {
    m = fileSourceRegex.exec(source)
    if (m) {
      sources.push(m[1])
    }
  } while (m)

  return sources
}
