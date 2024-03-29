import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Workouts from "./components/workouts";
import Records from "./components/records";
import Login from "./components/login";
import Register from "./components/register";
import { useSelector } from "react-redux";
import CreateWorkout from "./components/createWorkout";
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
            element={isAuthorized ? <Workouts /> : <Navigate to="/" />}
          />
          <Route
            path="/createworkout"
            element={isAuthorized ? <CreateWorkout /> : <Navigate to="/" />}
          />
          <Route
            path="/updateworkout/:id"
            element={isAuthorized ? <UpdateWorkout /> : <Navigate to="/" />}
          />
          <Route
            path="/records"
            element={isAuthorized ? <Records /> : <Navigate to="/" />}
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
