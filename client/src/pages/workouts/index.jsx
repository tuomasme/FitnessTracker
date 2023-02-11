import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../../state/index.js";
import { Link } from "react-router-dom";

const WorkoutsPage = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const workouts = useSelector((state) => state.user.workouts);

  // Data fields of exercises of a workout
  const [exerciseData, setExerciseData] = useState([
    {
      userId: _id,
      exerciseName: "",
      exerciseSets: "",
      exerciseReps: "",
      exerciseWeight: "",
    },
  ]);

  //Data fields of a workout
  const [workoutData, setWorkoutData] = useState({
    userId: _id,
    workoutName: "",
    workoutType: "",
    workoutDate: "",
    workoutExercises: [],
  });

  const [workoutsList, setWorkoutsList] = useState([]);

  const getWorkouts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/workouts/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let workouts = res.data;
      dispatch(
        setWorkouts({
          workouts: workouts,
        })
      );
      setWorkoutsList(workouts);
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
    setWorkoutData({ ...workoutData, [input.name]: input.value });
  };

  const handleExerciseFormChange = (event, index) => {
    let exerciseFormData = [...exerciseData];
    exerciseFormData[index][event.target.name] = event.target.value;
    setExerciseData(exerciseFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `http://localhost:5000/workouts/${_id}/`,
        workoutData,
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
        `http://localhost:5000/workouts/${_id}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newWorkoutsList = workoutsList.filter(
        (workout) => workout._id !== id
      );
      setWorkoutsList(newWorkoutsList);
      getWorkouts();
    } catch (error) {
      setError(error.res.data.message);
      console.log(error);
    }
  };

  const addExerciseFields = (event) => {
    event.preventDefault();
    let exerciseObject = {
      userId: _id,
      exerciseName: "",
      exerciseSets: "",
      exerciseReps: "",
      exerciseWeight: "",
    };
    setExerciseData([...exerciseData, exerciseObject]);
  };

  const deleteExerciseFields = (event, index) => {
    let exerciseFormData = [...exerciseData];
    exerciseFormData.splice(index, 1);
    setExerciseData(exerciseFormData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className="d-flex justify-content-center">Workouts</h1>
      <NavBar />

      <div>
        <form onSubmit={submitHandler}>
          <div className="d-flex justify-content-center">
            <input
              className="form-control form-outline w-25"
              type="text"
              placeholder="Workout name"
              name="workoutName"
              onChange={handleChange}
              value={workoutData.workoutName}
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
              value={workoutData.workoutType}
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
              value={workoutData.workoutDate}
              required
            />
          </div>
          <div>
            <br />
            <div>
              {Array.from(exerciseData).map((exerciseField, index) => {
                return (
                  <div key={index}>
                    <div className="d-flex justify-content-center">
                      <input
                        className="form-control form-outline w-25"
                        type="text"
                        placeholder="Exercise name"
                        name="exerciseName"
                        onChange={(event) =>
                          handleExerciseFormChange(event, index)
                        }
                        value={exerciseField.exerciseName}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        className="form-control form-outline w-25"
                        type="text"
                        placeholder="Exercise weight"
                        name="exerciseWeight"
                        onChange={(event) =>
                          handleExerciseFormChange(event, index)
                        }
                        value={exerciseField.exerciseWeight}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        className="form-control form-outline w-25"
                        type="text"
                        placeholder="Exercise sets"
                        name="exerciseSets"
                        onChange={(event) =>
                          handleExerciseFormChange(event, index)
                        }
                        value={exerciseField.exerciseSets}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        className="form-control form-outline w-25"
                        type="text"
                        placeholder="Exercise reps"
                        name="exerciseReps"
                        onChange={(event) =>
                          handleExerciseFormChange(event, index)
                        }
                        value={exerciseField.exerciseReps}
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="form-control form-outline w-25 btn btn-danger"
                        onClick={() => deleteExerciseFields(index)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <button
              className="form-control form-outline w-25 btn btn-primary"
              onClick={addExerciseFields}
            >
              Add exercise
            </button>
          </div>
          <br />
          {error && (
            <div className="d-flex justify-content-center">{error}</div>
          )}
          <div className="d-flex justify-content-center">
            <button
              className="form-control btn btn-success form-outline w-25"
              type="submit"
              onClick={handleSubmit}
            >
              Add workout
            </button>
          </div>
        </form>
      </div>
      <br />
      <div>
        {workoutsList &&
          workoutsList.map((workout) => (
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
                    {workout.workoutDate}
                  </td>
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
                    <Link to={"/updateworkout/" + workout._id}>
                      <button className="btn btn-warning btn-sm">Update</button>
                    </Link>
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
