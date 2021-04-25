import {isMachineFilename, machineFilenamesToIds} from './machines'

test('isMachineFilename', () => {
  expect(isMachineFilename('test.machine.ts')).toBe(true)
  expect(isMachineFilename('machine.ts')).toBe(false)
  expect(isMachineFilename('test.ts')).toBe(false)
})

test('machineFilenamesToIds', () => {
  expect(
    machineFilenamesToIds([
      'machine.machine.ts',
      'test.machine.ts',
      'something.machine.ts',
      'another-thing.machine.ts',
      'last_thing.machine.ts',
    ]),
  ).toEqual(['machine', 'test', 'something', 'anotherThing', 'lastThing'])
})
