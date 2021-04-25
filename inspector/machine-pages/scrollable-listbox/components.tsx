import {chakra} from '@chakra-ui/system'

export const Listbox = chakra('div', {
  baseStyle: {
    p: 4,
    rounded: 'md',
    border: '1px',
    borderColor: 'gray.400',
    bg: 'gray.100',
  },
})

export const StyledSelect = chakra('ul', {
  baseStyle: {
    position: 'relative',
    maxH: '18em',
    overflowY: 'auto',
    bg: 'gray.50',
    py: 2,
    rounded: 'sm',
    borderColor: 'gray.300',
    '& > * + *': {
      mt: 2,
    },
  },
})

export const StyledOption = chakra('li', {
  baseStyle: {
    position: 'relative',
    pr: 4,
    pl: 8,
    lineHeight: '1.8em',
    _selected: {
      bg: 'blue.100',
      _before: {
        content: '"✓"',
        position: 'absolute',
        left: 2,
      },
    },
  },
})
