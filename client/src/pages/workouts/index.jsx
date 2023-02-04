import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../../state/index.js";

const WorkoutsPage = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const workouts = useSelector((state) => state.user.workouts);
  const [data, setData] = useState({
    userId: _id,
    workoutName: "",
    workoutType: "",
    workoutDate: "",
    workoutExercises: [],
  });
  const [workoutsList, setWorkoutsList] = useState([]);

  const getWorkouts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/workouts/${_id}/workouts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setWorkouts({
          workouts: res.data,
        })
      );
      setWorkoutsList(res.data);
      console.log("res: ", res.data);
      console.log("Workouts: ", workouts);
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*   useEffect(() => {
    let newState = Array.from(workouts).map((e) => e); 
    setWorkouts(newState); 
    console.log("Workouts new state: ", newState);
  }, [workouts]); */

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `http://localhost:5000/workouts/${_id}/workouts`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(
        setWorkouts({
          workouts: Array.from(res.data),
        })
      );
      setWorkoutsList(Array.from(res.data));
      console.log("After post: ", workoutsList);
      getWorkouts();
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };

  const deleteWorkout = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:5000/workouts/${_id}/workouts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newWorkoutsList = workoutsList.filter(
        (workout) => workout._id !== id
      );
      setWorkoutsList(newWorkoutsList);
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="d-flex justify-content-center">Workouts</h1>
      <NavBar />

      <div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <input
              className="form-control form-outline w-25"
              type="text"
              placeholder="Workout name"
              name="workoutName"
              onChange={handleChange}
              value={data.workoutName}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <input
              className="form-control form-outline w-25"
              type="text"
              placeholder="Workout type"
              name="workoutType"
              onChange={handleChange}
              value={data.workoutType}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <input
              className="form-control form-outline w-25"
              type="text"
              placeholder="Workout date"
              name="workoutDate"
              onChange={handleChange}
              value={data.workoutDate}
              required
            />
          </div>
          {error && (
            <div className="d-flex justify-content-center">{error}</div>
          )}
          <div className="d-flex justify-content-center">
            <button
              className="form-control btn btn-primary form-outline w-25"
              type="submit"
            >
              Add workout
            </button>
          </div>
        </form>
      </div>
      <div>
        {workoutsList.map((workout) => (
          <table key={workout._id} className="d-flex justify-content-center">
            <tbody>
              <tr>
                <td
                  style={{
                    fontSize: "24px",
                    padding: "10px 10px",
                    width: "150px",
                  }}
                >
                  {workout.workoutName}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm">Update</button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      deleteWorkout(workout._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default WorkoutsPage;
