import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWorkouts } from "../../state/index.js";

const WorkoutsPage = () => {
  const [workoutsList, setWorkoutsList] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  /*   useEffect(() => {
    const getWorkoutsList = async () => {
      try {
        const url = "http://localhost:5000/workouts";
        const res = await axios.get(url, data);
        setWorkoutsList(res.data);
        console.log(res.data);
        if (res) {
          dispatch(
            setWorkouts({
              workouts: res.data.workouts,
              token: res.data.token,
            })
          );
        }
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
          console.log(error);
        }
      }
    };
    getWorkoutsList();
  }, [workoutsList]); */

  return (
    <div>
      <p></p>
      <h1 className="me-auto d-flex justify-content-center">Workouts</h1>
      <NavBar />
    </div>
  );
};

export default WorkoutsPage;
