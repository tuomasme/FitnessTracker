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
  const [workoutsList, setWorkoutsList] = useState([]);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [typeFilterText, updateTypeFilterText] = useState("");
  const [typeValueSelected, setTypeValueSelected] = useState("");

  // Fetch workouts from the database
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

  const submitHandler = (event) => {
    event.preventDefault();
  };

  // Set autocomplete search value on change
  const onChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Set autocomplete input search term
  const onSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    console.log(searchTerm);
  };

  // Workout type filter value changed
  const onTypeValueChanged = (event) => {
    onTypeValueSelected(event.target.value);
  };

  // Workout type filter value selected
  const onTypeValueSelected = (typeValue) => {
    updateTypeFilterText(typeValue);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="center">Workouts</h1>
      </div>
      <div className="row">
        <NavBar />
      </div>
      <form className="row" onSubmit={submitHandler}>
        <div className=" search-inner center">
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
        <div className="dropdown form-outline w-50 center">
          {workouts
            .filter((workout) => {
              const searchTerm = searchValue.toLowerCase();
              const name = workout.workoutName.toLowerCase();

              return (
                searchTerm && name.startsWith(searchTerm) && name !== searchTerm
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
      </form>
      <form className="row center">
        <select
          className="form-control form-outline w-50"
          onChange={onTypeValueChanged}
          setTypeValueSelected={onTypeValueSelected}
        >
          <option defaultValue="">Filter by workout type</option>
          {Array.from(
            new Set(workouts.map((workout) => workout.workoutType))
          ).map((workoutType) => {
            return <option value={workoutType}>{workoutType}</option>;
          })}
        </select>
      </form>
      <form className="center">
        <table>
          <thead>
            <tr className="center">
              <th className="workout-header"></th>
              <th className="workout-header">Name</th>
              <th className="workout-header">Type</th>
              <th className="workout-header"></th>
              <th className="workout-header"></th>
              <th className="workout-header"></th>
            </tr>
          </thead>
          {workoutsList &&
            workoutsList.map((workout) => (
              <tbody>
                <tr key={workout._id} className="center">
                  <td className="workout-row">{workout.workoutDate}</td>
                  <td className="workout-row">{workout.workoutName}</td>
                  <td className="workout-row">{workout.workoutType}</td>
                  <td className="workout-cell-empty">{workout.workoutType}</td>
                  <td className="workout-row-button">
                    <Link to={"/updateworkout/" + workout._id}>
                      <button
                        className="btn btn-warning btn-sm"
                        style={{ padding: "10px 10px" }}
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                  <td className="workout-row">
                    <button
                      className="btn btn-danger btn-sm"
                      style={{ padding: "10px 10px" }}
                      onClick={() => {
                        deleteWorkout(workout._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr className="center">
                  <th className="exercise-cell-first-empty "></th>
                  <th className="exercise-header">Name</th>
                  <th className="exercise-header">Sets</th>
                  <th className="exercise-header">Weight</th>
                  <th className="exercise-header">Reps</th>
                  <th className="exercise-header"></th>
                  <th className="exercise-header"></th>
                </tr>
                {workout.workoutExercises &&
                  workout.workoutExercises.map((exercise) => (
                    <tr key={exercise.exerciseName} className="center">
                      <td className="exercise-cell-first-empty"></td>
                      <td className="exercise-row">{exercise.exerciseName}</td>
                      <td className="exercise-row">{exercise.exerciseSets}</td>
                      <td className="exercise-row">
                        {exercise.exerciseWeight} {weightUnit}
                      </td>
                      <td className="exercise-row">{exercise.exerciseReps}</td>
                      <td className="exercise-cell-empty"></td>
                      <td className="exercise-cell-empty"></td>
                    </tr>
                  ))}
              </tbody>
            ))}
        </table>
      </form>
    </div>
  );
};

export default WorkoutsPage;
