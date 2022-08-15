// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'

import { ListItem } from '@material-ui/core'

type Props = {
  id: string
  title: string
}

export const TaskItem = ({ id, title }: Props) => (
  <>
    <ListItem id={id}>{title}</ListItem>
  </>
)

export default TaskItem
