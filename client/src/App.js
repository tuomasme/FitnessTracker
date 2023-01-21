import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginPage'
import WorkoutsPage from './pages/workoutPage'
import RecordsPage from './pages/recordsPage'

const App = () => {
   return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/workouts" element={<WorkoutsPage/>} />
          <Route path="/records" element={<RecordsPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
