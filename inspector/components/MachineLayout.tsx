export const MachineLayout = (props: {
  content: React.ReactNode
  iframe: React.ReactNode
}) => {
  return (
    <div style={{display: 'grid', height: '100%', gridTemplateRows: '1fr 1fr'}}>
      <div
        style={{
          backgroundColor: 'black',
        }}
      >
        {props.iframe}
      </div>
      <div
        style={{
          overflowY: 'scroll',
          paddingTop: '1rem',
        }}
      >
        <div>{props.content}</div>
      </div>
    </div>
  )
}
