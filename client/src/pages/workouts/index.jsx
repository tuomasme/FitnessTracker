import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../../state/index.js";
import { useParams } from "react-router-dom";

const WorkoutsPage = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { userId } = useParams;
  const token = useSelector((state) => state.token);
  const workouts = useSelector((state) => state.user.workouts);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getWorkouts();
  }, []);

  const getWorkouts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/workouts/${userId}/workouts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      if (res) {
        dispatch(
          setWorkouts({
            workouts: res.data.workouts,
          })
        );
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  const createWorkout = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/workouts/${userId}/workouts`
      );
      if (res) {
        dispatch(
          setWorkouts({
            workouts: res.data.workouts,
          })
        );
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="me-auto d-flex justify-content-center">Workouts</h1>
      <NavBar />
      <div></div>
    </div>
  );
};

export default WorkoutsPage;
