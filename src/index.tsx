import 'asagiri'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './style/index.css'

// @note: npm i --save-dev @types/react-router-dom
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login history={[]} />}></Route>
      </Routes>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>,
)
