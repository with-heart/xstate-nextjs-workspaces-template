import {Box, Grid} from '@chakra-ui/layout'

export const MachineLayout = (props: {
  content: React.ReactNode
  iframe: React.ReactNode
}) => {
  return (
    <Grid templateRows="1fr 1fr" h="full">
      <Box bg="black">{props.iframe}</Box>
      <Box overflowY="scroll" pt={4}>
        <div>{props.content}</div>
      </Box>
    </Grid>
  )
}
