import { Button, Grid, ListItem } from '@material-ui/core'
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import { DeleteOutlined, EditOutlined } from '@material-ui/icons'
import { useState } from 'react'
import { db } from '../firebase'
import { CustomizedInputs } from './CustomFormInput'

// TypeScript
type Props = {
  id: string
  title: string
}

export const TaskItem = ({ id, title }: Props) => {
  // makeStyles
  const classes = useStyles()
  // 編集
  const [edit, setEdit] = useState(title)
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
              style={{
                margin: '8px 0 4px 0',
                minWidth: '320px',
              }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button
                onClick={editTask}
                variant="outlined"
                // className={styles.btn} // css module
                className={classes.edit} // makeStyles
              >
                <EditOutlined />
                <span>保存</span>
              </Button>
              <Button
                onClick={deleteTask}
                variant="outlined"
                className={classes.del} // makeStyles
              >
                <DeleteOutlined />
                <span>削除</span>
              </Button>
            </div>
          </Grid>
        </ListItem>
      </ThemeProvider>
    </>
  )
}

// mui Theme
const themeX = createTheme({
  // palette: {
  //   type: 'dark',
  // },
  overrides: {
    MuiButton: {
      root: {
        fontSize: '14px',
        lineHeight: 1.5,
        transition: 'none',
        borderColor: 'currentColor',
        padding: '4px 8px',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: '#689',
          color: 'currentColor',
        },
      },
      outlined: {
        color: '#456',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: '#689',
          color: 'currentColor',
        },
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

// makeStyles
const useStyles = makeStyles({
  del: {
    color: 'tomato',
    '&:hover': {
      borderColor: 'tomato',
      color: 'crimson',
    },
  },
  edit: {
    color: 'teal',
    '&:hover': {
      borderColor: 'darkgreen',
      color: 'darkgreen',
    },
  },
})
