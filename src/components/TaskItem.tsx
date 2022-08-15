import { Button, Grid, ListItem } from '@material-ui/core'
import { useState } from 'react'
import { db } from '../firebase'
import { CustomizedInputs } from './CustomFormInput'

type Props = {
  id: string
  title: string
}

export const TaskItem = ({ id, title }: Props) => {
  const [edit, setEdit] = useState(title)

  const editTask = () => {
    db.collection('tasks').doc(id).set({ title: edit }, { merge: true })
  }
  return (
    <>
      <ListItem id={id}>
        <Grid container justifyContent="space-between" alignItems="center">
          <div style={{ minWidth: 150 }}>{title}</div>
          <CustomizedInputs
            label="edit"
            value={edit}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEdit(e.target.value)
            }
          />
          <Button onClick={editTask}>Edit</Button>
        </Grid>
      </ListItem>
    </>
  )
}
