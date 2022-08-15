import { Button, Grid, ListItem } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import { DeleteOutlined, EditOutlined } from '@material-ui/icons'
import { useState } from 'react'
import { db } from '../firebase'
import { CustomizedInputs } from './CustomFormInput'

// サイトのベースとなる独自のテーマを作成する
const themeX = createTheme({
  // palette: {
  //   type: 'dark',
  // },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '14px',
        lineHeight: 1.5,
        padding: '12px',
        '&:hover': {
          backgroundColor: 'none',
          color: '#999999',
        },
      },
      outlined: {
        color: '#456',
        border: 0,
      },
    },
    MuiInputBase: {
      input: {
        '&[type=text]': {
          outline: 'none',
          borderWidth: 0,
          background: '#f3f3f3',
          minWidth: '100%',
          '&:focus': {
            backgroundColor: '#cde',
            color: '#123',
          },
        },
      },
    },
    MuiListItem: {
      gutters: {
        padding: 4,
      },
    },
  },
})

type Props = {
  id: string
  title: string
}

export const TaskItem = ({ id, title }: Props) => {
  const [edit, setEdit] = useState(title)

  // 編集
  const editTask = () => {
    db.collection('tasks').doc(id).set({ title: edit }, { merge: true })
  }
  // 削除
  const deleteTask = () => {
    let result = window.confirm('削除しますか')
    result && db.collection('tasks').doc(id).delete()
  }

  return (
    <>
      <ThemeProvider theme={themeX}>
        <ListItem id={id}>
          <Grid container justifyContent="flex-start" alignItems="center">
            {/* <div style={{ minWidth: 150 }}>{title}</div> */}
            <CustomizedInputs
              // label="edit"
              value={edit}
              onChange={(e) => setEdit(e.target.value)}
              style={{ margin: '8px 0 4px 0', minWidth: '320px' }}
            />
            <Button onClick={editTask} variant="outlined">
              <EditOutlined />
            </Button>
            <Button onClick={deleteTask} variant="outlined">
              <DeleteOutlined />
            </Button>
          </Grid>
        </ListItem>
      </ThemeProvider>
    </>
  )
}
