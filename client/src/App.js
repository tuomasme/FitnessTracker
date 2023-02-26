import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import WorkoutsPage from "./components/workouts";
import RecordsPage from "./components/records";
import Login from "./components/login";
import Register from "./components/register";
import { useSelector } from "react-redux";
import AddWorkout from "./components/addWorkout";
import UpdateRecord from "./components/updateRecord";
import UpdateWorkout from "./components/updateWorkout";

const App = () => {
  const isAuthorized = Boolean(useSelector((state) => state.token));
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/workouts"
            element={isAuthorized ? <WorkoutsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/addworkout"
            element={isAuthorized ? <AddWorkout /> : <Navigate to="/" />}
          />
          <Route
            path="/updateworkout/:id"
            element={isAuthorized ? <UpdateWorkout /> : <Navigate to="/" />}
          />
          <Route
            path="/records"
            element={isAuthorized ? <RecordsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/updaterecord/:id"
            element={isAuthorized ? <UpdateRecord /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
