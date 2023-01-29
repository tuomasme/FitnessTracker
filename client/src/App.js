import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import WorkoutsPage from "./pages/workoutsPage";
import RecordsPage from "./pages/recordsPage";
import Login from "./pages/login";
import Register from "./pages/register";
import { useSelector } from "react-redux";

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
            path="/records"
            element={isAuthorized ? <RecordsPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
