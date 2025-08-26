import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './components/login'
import Community from './components/community'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </>
  )
}

export default App
