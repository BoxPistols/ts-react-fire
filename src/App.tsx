import React, { useEffect, useState } from 'react'

import { FormControl, List, TextField } from '@material-ui/core'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { TaskItem } from './components/TaskItem'
import { db } from './firebase'

import { auth } from './firebase'

import { makeStyles } from '@material-ui/styles'
import './style/App.css'
import styles from './style/App.module.css'

//Firebase ver9 compliant (modular)
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { addDoc, collection, onSnapshot, query } from 'firebase/firestore'

// import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// import { Home } from "./components/Home";
// const authDomain = process.env.REACT_APP_FIREBASE_DOMAIN
// console.log(authDomain)

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: 'auto',
    width: '40%',
  },
})

export const App: React.FC = (props: any) => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }])
  const [input, setInput] = useState('')
  const classes = useStyles()

  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const unSub = onAuthStateChanged(auth, (user) => {
      // !user && props.history.push('login')
      !user && moveLogin()
    })
    return () => unSub()
  })

  useEffect(() => {
    //Firebase ver9 compliant (modular)
    const q = query(collection(db, 'tasks'))
    const unsub = onSnapshot(q, (querySnapshot) => {
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        })),
      )
    })
    return () => unsub()
  }, [])

  const newTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    //Firebase ver9 compliant (modular)
    await addDoc(collection(db, 'tasks'), { title: input })
    setInput('')
  }

  const navigate = useNavigate()

  const moveLogin = () => {
    navigate('login')
  }

  return (
    <div className={styles.app__root}>
      <h1>Todo App by React/Firebase</h1>
      <button
        className={styles.app__logout}
        // onClick={moveLogin}
        onClick={async () => {
          try {
            await signOut(auth)
            // props.history.push('login')
            moveLogin()
          } catch (error: any) {
            alert(error.message)
          }
        }}
      >
        <ExitToAppIcon />
      </button>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="New task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>
      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  )
}
