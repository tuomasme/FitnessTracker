import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WorkoutsPage from './pages/workoutsPage'
import RecordsPage from './pages/recordsPage'
import LoginRegisterForm from './pages/HomePage'


const App = () => {
   return(
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginRegisterForm/>} />
          <Route path="/workouts" element={<WorkoutsPage/>} />
          <Route path="/records" element={<RecordsPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
