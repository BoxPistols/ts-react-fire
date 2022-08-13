import React, { useState, useEffect } from "react"
import "./style/App.css"
import { db } from "./firebase"

const authDomain = process.env.REACT_APP_FIREBASE_DOMAIN
console.log(authDomain)

console.log(db)

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }])

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      )
    })
    return () => unSub()
  }, [])

  return (
    <>
      App
      <div className="App">
        {tasks.map((task) => (
          <h3 key="task.id">{task.title}</h3>
        ))}
      </div>
    </>
  )
}
export default App
