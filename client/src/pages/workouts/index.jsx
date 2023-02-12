import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../../state/index.js";
import { Link } from "react-router-dom";
import "./styles.css";

const WorkoutsPage = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const workouts = useSelector((state) => state.user.workouts);
  const [searchValue, setSearchValue] = useState("");

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

  const handleChange = ({ currentTarget: input }) => {
    setWorkoutData({ ...workoutData, [input.name]: input.value });
  };

  const handleExerciseFormChange = (event, index) => {
    let exerciseFormData = [...exerciseData];
    exerciseFormData[index][event.target.name] = event.target.value;
    setExerciseData(exerciseFormData);
  };

  // Add a workout to the database
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(workoutData);
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

  // Delete the selected workout from the database
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

  const deleteExerciseFields = (index) => {
    let exerciseFormData = [...exerciseData];
    exerciseFormData.splice(index, 1);
    setExerciseData(exerciseFormData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Set autocomplete input search term
  const onSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    console.log(searchTerm);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="d-flex justify-content-center">Workouts</h1>
      </div>
      <div className="row">
        <NavBar />
      </div>
      <div>
        <div>
          <form onSubmit={submitHandler}>
            <div>
              <div className="d-flex justify-content-center search-inner">
                <input
                  className="form-control form-outline w-50"
                  type="text"
                  placeholder="Search for workouts"
                  name="searchWorkoutName"
                  value={searchValue}
                  onChange={onChange}
                />
                <button
                  className="form-control btn btn-primary form-outline w-25"
                  type="submit"
                  onClick={() => onSearch(searchValue)}
                >
                  Search
                </button>
              </div>
              <div className="dropdown d-flex form-outline w-50">
                {workouts
                  .filter((workout) => {
                    const searchTerm = searchValue.toLowerCase();
                    const name = workout.workoutName.toLowerCase();

                    return (
                      searchTerm &&
                      name.startsWith(searchTerm) &&
                      name !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((workout) => (
                    <div
                      className="dropdown-row"
                      onClick={() => onSearch(workout.workoutName)}
                      key={workout._id}
                    >
                      {workout.workoutName}
                    </div>
                  ))}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <h2 className="d-flex justify-content-center">Add a new workout</h2>
          <form onSubmit={submitHandler}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control form-outline w-75"
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
                className="form-control form-outline w-75"
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
                className="form-control form-outline w-75"
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
                          className="form-control form-outline w-75"
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
                          className="form-control form-outline w-75"
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
                          className="form-control form-outline w-75"
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
                          className="form-control form-outline w-75"
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
                          className="form-control form-outline w-75 btn btn-danger"
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
                className="form-control form-outline w-75 btn btn-primary"
                onClick={addExerciseFields}
              >
                Add exercise fields
              </button>
            </div>
            <br />
            {error && (
              <div className="d-flex justify-content-center">{error}</div>
            )}
            <div className="d-flex justify-content-center">
              <button
                className="form-control btn btn-success form-outline w-75"
                type="submit"
                onClick={handleSubmit}
              >
                Add workout
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <form>
            <h2 className="d-flex justify-content-center">Your workouts</h2>
            <div className="d-flex justify-content-center">
              <select className="form-control form-outline w-50">
                <option value="" disabled hidden selected>
                  Select workout type
                </option>
                {Array.from(
                  new Set(workouts.map((workout) => workout.workoutType))
                ).map((workoutType) => {
                  return <option value={workoutType}>{workoutType}</option>;
                })}
              </select>
            </div>
            {workoutsList &&
              workoutsList.map((workout) => (
                <table
                  key={workout._id}
                  className="d-flex justify-content-center"
                >
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
                          <button className="btn btn-warning btn-sm">
                            Update
                          </button>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkoutsPage;
