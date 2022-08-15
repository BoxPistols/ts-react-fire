import { Box, Button, FormControl } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { CustomizedInputs } from './components/CustomFormInput'
import { db } from './firebase'
import './style/App.css'

// import { Home } from "./components/Home";
// const authDomain = process.env.REACT_APP_FIREBASE_DOMAIN
// console.log(authDomain)

export const App = () => {
  // export const App = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }])
  const [input, setInput] = useState('')

  useEffect(() => {
    const unSub = db.collection('tasks').onSnapshot((getSsnapshot) => {
      setTasks(
        getSsnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        })),
      )
    })
    return () => unSub()
  }, [])

  const newTask = () => {
    db.collection('tasks').add({ title: input })
    setInput('')
  }

  return (
    <>
      <div className="App flex flex-column flex-center container">
        <h1 className="design-font-en">Fire App</h1>
        <section className="section">
          <FormControl>
            <Box style={{ display: 'grid', gap: 12 }} className="">
              <CustomizedInputs
                variant="outlined"
                label="New Task?"
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInput(e.target.value)
                }
              />
              {/* Add Button */}
              <Button variant="contained" disabled={!input} onClick={newTask}>
                Submit
              </Button>
            </Box>
          </FormControl>
        </section>

        <section className="section">
          <h3 className="design-font-en">List</h3>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </section>
      </div>
      {/* <h2 className="design-font-en">TEST</h2>
      <Home /> */}
    </>
  )
}
export default App
