import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JobcoinContainer, JobcoinLoginContainer } from 'containers'

import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobcoinLoginContainer />} />
        <Route path="jobcoin/:address" element={<JobcoinContainer />} />
        <Route path="*" element={<JobcoinLoginContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
