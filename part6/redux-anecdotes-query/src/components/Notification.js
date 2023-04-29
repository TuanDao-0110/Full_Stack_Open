import { useSelector } from "react-redux"

const Notification = () => {
  const { show, content } = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return (
    <div style={{ ...style, opacity: show ? '1' : '0' }}>
      {content}
    </div>
  )
}

export default Notification