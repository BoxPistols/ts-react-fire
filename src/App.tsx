import { Box, Button, FormControl } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { CustomizedInputs } from './components/CustomFormInput'
import { db } from './firebase'
import './style/App.css'

// import { Home } from "./components/Home";
// import CustomizedInputs from './components/CustomFormInput';
const authDomain = process.env.REACT_APP_FIREBASE_DOMAIN
// console.log(authDomain)

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: '', title: '' }])
  const [input, setInput] = useState('...input')

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
                onChange={(e) => setInput(e.target.value)}
              />
              <Button variant="contained" disabled={!input}>
                Submit
              </Button>
            </Box>
            {input}
          </FormControl>
        </section>

        <section className="section">
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
