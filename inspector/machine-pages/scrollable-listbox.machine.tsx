import {Box, Heading, Link, Stack, Text} from '@chakra-ui/layout'
import {scrollableListboxMachine} from 'machines'
import {MachinePageProps} from '../interfaces/MachinePageProps'
import {Listbox} from './scrollable-listbox/components'
import {ScrollableListboxContext} from './scrollable-listbox/context'
import {Option} from './scrollable-listbox/Option'
import {Select} from './scrollable-listbox/Select'

const options = Array.from({length: 30}, (_v, k) => ({
  id: `item-${k}`,
  label: `Item ${k + 1}`,
}))

const ScrollableListbox = ({service}: {service: Props['service']}) => (
  <ScrollableListboxContext.Provider value={{service}}>
    <Select>
      {options.map(({id, label}) => (
        <Option key={id} id={id}>
          {label}
        </Option>
      ))}
    </Select>
  </ScrollableListboxContext.Provider>
)

type Props = MachinePageProps<typeof scrollableListboxMachine>

export default function ScrollableListboxMachinePage({service}: Props) {
  return (
    <Box p={3}>
      <Listbox maxW="40ch">
        <Stack>
          <Heading as="h1" id="listbox-header" fontSize="xl">
            Scrollable Listbox
          </Heading>
          <Text>
            A reproduction of the WAI-ARIA 1.2{' '}
            <Link
              isExternal
              href="https://www.w3.org/TR/wai-aria-practices-1.2/examples/listbox/listbox-scrollable.html"
            >
              Scrollable Listbox Example
            </Link>
          </Text>
          <ScrollableListbox service={service} />
        </Stack>
      </Listbox>
    </Box>
  )
}
