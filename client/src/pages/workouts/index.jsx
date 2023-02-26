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
        <h1 className="center">Workouts</h1>
      </div>
      <div className="row">
        <NavBar />
      </div>
      <div className="row">
        <form onSubmit={submitHandler}>
          <div>
            <div className="search-inner">
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
      <div>
        <div>
          <form>
            <div className="row">
              <div className="center">
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
              <div className="row">
                <div>
                  <Link to={"/addworkout"} className="center">
                    <button className="btn btn-success form-outline w-25">
                      Add a new workout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {workoutsList &&
              workoutsList.map((workout) => (
                <table key={workout._id} className="center">
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
