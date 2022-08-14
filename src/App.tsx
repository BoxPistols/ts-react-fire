import React, { useState, useEffect } from "react";
import "./style/App.css";
import { db } from "./firebase";
import { Home } from "./components/Home";

// const authDomain = process.env.REACT_APP_FIREBASE_DOMAIN
// console.log(authDomain)

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);

  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((getSsnapshot) => {
      setTasks(
        getSsnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
        }))
      );
    });
    return () => unSub();
  }, []);

  return (
    <>
      <hr />
      <div className="App">
        <h1 className="design-font-en">Fire App</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
      <hr />
      {/* <h2 className="design-font-en">TEST</h2>
      <Home /> */}
    </>
  );
};
export default App;
