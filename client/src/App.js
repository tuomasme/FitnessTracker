import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WorkoutsPage from './pages/workoutsPage'
import RecordsPage from './pages/recordsPage'
import Login from './pages/login'
import Register from './pages/register'

const App = () => {
   return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/workouts" element={<WorkoutsPage/>} />
          <Route path="/records" element={<RecordsPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
