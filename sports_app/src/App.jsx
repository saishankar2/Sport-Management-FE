import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Login from './pages/login'
import Community from './pages/community'
import Dashboard from './pages/dashboard'
import Body from './body'
import Attendance from './pages/attendance'
import Mark_attendance from './pages/mark_attendance'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()
  
  return (
    <>
      <Routes>
      <Route path='/' element={<Body />}>
        <Route path="/" element={<Login />} />
        <Route path="/community" element={<Community />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/attendance" element={<Attendance/>}/>
        <Route path="/mark_attendance" element={<Mark_attendance/>}/>
      </Route>
      </Routes>
    </>
  )
}

export default App
