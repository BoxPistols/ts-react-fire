import { Button, Grid } from '@material-ui/core'
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import { DeleteOutlined, EditOutlined } from '@material-ui/icons'
import { useState } from 'react'
import { db } from '../firebase'
//Firebase ver9 compliant (modular)

//Firebase ver9 compliant (modular)
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore'

import { CustomizedInputs } from './CustomFormInput'

// TypeScript
type Props = {
  id: string
  title: string
}

export const TaskItem: React.FC<Props> = (props) => {
  // makeStyles
  const classes = useStyles()

  const [title, setTitle] = useState(props.title)
  //Firebase ver9 compliant (modular)
  const tasksRef = collection(db, 'tasks')
  // 編集
  const editTask = async () => {
    //Firebase ver9 compliant (modular)
    await setDoc(
      doc(tasksRef, props.id),
      {
        title: title,
      },
      { merge: true },
    )
  }

  // 削除
  const deleteTask = async () => {
    //Firebase ver9 compliant (modular)
    await deleteDoc(doc(tasksRef, props.id))
  }

  return (
    <>
      <ThemeProvider theme={themeX}>
        <h4 className="design-font-en">{props.title}</h4>

        <Grid container justifyContent="flex-start" alignItems="center">
          <div style={{ minWidth: 150 }}>{title}</div>
          <CustomizedInputs
            label="edit"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
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
