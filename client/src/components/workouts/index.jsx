import NavBar from "../navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkouts } from "../../state/index.js";
import { Link } from "react-router-dom";
import "./styles.css";
import moment from "moment";

const WorkoutsPage = () => {
  return (
    <div>
      <NavBar />
      <HeaderComponent />
      <FormComponent />
    </div>
  );
};

const HeaderComponent = () => {
  return (
    <div className="center margin-header">
      <h1>Workouts</h1>
    </div>
  );
};

const FormComponent = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const workouts = useSelector((state) => state.user.workouts);
  const [searchValue, setSearchValue] = useState("");
  const [workoutsList, setWorkoutsList] = useState([]);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [selectValue, setSelectValue] = useState("");

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
  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Set autocomplete input search term
  const onSearch = (searchTerm) => {
    setSearchValue(searchTerm);
    console.log(searchTerm);
  };

  // Set select input value
  const onSelectValueChange = (event) => {
    setSelectValue(event.target.value);
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className=" search-inner center margin-search-bar">
          <input
            className="form-control form-outline w-25"
            type="text"
            placeholder="Search by workout name"
            name="searchWorkoutName"
            value={searchValue}
            onChange={onSearchValueChange}
          />
        </div>
        <div className="center">
          <div className="dropdown form-outline w-25">
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
              .filter((workout) => {
                return selectValue.toLowerCase() === ""
                  ? workout
                  : workout.workoutType.toLowerCase().includes(selectValue);
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
      <form className="center">
        <select
          className="form-control form-select form-outline w-25 margin"
          onChange={onSelectValueChange}
        >
          <option value="">Filter by workout type</option>
          {Array.from(
            new Set(workouts.map((workout) => workout.workoutType))
          ).map((workoutType) => {
            return <option value={workoutType}>{workoutType}</option>;
          })}
        </select>
      </form>
      <div className="center margin">
        <form>
          <table className="table table-light">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            {workoutsList &&
              workoutsList
                .filter((workout) => {
                  return searchValue.toLowerCase() === ""
                    ? workout
                    : workout.workoutName.toLowerCase().startsWith(searchValue);
                })
                .filter((workout) => {
                  return selectValue.toLowerCase() === ""
                    ? workout
                    : workout.workoutType.toLowerCase().includes(selectValue);
                })
                .map((workout) => (
                  <tbody>
                    <tr key={workout._id}>
                      <td>
                        {moment(workout.workoutDate).format("DD.MM.YYYY")}
                      </td>
                      <td>{workout.workoutName}</td>
                      <td colspan="3">{workout.workoutType}</td>
                      <td>
                        <Link to={"/updateworkout/" + workout._id}>
                          <button
                            className="btn btn-warning btn-sm"
                            style={{ padding: "10px 10px" }}
                          >
                            Edit workout
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          style={{ padding: "10px 10px" }}
                          onClick={() => {
                            deleteWorkout(workout._id);
                          }}
                        >
                          Delete workout
                        </button>
                      </td>
                    </tr>
                    <tr className="exercise-header">
                      <th scope="col">&nbsp;</th>
                      <th scope="col">Exercise</th>
                      <th scope="col">Sets</th>
                      <th scope="col">Weight</th>
                      <th scope="col">Reps</th>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">&nbsp;</th>
                    </tr>
                    {workout.workoutExercises &&
                      workout.workoutExercises.map((exercise) => (
                        <tr
                          key={exercise.exerciseName}
                          className="exercise-content"
                        >
                          <td></td>
                          <td>{exercise.exerciseName}</td>
                          <td>{exercise.exerciseSets}</td>
                          <td>
                            {exercise.exerciseWeight} {weightUnit}
                          </td>
                          <td>{exercise.exerciseReps}</td>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                        </tr>
                      ))}
                  </tbody>
                ))}
          </table>
        </form>
      </div>
    </div>
  );
};

export default WorkoutsPage;
