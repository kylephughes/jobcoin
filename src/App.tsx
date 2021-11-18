import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { JobcoinContainer, JobcoinLoginContainer } from 'containers'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobcoinLoginContainer />} />
        <Route path="jobcoin/:address" element={<JobcoinContainer />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
