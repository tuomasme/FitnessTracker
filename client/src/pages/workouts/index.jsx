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
  const [workoutList, setWorkoutList] = useState([]);

  const getWorkouts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/workouts/${_id}/workouts`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res) {
        dispatch(
          setWorkouts({
            workouts: res.data,
          })
        );
        setWorkoutList(Array.from(res.data));
        console.log("res: ", res.data);
        console.log("workouts: ", workouts);
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkouts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post(`http://localhost:5000/workouts/${_id}/workouts`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(
          dispatch(
            setWorkouts({
              workouts: res.data,
            })
          ),
          setWorkoutList(workouts),
          console.log(workoutList)
        );
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="d-flex justify-content-center">Workouts</h1>
      <NavBar />
      <div>
        <div>
          {workoutList.map((workout) => (
            <table key={workout._id} className="d-flex justify-content-center">
              <tbody>
                <tr>
                  <td>{workout.workoutName}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
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
      </div>
    </div>
  );
};

export default WorkoutsPage;
