import {machineFilenamesToIds} from './machines'

test('machineFilenamesToIds', () => {
  expect(
    machineFilenamesToIds([
      'test.machine.ts',
      'test.machine',
      'something.machine.ts',
      'test',
      'another-thing.machine.ts',
      'last_thing.machine.ts',
    ]),
  ).toEqual(['test', 'something', 'anotherThing', 'lastThing'])
})
